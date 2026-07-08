import { headers } from "next/headers";

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

/**
 * Fetches a home page section through /api/v1/home/[key] (not prisma directly)
 * so the public site only ever talks to the versioned, documented API contract.
 */
export async function fetchHomeSection<T extends object>(
  key: string
): Promise<({ enabled: boolean } & T) | null> {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/v1/home/${key}`, { cache: "no-store" });

    if (!res.ok) {
      console.error(`[site-api] GET /api/v1/home/${key} → ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (!json.success) {
      console.error(`[site-api] GET /api/v1/home/${key} → ${json.error?.code}: ${json.error?.message}`);
      return null;
    }

    return json.data;
  } catch (err) {
    console.error(`[site-api] GET /api/v1/home/${key} failed:`, err);
    return null;
  }
}
