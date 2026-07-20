import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/admin/breadcrumb";
import { AdminConfigForm } from "@/components/admin/home-sections/admin-config-form";

const DEFAULT_DATA: PrismaJson.AdminConfigData = {
  sidebarLogoLight: "/logo.svg",
  sidebarLogoDark: "/logo.svg",
};

export default async function AdminGlobalAdminPage() {
  const record = await prisma.adminConfig.findUnique({ where: { id: "admin" } });
  const data = (record?.data as PrismaJson.AdminConfigData | undefined) ?? DEFAULT_DATA;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Branding for the admin panel itself — not shown on the public site.
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/admin" },
            { label: "Global Config", href: "/admin/global" },
            { label: "Admin Panel" },
          ]}
        />
      </div>

      <AdminConfigForm initialData={data} />
    </div>
  );
}
