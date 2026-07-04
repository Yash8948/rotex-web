"use client";

import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { Field, TextField, TextAreaField, SwitchField, RepeaterItem, AddButton, FieldGrid } from "@/components/admin/form-fields";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSection } from "@/app/admin/(dashboard)/home/actions";

type Story = {
  id: string;
  published: boolean;
  media: { type: "image" | "video"; src: string };
  quote: string;
  author: string;
  company: string;
};
type FormValues = {
  enabled: boolean;
  heading: { title: string; subtitle: string };
  stories: Story[];
};

export function CustomerStoriesForm({
  initialEnabled,
  initialData,
}: {
  initialEnabled: boolean;
  initialData: Omit<FormValues, "enabled">;
}) {
  const form = useForm<FormValues>({
    defaultValues: { enabled: initialEnabled, ...initialData },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "stories" });
  const { pending, error, success, run } = useSaveAction();

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(() => saveHomeSection("customer-stories", { enabled, data }));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />

        <TextField label="Heading Title" {...form.register("heading.title")} />
        <TextField label="Heading Subtitle" {...form.register("heading.subtitle")} />

        <div className="space-y-4">
          {fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Story ${i + 1}`} onRemove={() => remove(i)}>
              <SwitchField
                label="Published"
                checked={form.watch(`stories.${i}.published`)}
                onCheckedChange={(v) => form.setValue(`stories.${i}.published`, v)}
              />
              <FieldGrid>
                <Controller
                  control={form.control}
                  name={`stories.${i}.media.type`}
                  render={({ field }) => (
                    <Field label="Media Type">
                      <select
                        {...field}
                        className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </Field>
                  )}
                />
                <TextField label="Media Src" {...form.register(`stories.${i}.media.src`)} />
              </FieldGrid>
              <TextAreaField label="Quote" {...form.register(`stories.${i}.quote`)} />
              <FieldGrid>
                <TextField label="Author" {...form.register(`stories.${i}.author`)} />
                <TextField label="Company" {...form.register(`stories.${i}.company`)} />
              </FieldGrid>
            </RepeaterItem>
          ))}

          <AddButton
            label="Add Story"
            onClick={() =>
              append({
                id: `story_${Date.now()}`,
                published: true,
                media: { type: "image", src: "" },
                quote: "",
                author: "",
                company: "",
              })
            }
          />
        </div>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}
