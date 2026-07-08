"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function revalidatePartners() {
  revalidatePath("/admin/partners");
  revalidatePath("/admin/home/partners");
}

export async function createPartner(data: { name: string; logo: string; published: boolean }) {
  await prisma.partner.create({ data });
  revalidatePartners();
}

export async function updatePartner(
  id: string,
  data: { name: string; logo: string; published: boolean }
) {
  await prisma.partner.update({ where: { id }, data });
  revalidatePartners();
}

export async function deletePartner(id: string) {
  await prisma.partner.delete({ where: { id } });
  revalidatePartners();
}

export async function togglePartnerPublished(id: string, published: boolean) {
  await prisma.partner.update({ where: { id }, data: { published } });
  revalidatePartners();
}
