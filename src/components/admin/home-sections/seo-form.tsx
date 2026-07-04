"use client";

import { useForm, FormProvider } from "react-hook-form";
import { SaveBar } from "@/components/admin/section-form-shell";
import { TextField, TextAreaField, FieldGrid } from "@/components/admin/form-fields";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSeo } from "@/app/admin/(dashboard)/home/actions";

type FormValues = {
  title: string;
  description: string;
  og_image: { src: string; alt: string };
  canonical: string;
};

export function SeoForm({ initialData }: { initialData: FormValues }) {
  const form = useForm<FormValues>({ defaultValues: initialData });
  const { pending, error, success, run } = useSaveAction();

  function onSubmit(values: FormValues) {
    run(() => saveHomeSeo(values));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TextField label="Title" {...form.register("title")} />
        <TextAreaField label="Description" {...form.register("description")} />
        <FieldGrid>
          <TextField label="OG Image Src" {...form.register("og_image.src")} />
          <TextField label="OG Image Alt" {...form.register("og_image.alt")} />
        </FieldGrid>
        <TextField label="Canonical URL" {...form.register("canonical")} />

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}
