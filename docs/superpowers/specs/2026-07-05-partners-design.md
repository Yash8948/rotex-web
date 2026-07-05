# Partners — Design Spec

## Goal
Manage trusted-partner logos as first-class entities instead of embedding them
directly in the home page "Partners" section JSON. Give admins a dedicated
`/admin/partners` CRUD page, and let the home section pick which partners to
show via checkboxes. Wire the public site to render the selection.

## Data model

```prisma
model Partner {
  id        String   @id @default(cuid())
  name      String
  logo      String
  published Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Ordering is always `createdAt asc` — no manual reorder field. Used for the
admin list order, the home-section picker order, and public render order.

## Admin: Partners CRUD (`/admin/partners`)

- New sidebar item in `src/components/admin/sidebar.tsx` (`Handshake` icon),
  placed after "Industries".
- `src/app/admin/(dashboard)/partners/page.tsx` — server component. Lists all
  partners (`prisma.partner.findMany({ orderBy: { createdAt: "asc" } })`):
  logo thumbnail, name, published switch, edit, delete.
- `src/app/admin/(dashboard)/partners/actions.ts` — server actions:
  `createPartner`, `updatePartner`, `deletePartner`, `togglePartnerPublished`.
  Each revalidates `/admin/partners` and `/admin/home/partners`.
- `src/components/admin/partners/partner-form-dialog.tsx` — client component,
  `Dialog` (existing `ui/dialog.tsx`) + react-hook-form. Fields: `name`
  (`TextField`), `logo` (link/upload toggle, trimmed from `MediaField` — no
  separate alt field, `name` doubles as alt text), `published` (`SwitchField`).
  Used for both add and edit.
- `src/components/admin/partners/partner-list.tsx` — client component
  rendering rows, wiring delete confirmation and the edit dialog open state.

## Admin: Home section picker

- `src/app/admin/(dashboard)/home/[key]/page.tsx`: for `key === "partners"`,
  fetch `prisma.partner.findMany({ where: { published: true }, orderBy: { createdAt: "asc" } })`
  and render a new `PartnersPickerForm` instead of `LogoMarqueeForm`.
  `key === "certifications"` keeps using `LogoMarqueeForm` unchanged.
- Section JSON shape changes for the `partners` key only:
  `{ title: string, logos: Logo[] }` → `{ title: string, partnerIds: string[] }`.
- `src/components/admin/home-sections/partners-picker-form.tsx` — props:
  `initialEnabled`, `initialData: { title, partnerIds }`,
  `allPartners: { id, name, logo }[]` (already filtered to published).
  Renders `TextField` for title, then one row per partner (thumbnail + name +
  `Switch` bound to membership in `partnerIds`). Submits via
  `saveHomeSection("partners", { enabled, data: { title, partnerIds } })`.

## Public site wiring

- `src/lib/partners.ts` (new): `getSelectedPartners(ids: string[])` →
  `prisma.partner.findMany({ where: { id: { in: ids }, published: true }, orderBy: { createdAt: "asc" } })`.
- `src/lib/home-section.ts`: `getHomeSection("partners")` resolves
  `data.partnerIds` through `getSelectedPartners` and returns
  `{ title, logos: [{ id, src: logo, alt: name }] }`, preserving the existing
  `logos` contract for `/api/v1/home/partners` consumers.
- `src/app/(site)/page.tsx` becomes an async server component. It fetches the
  `partners` `HomeSection` row directly, resolves it via
  `getSelectedPartners`, and passes `logos`/`title` to the **first**
  `TrustedLeaders` call only. If no partners are selected, omit the `logos`
  prop so the component's existing static `defaultLogos` fallback applies.
- The second `TrustedLeaders` call (`title="Certified & Trusted Worldwide"`,
  `primary`) is untouched — it renders `certifications`, which stays fully
  static. Out of scope.

## Seed data

- `prisma/seed-home.ts`: the `partners` `HomeSection` row's `data` becomes
  `{ title: <existing title>, partnerIds: [] }`. The 4 existing seed logos are
  **not** migrated into `Partner` rows — admin starts empty and adds partners
  manually.

## Out of scope

- Reordering partners (createdAt order only).
- Wiring the `certifications` section or any other static home section to the
  DB.
- Website/link field on `Partner`.
