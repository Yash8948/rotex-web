"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toggleHomeSectionEnabled } from "@/app/admin/(dashboard)/home/actions";

export function SectionRow({
  sectionKey,
  enabled,
}: {
  sectionKey: string;
  enabled: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: sectionKey,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-card px-4 py-3 text-sm"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-muted-foreground outline-none active:cursor-grabbing"
        >
          <GripVertical className="size-4" />
        </button>
        <span className="font-medium capitalize">{sectionKey.replace("-", " ")}</span>
      </div>

      <div className="flex items-center gap-4">
        <Switch
          checked={enabled}
          disabled={pending}
          onCheckedChange={(checked) =>
            startTransition(() => {
              toggleHomeSectionEnabled(sectionKey, checked);
            })
          }
        />
        <Link href={`/admin/home/${sectionKey}`}>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
