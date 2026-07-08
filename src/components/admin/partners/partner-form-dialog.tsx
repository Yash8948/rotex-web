"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField, SwitchField } from "@/components/admin/form-fields";
import { MediaField } from "@/components/admin/media-field";
import { useSaveAction } from "@/hooks/use-save-action";
import { createPartner, updatePartner } from "@/app/admin/(dashboard)/partners/actions";

type PartnerFormValues = {
  name: string;
  published: boolean;
  logo: { src: string };
};

export function PartnerFormDialog({
  partner,
  trigger,
}: {
  partner?: { id: string; name: string; logo: string; published: boolean };
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<PartnerFormValues>({
    defaultValues: {
      name: partner?.name ?? "",
      published: partner?.published ?? true,
      logo: { src: partner?.logo ?? "" },
    },
  });
  const { pending, error, run } = useSaveAction();

  function onSubmit(values: PartnerFormValues) {
    const payload = { name: values.name, logo: values.logo.src, published: values.published };
    run(async () => {
      try {
        if (partner) {
          await updatePartner(partner.id, payload);
        } else {
          await createPartner(payload);
        }
      } catch (err) {
        toast.error(partner ? "Failed to update partner" : "Failed to add partner");
        throw err;
      }
      toast.success(partner ? "Partner updated" : "Partner added");
      setOpen(false);
      form.reset();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{partner ? "Edit Partner" : "Add Partner"}</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextField label="Name" {...form.register("name", { required: true })} />
            <MediaField name="logo" mediaType="image" showAlt={false} />
            <SwitchField
              label="Published"
              checked={form.watch("published")}
              onCheckedChange={(v) => form.setValue("published", v)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                {pending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
