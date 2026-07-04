# Admin Panel Setup — `/admin` + Prisma + PostgreSQL

Stack: Next.js 16 (App Router), bun, Prisma ORM, PostgreSQL.

## 1. Postgres

Pick one:
- Local: `brew install postgresql@16 && brew services start postgresql@16`, then `createdb rotex_dev`
- Hosted (recommended for prod): Neon / Supabase / Railway — free tier, gives connection string instantly

Connection string format:
```
postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public
```

## 2. Install Prisma

```bash
bun add -d prisma
bun add @prisma/client
bunx prisma init --datasource-provider postgresql
```

Creates `prisma/schema.prisma` + `.env` with `DATABASE_URL`.

Add to `.env` (and `.env.example` without real values, keep `.env` gitignored — check `.gitignore` already excludes it):
```
DATABASE_URL="postgresql://..."
```

## 3. Define schema

`prisma/schema.prisma` — example for admin auth + content models:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // hashed
  name      String?
  createdAt DateTime @default(now())
}

model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Adjust models to match `src/data` content currently hardcoded (products, industries, etc.) — migrate those into DB tables instead of static files.

## 4. Migrate + generate client

```bash
bunx prisma migrate dev --name init
bunx prisma generate
```

## 5. Prisma client singleton

Prisma 7's `prisma-client` generator (ESM client, output to `src/generated/prisma`) requires a driver adapter — no more implicit `DATABASE_URL` read in the constructor.

```bash
bun add @prisma/adapter-pg pg
```

`src/lib/prisma.ts`:
```ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## 6. Auth for admin

Options:
- **next-auth (Auth.js)** — credentials provider against `AdminUser` table, session via JWT
- **Custom** — cookie-based session, bcrypt password check, simple for one admin

Recommended: next-auth credentials provider, since you already need password hashing + session mgmt.

```bash
bun add next-auth bcryptjs
bun add -d @types/bcryptjs
```

`src/app/api/auth/[...nextauth]/route.ts` — credentials provider checks `prisma.adminUser.findUnique`, compares bcrypt hash.

## 7. Protect `/admin` routes

`src/middleware.ts`:
```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin") && req.nextUrl.pathname !== "/admin/login") {
    const token = await getToken({ req });
    if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
```

## 8. Route structure

```
src/app/admin/
  layout.tsx          # admin shell: sidebar/nav, wraps all admin pages
  page.tsx             # dashboard
  login/page.tsx       # login form (public)
  products/page.tsx    # list
  products/new/page.tsx
  products/[id]/edit/page.tsx
```

Use Server Actions or route handlers (`src/app/api/admin/products/route.ts`) for CRUD, calling `prisma.product.*`.

## 9. Seed data (optional)

`prisma/seed.ts` — script to insert first admin user + migrate existing `src/data` content into DB. Run via:
```bash
bunx prisma db seed
```
Add to `package.json`:
```json
"prisma": { "seed": "bun prisma/seed.ts" }
```

## 10. Deployment

- Set `DATABASE_URL` env var on host (Vercel/etc)
- Run `bunx prisma migrate deploy` in build step (not `migrate dev`)
- Postgres provider must allow connections from deploy host (Neon/Supabase do by default)

## Order to execute

1. Provision Postgres, get connection string
2. `prisma init`, write schema, `migrate dev`
3. Prisma client singleton
4. next-auth + AdminUser + bcrypt
5. middleware guard on `/admin`
6. build admin layout + pages
7. CRUD via server actions/API routes
8. seed script
9. deploy env vars + `migrate deploy`
