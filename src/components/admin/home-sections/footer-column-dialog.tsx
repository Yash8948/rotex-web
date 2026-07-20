"use client";

import { useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, TextField, SwitchField } from "@/components/admin/form-fields";
import { Trash2 } from "lucide-react";

type IndustryOption = { id: string; name: string };

type Mode = "manual" | "industries";

const MODE_LABELS: Record<Mode, string> = {
  manual: "Manual links",
  industries: "Industries (live data, main only)",
};

export function FooterColumnDialog({
  columnIndex,
  industries,
  onSave,
  pending,
  trigger,
}: {
  columnIndex: number;
  industries: IndustryOption[];
  onSave: () => Promise<void> | void;
  pending: boolean;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const base = `footer.columns.${columnIndex}`;
  const enabled = useWatch({ control: form.control, name: `${base}.enabled` });
  const sourceType = useWatch({ control: form.control, name: `${base}.source.type` });
  const mode: Mode = sourceType === "industries" ? "industries" : "manual";

  function setMode(newMode: Mode) {
    if (newMode === "manual") {
      form.setValue(`${base}.source`, null);
    } else {
      form.setValue(`${base}.source`, { type: "industries", selectedIds: [] });
      form.setValue(`${base}.links`, []);
    }
  }

  async function handleSave() {
    await onSave();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Footer Column</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <SwitchField
            label="Enabled"
            checked={enabled}
            onCheckedChange={(v) => form.setValue(`${base}.enabled`, v)}
          />
          <TextField label="Heading" {...form.register(`${base}.heading`)} />

          <Field label="Links Source">
            <Select items={MODE_LABELS} value={mode} onValueChange={(v) => setMode(v as Mode)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(MODE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {mode === "industries" ? (
            <IndustriesLinksPicker columnIndex={columnIndex} industries={industries} />
          ) : (
            <ManualLinksEditor columnIndex={columnIndex} />
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function IndustriesLinksPicker({
  columnIndex,
  industries,
}: {
  columnIndex: number;
  industries: IndustryOption[];
}) {
  const form = useFormContext();
  const base = `footer.columns.${columnIndex}.source`;
  const selected: string[] = useWatch({ control: form.control, name: `${base}.selectedIds` }) ?? [];

  function toggle(id: string, checked: boolean) {
    const current: string[] = form.getValues(`${base}.selectedIds`) ?? [];
    form.setValue(`${base}.selectedIds`, checked ? [...current, id] : current.filter((v) => v !== id));
  }

  return (
    <div className="space-y-1 rounded-lg border border-border">
      {industries.length === 0 && (
        <p className="p-4 text-sm text-muted-foreground">No industries yet. Add some on the Industries page first.</p>
      )}
      {industries.map((industry) => (
        <label key={industry.id} className="flex items-center gap-2.5 border-b border-border p-4 last:border-b-0">
          <Checkbox
            checked={selected.includes(industry.id)}
            onCheckedChange={(checked) => toggle(industry.id, checked === true)}
          />
          <span className="text-sm font-medium">{industry.name}</span>
        </label>
      ))}
    </div>
  );
}

function ManualLinksEditor({ columnIndex }: { columnIndex: number }) {
  const form = useFormContext();
  const name = `footer.columns.${columnIndex}.links`;
  const { fields, remove } = useFieldArray({ control: form.control, name });

  return (
    <div className="space-y-2 border-t border-border pt-3">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Links</span>
      {fields.map((field, j) => (
        <div key={field.id} className="flex items-end gap-2">
          <TextField label="Label" {...form.register(`${name}.${j}.label`)} />
          <TextField label="Href" {...form.register(`${name}.${j}.href`)} />
          <Button type="button" variant="ghost" size="icon-sm" onClick={() => remove(j)} className="mb-1">
            <Trash2 className="size-3.5 text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
}
