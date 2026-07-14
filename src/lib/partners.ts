import { prisma } from "@/lib/prisma";

export async function getSelectedPartners(ids: string[]) {
  if (ids.length === 0) return [];

  return prisma.partner.findMany({
    where: { id: { in: ids }, published: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getPublishedPartners() {
  return prisma.partner.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });
}
