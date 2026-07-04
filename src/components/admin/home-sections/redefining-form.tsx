"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { TextField, TextAreaField, SwitchField, RepeaterItem, AddButton, FieldGrid } from "@/components/admin/form-fields";
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
  media: { type: "image" | "video"; src: string };
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

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(() => saveHomeSection("redefining", { enabled, data }));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />

        <FieldGrid>
          <TextField label="Heading Title" {...form.register("heading.title")} />
          <TextField label="Media Src" {...form.register("media.src")} />
        </FieldGrid>
        <TextAreaField label="Heading Subtitle" {...form.register("heading.subtitle")} />

        <FieldGrid>
          <TextField label="Tagline Prefix" {...form.register("tagline.prefix")} />
          <TextField label="Tagline Highlight" {...form.register("tagline.highlight")} />
        </FieldGrid>
        <TextField label="Tagline Suffix" {...form.register("tagline.suffix")} />

        <div className="space-y-4">
          {fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Stat ${i + 1}`} onRemove={() => remove(i)}>
              <SwitchField
                label="Published"
                checked={form.watch(`stats.${i}.published`)}
                onCheckedChange={(v) => form.setValue(`stats.${i}.published`, v)}
              />
              <FieldGrid>
                <TextField label="Value" type="number" {...form.register(`stats.${i}.value`, { valueAsNumber: true })} />
                <TextField label="Suffix" {...form.register(`stats.${i}.suffix`)} />
              </FieldGrid>
              <TextField label="Label" {...form.register(`stats.${i}.label`)} />
              <SwitchField
                label="Format with comma"
                checked={form.watch(`stats.${i}.format_comma`)}
                onCheckedChange={(v) => form.setValue(`stats.${i}.format_comma`, v)}
              />
            </RepeaterItem>
          ))}

          <AddButton
            label="Add Stat"
            onClick={() =>
              append({ id: `stat_${Date.now()}`, value: 0, suffix: "", label: "", format_comma: false, published: true })
            }
          />
        </div>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}
