"use client";

import { useForm, FormProvider } from "react-hook-form";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { TextField, TextAreaField, FieldGrid } from "@/components/admin/form-fields";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSection } from "@/app/admin/(dashboard)/home/actions";

type FormValues = {
  enabled: boolean;
  background_image: { src: string; alt: string };
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
};

export function CtaForm({
  initialEnabled,
  initialData,
}: {
  initialEnabled: boolean;
  initialData: Omit<FormValues, "enabled">;
}) {
  const form = useForm<FormValues>({
    defaultValues: { enabled: initialEnabled, ...initialData },
  });
  const { pending, error, success, run } = useSaveAction();

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(() => saveHomeSection("cta", { enabled, data }));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />

        <FieldGrid>
          <TextField label="Background Image Src" {...form.register("background_image.src")} />
          <TextField label="Background Image Alt" {...form.register("background_image.alt")} />
        </FieldGrid>
        <TextField label="Title" {...form.register("title")} />
        <TextAreaField label="Subtitle" {...form.register("subtitle")} />
        <FieldGrid>
          <TextField label="CTA Label" {...form.register("cta.label")} />
          <TextField label="CTA Href" {...form.register("cta.href")} />
        </FieldGrid>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}
