import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getSelectedPartners } from "@/lib/partners";

export async function getHomeSection(key: string) {
  const section = await prisma.homeSection.findUnique({ where: { key } });

  if (!section) {
    return apiError("NOT_FOUND", `Section "${key}" not found`, 404);
  }

  const data = section.data as Record<string, unknown>;

  if (key === "partners") {
    const partners = await getSelectedPartners((data.partnerIds as string[]) ?? []);
    const logos = partners.map((p) => ({ id: p.id, src: p.logo, alt: p.name }));
    return apiSuccess({ enabled: section.enabled, title: data.title, logos }, section.updatedAt);
  }

  return apiSuccess({ enabled: section.enabled, ...data }, section.updatedAt);
}
