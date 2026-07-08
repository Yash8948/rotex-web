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
import { useSaveAction } from "@/hooks/use-save-action";
import { createProduct } from "@/app/admin/(dashboard)/products/actions";
import {
  ProductFormFields,
  productToFormValues,
  formValuesToProductInput,
  type ProductFormValues,
} from "@/components/admin/products/product-form-fields";

export function ProductFormDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const form = useForm<ProductFormValues>({ defaultValues: productToFormValues() });
  const { pending, error, run } = useSaveAction();

  function onSubmit(values: ProductFormValues) {
    run(async () => {
      try {
        await createProduct(formValuesToProductInput(values));
      } catch (err) {
        toast.error("Failed to add product");
        throw err;
      }
      toast.success("Product added");
      setOpen(false);
      form.reset();
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) form.reset(productToFormValues());
      }}
    >
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProductFormFields />

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
