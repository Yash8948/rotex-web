import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/admin/breadcrumb";
import { HeroForm } from "@/components/admin/home-sections/hero-form";
import { LogoMarqueeForm } from "@/components/admin/home-sections/logo-marquee-form";
import { PartnersPickerForm } from "@/components/admin/home-sections/partners-picker-form";
import { RedefiningForm } from "@/components/admin/home-sections/redefining-form";
import { IndustriesForm } from "@/components/admin/home-sections/industries-form";
import { ProductsForm } from "@/components/admin/home-sections/products-form";
import { CustomerStoriesForm } from "@/components/admin/home-sections/customer-stories-form";
import { ResourcesForm } from "@/components/admin/home-sections/resources-form";
import { CtaForm } from "@/components/admin/home-sections/cta-form";

export default async function AdminHomeSectionPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const section = await prisma.homeSection.findUnique({ where: { key } });

  if (!section) notFound();

  const meta = { initialEnabled: section.enabled };
  const data = section.data as never;

  const label = key.replace("-", " ");

  const allPartners =
    key === "partners"
      ? await prisma.partner.findMany({
          where: { published: true },
          orderBy: { createdAt: "asc" },
          select: { id: true, name: true, logo: true },
        })
      : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold capitalize">{label}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Edit this home page section.</p>
        </div>
        <Breadcrumb items={[{ label: "Home Page", href: "/admin/home" }, { label }]} />
      </div>

      {key === "hero" && <HeroForm {...meta} initialData={data} />}
      {key === "partners" && (
        <PartnersPickerForm {...meta} initialData={data} allPartners={allPartners} />
      )}
      {key === "certifications" && (
        <LogoMarqueeForm sectionKey={key} {...meta} initialData={data} />
      )}
      {key === "redefining" && <RedefiningForm {...meta} initialData={data} />}
      {key === "industries" && <IndustriesForm {...meta} initialData={data} />}
      {key === "products" && <ProductsForm {...meta} initialData={data} />}
      {key === "customer-stories" && <CustomerStoriesForm {...meta} initialData={data} />}
      {key === "resources" && <ResourcesForm {...meta} initialData={data} />}
      {key === "cta" && <CtaForm {...meta} initialData={data} />}
    </div>
  );
}
