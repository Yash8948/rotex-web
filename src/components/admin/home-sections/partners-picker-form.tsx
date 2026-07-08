"use client";

import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { SectionMeta, SaveBar } from "@/components/admin/section-form-shell";
import { TextField } from "@/components/admin/form-fields";
import { Switch } from "@/components/ui/switch";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveHomeSection } from "@/app/admin/(dashboard)/home/actions";

type Partner = { id: string; name: string; logo: string };
type FormValues = { enabled: boolean; title: string; partnerIds: string[] };

export function PartnersPickerForm({
  initialEnabled,
  initialData,
  allPartners,
}: {
  initialEnabled: boolean;
  initialData: { title: string; partnerIds: string[] };
  allPartners: Partner[];
}) {
  const form = useForm<FormValues>({
    defaultValues: {
      enabled: initialEnabled,
      title: initialData.title,
      partnerIds: initialData.partnerIds ?? [],
    },
  });
  const { pending, error, success, run } = useSaveAction();
  const selected = form.watch("partnerIds");

  function toggle(id: string, checked: boolean) {
    const current = form.getValues("partnerIds");
    form.setValue(
      "partnerIds",
      checked ? [...current, id] : current.filter((p) => p !== id)
    );
  }

  function onSubmit(values: FormValues) {
    const { enabled, ...data } = values;
    run(async () => {
      try {
        await saveHomeSection("partners", { enabled, data });
        toast.success("Partners section saved");
      } catch (err) {
        toast.error("Failed to save partners section");
        throw err;
      }
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SectionMeta />
        <TextField label="Title" {...form.register("title")} />

        <div className="space-y-1 rounded-lg border border-border">
          {allPartners.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">
              No published partners yet. Add some on the Partners page first.
            </p>
          )}
          {allPartners.map((partner) => (
            <div key={partner.id} className="flex items-center gap-4 border-b border-border p-4 last:border-b-0">
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted/30">
                {partner.logo && (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={40}
                    height={40}
                    className="size-full object-contain"
                    unoptimized
                  />
                )}
              </div>
              <span className="flex-1 text-sm font-medium">{partner.name}</span>
              <Switch
                checked={selected.includes(partner.id)}
                onCheckedChange={(v) => toggle(partner.id, v)}
              />
            </div>
          ))}
        </div>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}
