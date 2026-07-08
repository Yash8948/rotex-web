import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/admin/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ProductEditForm } from "@/components/admin/products/product-edit-form";
import { ProductDetailHeader } from "@/components/admin/products/product-detail-header";

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: { orderBy: [{ size: "asc" }, { optionCode: "asc" }] } },
  });

  if (!product) notFound();

  const specsEntries = product.specs ? Object.entries(product.specs) : [];
  const approvalsEntries = product.approvals
    ? Object.entries(product.approvals).filter(([, v]) => v)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{product.code}</span>
            <Badge variant="outline">{product.category}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/admin" },
              { label: "Products", href: "/admin/products" },
              { label: product.name },
            ]}
          />
          <ProductDetailHeader id={product.id} name={product.name} code={product.code} />
        </div>
      </div>

      <div className="rounded-lg border border-border p-5">
        <h2 className="mb-4 text-sm font-semibold">Details</h2>
        <ProductEditForm product={product} />
      </div>

      {(specsEntries.length > 0 || approvalsEntries.length > 0) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {specsEntries.length > 0 && (
            <div className="rounded-lg border border-border p-5">
              <h2 className="mb-4 text-sm font-semibold">Specifications</h2>
              <dl className="space-y-2 text-sm">
                {specsEntries.map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {approvalsEntries.length > 0 && (
            <div className="rounded-lg border border-border p-5">
              <h2 className="mb-4 text-sm font-semibold">Approvals</h2>
              <dl className="space-y-2 text-sm">
                {approvalsEntries.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <dt className="uppercase text-muted-foreground">{k}</dt>
                    <dd>{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}

      <div className="rounded-lg border border-border">
        <div className="border-b border-border p-5">
          <h2 className="text-sm font-semibold">Variants ({product.variants.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2.5 pl-5 pr-3 font-medium">Size</th>
                <th className="py-2.5 pr-3 font-medium">Type</th>
                <th className="py-2.5 pr-3 font-medium">Option Code</th>
                <th className="py-2.5 pr-3 font-medium">Min Pressure</th>
                <th className="py-2.5 pr-3 font-medium">Max Pressure</th>
                <th className="py-2.5 pr-3 font-medium">Orifice</th>
                <th className="py-2.5 pr-5 font-medium">Flow Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {product.variants.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-muted-foreground">
                    No variants.
                  </td>
                </tr>
              )}
              {product.variants.map((v) => (
                <tr key={v.id}>
                  <td className="py-2.5 pl-5 pr-3">{v.size}</td>
                  <td className="py-2.5 pr-3">{v.type ?? "—"}</td>
                  <td className="py-2.5 pr-3">{v.optionCode ?? "—"}</td>
                  <td className="py-2.5 pr-3">{v.minPressure ?? "—"}</td>
                  <td className="py-2.5 pr-3">{v.maxPressure ?? "—"}</td>
                  <td className="py-2.5 pr-3">{v.orifice ?? "—"}</td>
                  <td className="py-2.5 pr-5">{v.flowFactor ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
