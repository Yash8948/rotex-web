"use client";

import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { TextField, SwitchField, RepeaterItem, AddButton, FieldGrid } from "@/components/admin/form-fields";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSection } from "@/app/admin/(dashboard)/home/actions";

type Article = {
  id: string;
  published: boolean;
  slug: string;
  title: string;
  image: { src: string; alt: string };
};
type Tab = {
  id: string;
  label: string;
  cta: { label: string; href: string };
  articles: Article[];
};
type FormValues = {
  enabled: boolean;
  heading: { title: string };
  tabs: Tab[];
};

export function ResourcesForm({
  initialEnabled,
  initialData,
}: {
  initialEnabled: boolean;
  initialData: Omit<FormValues, "enabled">;
}) {
  const form = useForm<FormValues>({
    defaultValues: { enabled: initialEnabled, ...initialData },
  });
  const { fields } = useFieldArray({ control: form.control, name: "tabs" });
  const { pending, error, success, run } = useSaveAction();

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(() => saveHomeSection("resources", { enabled, data }));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />
        <TextField label="Heading Title" {...form.register("heading.title")} />

        <div className="space-y-6">
          {fields.map((field, i) => (
            <div key={field.id} className="space-y-4 rounded-lg border border-border p-4">
              <span className="text-sm font-semibold">{form.watch(`tabs.${i}.label`)}</span>
              <FieldGrid>
                <TextField label="Tab Label" {...form.register(`tabs.${i}.label`)} />
                <TextField label="CTA Label" {...form.register(`tabs.${i}.cta.label`)} />
              </FieldGrid>
              <TextField label="CTA Href" {...form.register(`tabs.${i}.cta.href`)} />

              <ArticlesRepeater tabIndex={i} />
            </div>
          ))}
        </div>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}

function ArticlesRepeater({ tabIndex }: { tabIndex: number }) {
  const form = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `tabs.${tabIndex}.articles`,
  });

  return (
    <div className="space-y-3 border-t border-border pt-4">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Articles</span>

      {fields.map((field, j) => (
        <RepeaterItem key={field.id} title={`Article ${j + 1}`} onRemove={() => remove(j)}>
          <SwitchField
            label="Published"
            checked={form.watch(`tabs.${tabIndex}.articles.${j}.published`)}
            onCheckedChange={(v) => form.setValue(`tabs.${tabIndex}.articles.${j}.published`, v)}
          />
          <FieldGrid>
            <TextField label="Slug" {...form.register(`tabs.${tabIndex}.articles.${j}.slug`)} />
            <TextField label="Title" {...form.register(`tabs.${tabIndex}.articles.${j}.title`)} />
          </FieldGrid>
          <FieldGrid>
            <TextField label="Image Src" {...form.register(`tabs.${tabIndex}.articles.${j}.image.src`)} />
            <TextField label="Image Alt" {...form.register(`tabs.${tabIndex}.articles.${j}.image.alt`)} />
          </FieldGrid>
        </RepeaterItem>
      ))}

      <AddButton
        label="Add Article"
        onClick={() =>
          append({ id: `art_${Date.now()}`, published: true, slug: "", title: "", image: { src: "", alt: "" } })
        }
      />
    </div>
  );
}
