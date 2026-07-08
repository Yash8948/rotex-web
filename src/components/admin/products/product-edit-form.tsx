"use client";

import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSaveAction } from "@/hooks/use-save-action";
import { updateProduct } from "@/app/admin/(dashboard)/products/actions";
import {
  ProductFormFields,
  productToFormValues,
  formValuesToProductInput,
  type EditableProduct,
  type ProductFormValues,
} from "@/components/admin/products/product-form-fields";

export function ProductEditForm({ product }: { product: EditableProduct }) {
  const router = useRouter();
  const form = useForm<ProductFormValues>({ defaultValues: productToFormValues(product) });
  const { pending, error, run } = useSaveAction();

  function onSubmit(values: ProductFormValues) {
    run(async () => {
      try {
        await updateProduct(product.id, formValuesToProductInput(values));
      } catch (err) {
        toast.error("Failed to update product");
        throw err;
      }
      toast.success("Product updated");
      router.refresh();
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ProductFormFields />

        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
