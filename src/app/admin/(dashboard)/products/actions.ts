"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/product-import";
import { revalidatePath } from "next/cache";

export type ProductInput = {
  name: string;
  code: string;
  category: string;
  image: string;
  tags: string[];
  subType: string | null;
  operatingType: string | null;
  actionType: string | null;
  portConnections: number | null;
  bodyMaterial: string | null;
  sealMaterial: string | null;
  description: string | null;
  remark: string | null;
};

function revalidateProducts(id?: string) {
  revalidatePath("/admin/products");
  if (id) revalidatePath(`/admin/products/${id}`);
}

export async function createProduct(data: ProductInput) {
  await prisma.product.create({
    data: { ...data, slug: slugify(`${data.name}-${data.code}`) },
  });
  revalidateProducts();
}

export async function updateProduct(id: string, data: ProductInput) {
  await prisma.product.update({ where: { id }, data });
  revalidateProducts(id);
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidateProducts(id);
}
