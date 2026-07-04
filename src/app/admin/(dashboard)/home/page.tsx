import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SortableSectionList } from "@/components/admin/sortable-section-list";

export default async function AdminHomePage() {
  const sections = await prisma.homeSection.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Home Page</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag to reorder sections shown on the public home page.
          </p>
        </div>
        <Link href="/admin/home/seo">
          <Button variant="outline">Edit SEO</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <SortableSectionList
            sections={sections.map((s) => ({ key: s.key, enabled: s.enabled }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
