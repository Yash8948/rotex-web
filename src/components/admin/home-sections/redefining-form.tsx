"use client";

import { useForm, FormProvider, useFieldArray, useFormContext, useWatch, Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { Field, TextField, TextAreaField, SwitchField, AddButton, FieldGrid } from "@/components/admin/form-fields";
import { MediaField } from "@/components/admin/media-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSection } from "@/app/admin/(dashboard)/home/actions";

type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  format_comma: boolean;
  published: boolean;
};
type FormValues = {
  enabled: boolean;
  heading: { title: string; subtitle: string };
  media: { type: "image" | "video"; src: string; alt?: string };
  tagline: { prefix: string; highlight: string; suffix: string };
  stats: Stat[];
};

export function RedefiningForm({
  initialEnabled,
  initialData,
}: {
  initialEnabled: boolean;
  initialData: Omit<FormValues, "enabled">;
}) {
  const form = useForm<FormValues>({
    defaultValues: { enabled: initialEnabled, ...initialData },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "stats" });
  const { pending, error, success, run } = useSaveAction();
  const mediaType = useWatch({ control: form.control, name: "media.type" });

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(() => saveHomeSection("redefining", { enabled, data }));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />

        <TextField label="Heading Title" {...form.register("heading.title")} />
        <TextAreaField label="Heading Subtitle" {...form.register("heading.subtitle")} />

        <FieldGrid>
          <TextField label="Tagline Prefix" {...form.register("tagline.prefix")} />
          <TextField label="Tagline Highlight" {...form.register("tagline.highlight")} />
        </FieldGrid>
        <TextField label="Tagline Suffix" {...form.register("tagline.suffix")} />

        <div className="space-y-3 rounded-lg bg-muted/20 p-3">
          <Controller
            control={form.control}
            name="media.type"
            render={({ field }) => (
              <Field label="Media Type">
                <Select
                  items={{ video: "Video", image: "Image" }}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <MediaField name="media" mediaType={mediaType ?? "video"} showAlt={mediaType === "image"} />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Stats</span>
            <AddButton
              label="Add Stat"
              onClick={() =>
                append({ id: `stat_${Date.now()}`, value: 0, suffix: "", label: "", format_comma: false, published: true })
              }
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field, i) => (
              <StatCard key={field.id} index={i} onRemove={() => remove(i)} />
            ))}
          </div>
        </div>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}

function StatCard({ index, onRemove }: { index: number; onRemove: () => void }) {
  const form = useFormContext<FormValues>();
  const value = useWatch({ control: form.control, name: `stats.${index}.value` });
  const suffix = useWatch({ control: form.control, name: `stats.${index}.suffix` });
  const formatComma = useWatch({ control: form.control, name: `stats.${index}.format_comma` });
  const published = useWatch({ control: form.control, name: `stats.${index}.published` });

  const preview = `${formatComma ? (value || 0).toLocaleString() : value || 0}${suffix ?? ""}`;

  return (
    <div className="space-y-3 rounded-xl border border-border p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-2xl font-semibold text-primary">{preview}</p>
        <div className="flex items-center gap-1">
          <SwitchField
            label="Published"
            checked={published}
            onCheckedChange={(v) => form.setValue(`stats.${index}.published`, v)}
          />
          <Button type="button" variant="ghost" size="icon-sm" onClick={onRemove}>
            <Trash2 className="size-3.5 text-destructive" />
          </Button>
        </div>
      </div>

      <TextField label="Label" {...form.register(`stats.${index}.label`)} />

      <FieldGrid>
        <TextField label="Value" type="number" {...form.register(`stats.${index}.value`, { valueAsNumber: true })} />
        <TextField label="Suffix" {...form.register(`stats.${index}.suffix`)} />
      </FieldGrid>

      <SwitchField
        label="Format with comma"
        checked={formatComma}
        onCheckedChange={(v) => form.setValue(`stats.${index}.format_comma`, v)}
      />
    </div>
  );
}
