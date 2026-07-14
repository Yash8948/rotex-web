import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/admin/breadcrumb";
import { CustomerStoryList } from "@/components/admin/customer-stories/customer-story-list";

export default async function AdminCustomerStoriesPage() {
  const stories = await prisma.customerStory.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Customer Stories</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage customer testimonials. Enable them for specific sub-industry pages from each sub-industry&apos;s edit form.
          </p>
        </div>
        <Breadcrumb items={[{ label: "Dashboard", href: "/admin" }, { label: "Customer Stories" }]} />
      </div>

      <CustomerStoryList stories={stories} />
    </div>
  );
}
