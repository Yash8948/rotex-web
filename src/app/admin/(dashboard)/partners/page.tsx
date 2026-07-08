import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/admin/breadcrumb";
import { PartnerList } from "@/components/admin/partners/partner-list";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Partners</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage partner logos shown on the home page.
          </p>
        </div>
        <Breadcrumb items={[{ label: "Dashboard", href: "/admin" }, { label: "Partners" }]} />
      </div>

      <PartnerList partners={partners} />
    </div>
  );
}
