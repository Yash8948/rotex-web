import { Breadcrumb } from "@/components/admin/breadcrumb";
import { IndustryEditForm } from "@/components/admin/industries/industry-edit-form";

export default function AdminNewIndustryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">New Industry</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add a new industry sector shown on the home page and its dedicated pages.
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/admin" },
            { label: "Industries", href: "/admin/industries" },
            { label: "New" },
          ]}
        />
      </div>

      <IndustryEditForm />
    </div>
  );
}
