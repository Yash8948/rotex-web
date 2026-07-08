import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function TextField(props: React.ComponentProps<typeof Input> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <Field label={label}>
      <Input {...rest} className="h-9" />
    </Field>
  );
}

export function TextAreaField(props: React.ComponentProps<typeof Textarea> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <Field label={label}>
      <Textarea {...rest} rows={rest.rows ?? 3} />
    </Field>
  );
}

export function SelectField(
  props: React.ComponentProps<"select"> & { label: string; options: { value: string; label: string }[] }
) {
  const { label, options, className, ...rest } = props;
  return (
    <Field label={label}>
      <select
        {...rest}
        className={cn(
          "h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring",
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function SwitchField({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function RepeaterItem({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Button type="button" variant="ghost" size="icon-sm" onClick={onRemove}>
          <Trash2 className="size-3.5 text-destructive" />
        </Button>
      </div>
      {children}
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick} className="gap-1.5">
      <Plus className="size-3.5" />
      {label}
    </Button>
  );
}
