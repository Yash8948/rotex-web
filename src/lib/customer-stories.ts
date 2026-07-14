import { prisma } from "@/lib/prisma";

export async function getSelectedCustomerStories(ids: string[]) {
  if (ids.length === 0) return [];

  return prisma.customerStory.findMany({
    where: { id: { in: ids }, published: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getPublishedCustomerStories() {
  return prisma.customerStory.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });
}
