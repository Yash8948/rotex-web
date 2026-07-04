"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { TextField, TextAreaField, SwitchField, RepeaterItem, AddButton, FieldGrid } from "@/components/admin/form-fields";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSection } from "@/app/admin/(dashboard)/home/actions";

type ProductCard = {
  id: string;
  published: boolean;
  slug: string;
  name: string;
  description: string;
  image: { src: string; alt: string };
};
type FormValues = {
  enabled: boolean;
  heading: { title: string };
  cta: { label: string; href: string };
  products: ProductCard[];
};

export function ProductsForm({
  initialEnabled,
  initialData,
}: {
  initialEnabled: boolean;
  initialData: Omit<FormValues, "enabled">;
}) {
  const form = useForm<FormValues>({
    defaultValues: { enabled: initialEnabled, ...initialData },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "products" });
  const { pending, error, success, run } = useSaveAction();

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(() => saveHomeSection("products", { enabled, data }));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />

        <TextField label="Heading Title" {...form.register("heading.title")} />
        <FieldGrid>
          <TextField label="CTA Label" {...form.register("cta.label")} />
          <TextField label="CTA Href" {...form.register("cta.href")} />
        </FieldGrid>

        <div className="space-y-4">
          {fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Product ${i + 1}`} onRemove={() => remove(i)}>
              <SwitchField
                label="Published"
                checked={form.watch(`products.${i}.published`)}
                onCheckedChange={(v) => form.setValue(`products.${i}.published`, v)}
              />
              <FieldGrid>
                <TextField label="Slug" {...form.register(`products.${i}.slug`)} />
                <TextField label="Name" {...form.register(`products.${i}.name`)} />
              </FieldGrid>
              <TextAreaField label="Description" {...form.register(`products.${i}.description`)} />
              <FieldGrid>
                <TextField label="Image Src" {...form.register(`products.${i}.image.src`)} />
                <TextField label="Image Alt" {...form.register(`products.${i}.image.alt`)} />
              </FieldGrid>
            </RepeaterItem>
          ))}

          <AddButton
            label="Add Product"
            onClick={() =>
              append({
                id: `prod_${Date.now()}`,
                published: true,
                slug: "",
                name: "",
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
