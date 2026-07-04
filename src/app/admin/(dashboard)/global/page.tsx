import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/admin/breadcrumb";
import { GlobalConfigForm } from "@/components/admin/home-sections/global-config-form";

export default async function AdminGlobalConfigPage() {
  const config = await prisma.globalConfig.findUniqueOrThrow({ where: { id: "global" } });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Global Config</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Header navigation, footer links, social, contact info.
          </p>
        </div>
        <Breadcrumb items={[{ label: "Dashboard", href: "/admin" }, { label: "Global Config" }]} />
      </div>

      <GlobalConfigForm initialData={config.data as never} />
    </div>
  );
}
