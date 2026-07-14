"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { deleteIndustry } from "@/app/admin/(dashboard)/industries/actions";

type IndustryRow = { id: string; name: string; slug: string; subIndustryCount: number };

export function IndustryList({ industries }: { industries: IndustryRow[] }) {
  const [pending, startTransition] = useTransition();
  const [toDelete, setToDelete] = useState<IndustryRow | null>(null);

  function confirmDelete() {
    if (!toDelete) return;
    const name = toDelete.name;
    startTransition(async () => {
      try {
        await deleteIndustry(toDelete.id);
        toast.success(`"${name}" deleted`);
      } catch {
        toast.error(`Failed to delete "${name}"`);
      }
    });
    setToDelete(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/admin/industries/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            New Industry
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="py-2.5 pl-5 pr-3 font-medium">Name</th>
              <th className="py-2.5 pr-3 font-medium">Slug</th>
              <th className="py-2.5 pr-3 font-medium">Sub-Industries</th>
              <th className="py-2.5 pr-5 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {industries.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                  No industries yet.
                </td>
              </tr>
            )}
            {industries.map((industry) => (
              <tr key={industry.id}>
                <td className="py-2.5 pl-5 pr-3 font-medium">{industry.name}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{industry.slug}</td>
                <td className="py-2.5 pr-3">{industry.subIndustryCount}</td>
                <td className="py-2.5 pr-5">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/industries/${industry.id}`} className="text-sm font-medium text-primary hover:underline">
                      Edit
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={pending}
                      onClick={() => setToDelete(industry)}
                    >
                      <Trash2 className="size-3.5 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        title="Delete industry"
        description={`Delete "${toDelete?.name}"? This also deletes all its sub-industries and customer stories. This cannot be undone.`}
        onConfirm={confirmDelete}
        pending={pending}
      />
    </div>
  );
}
