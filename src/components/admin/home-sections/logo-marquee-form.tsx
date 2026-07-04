"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { TextField, SwitchField, RepeaterItem, AddButton } from "@/components/admin/form-fields";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSection } from "@/app/admin/(dashboard)/home/actions";

type Logo = { id: string; published: boolean; src: string; alt: string };
type FormValues = { enabled: boolean; title: string; logos: Logo[] };

export function LogoMarqueeForm({
  sectionKey,
  initialEnabled,
  initialData,
}: {
  sectionKey: string;
  initialEnabled: boolean;
  initialData: { title: string; logos: Logo[] };
}) {
  const form = useForm<FormValues>({
    defaultValues: { enabled: initialEnabled, ...initialData },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "logos" });
  const { pending, error, success, run } = useSaveAction();

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(() => saveHomeSection(sectionKey, { enabled, data }));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />
        <TextField label="Title" {...form.register("title")} />

        <div className="space-y-4">
          {fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Logo ${i + 1}`} onRemove={() => remove(i)}>
              <SwitchField
                label="Published"
                checked={form.watch(`logos.${i}.published`)}
                onCheckedChange={(v) => form.setValue(`logos.${i}.published`, v)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Src" {...form.register(`logos.${i}.src`)} />
                <TextField label="Alt" {...form.register(`logos.${i}.alt`)} />
              </div>
            </RepeaterItem>
          ))}

          <AddButton
            label="Add Logo"
            onClick={() => append({ id: `logo_${Date.now()}`, published: true, src: "", alt: "" })}
          />
        </div>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}
