"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ImportSummary } from "@/lib/product-import";

export function ImportProductsButton() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/products/import", { method: "POST", body: formData });
      const json = await res.json();

      if (!json.success) {
        toast.error(json.error?.message ?? "Import failed");
        return;
      }

      const summary: ImportSummary = json.data;
      toast.success(
        `Import complete: ${summary.created} created, ${summary.updated} updated, ${summary.totalVariants} variants`
      );
      if (summary.unrecognizedPrefixes.length) {
        toast.warning(
          `Unrecognized model-number prefixes defaulted to "Solenoid Valve": ${summary.unrecognizedPrefixes.join(", ")}`
        );
      }
      router.refresh();
    } catch {
      toast.error("Import failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="gap-1.5"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
        {uploading ? "Importing..." : "Upload Excel"}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
