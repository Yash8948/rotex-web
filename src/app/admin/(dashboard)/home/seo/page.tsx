import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/admin/breadcrumb";
import { SeoForm } from "@/components/admin/home-sections/seo-form";

export default async function AdminHomeSeoPage() {
  const seo = await prisma.homeSeo.findUniqueOrThrow({ where: { id: "home" } });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Home SEO</h1>
          <p className="mt-1 text-sm text-muted-foreground">Page title, description, OG image, canonical URL.</p>
        </div>
        <Breadcrumb items={[{ label: "Home Page", href: "/admin/home" }, { label: "SEO" }]} />
      </div>

      <SeoForm initialData={seo.data as never} />
    </div>
  );
}
