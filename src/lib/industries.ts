import { prisma } from "@/lib/prisma";

export async function getIndustryWithSubIndustries(slug: string) {
  return prisma.industry.findUnique({
    where: { slug },
    include: { subIndustries: { orderBy: { createdAt: "asc" } } },
  });
}

export async function getSubIndustryDetail(sectorSlug: string, subSlug: string) {
  const industry = await prisma.industry.findUnique({ where: { slug: sectorSlug } });
  if (!industry) return null;

  const subIndustry = await prisma.subIndustry.findUnique({
    where: { industryId_slug: { industryId: industry.id, slug: subSlug } },
  });
  if (!subIndustry) return null;

  return { industry, subIndustry };
}
