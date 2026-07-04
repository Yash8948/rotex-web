"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { TextField, TextAreaField, SwitchField, RepeaterItem, AddButton, FieldGrid } from "@/components/admin/form-fields";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSection } from "@/app/admin/(dashboard)/home/actions";

type IndustryCard = {
  id: string;
  published: boolean;
  slug: string;
  label: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
};
type FormValues = {
  enabled: boolean;
  heading: { title: string; subtitle: string };
  industries: IndustryCard[];
};

export function IndustriesForm({
  initialEnabled,
  initialData,
}: {
  initialEnabled: boolean;
  initialData: Omit<FormValues, "enabled">;
}) {
  const form = useForm<FormValues>({
    defaultValues: { enabled: initialEnabled, ...initialData },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "industries" });
  const { pending, error, success, run } = useSaveAction();

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(() => saveHomeSection("industries", { enabled, data }));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />

        <TextField label="Heading Title" {...form.register("heading.title")} />
        <TextAreaField label="Heading Subtitle" {...form.register("heading.subtitle")} />

        <div className="space-y-4">
          {fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Industry ${i + 1}`} onRemove={() => remove(i)}>
              <SwitchField
                label="Published"
                checked={form.watch(`industries.${i}.published`)}
                onCheckedChange={(v) => form.setValue(`industries.${i}.published`, v)}
              />
              <FieldGrid>
                <TextField label="Slug" {...form.register(`industries.${i}.slug`)} />
                <TextField label="Label" {...form.register(`industries.${i}.label`)} />
              </FieldGrid>
              <TextField label="Title (overlay)" {...form.register(`industries.${i}.title`)} />
              <TextAreaField label="Description" {...form.register(`industries.${i}.description`)} />
              <FieldGrid>
                <TextField label="Image Src" {...form.register(`industries.${i}.image.src`)} />
                <TextField label="Image Alt" {...form.register(`industries.${i}.image.alt`)} />
              </FieldGrid>
            </RepeaterItem>
          ))}

          <AddButton
            label="Add Industry"
            onClick={() =>
              append({
                id: `ind_${Date.now()}`,
                published: true,
                slug: "",
                label: "",
                title: "",
                description: "",
                image: { src: "", alt: "" },
              })
            }
          />
        </div>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}
