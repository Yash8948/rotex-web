"use client";

import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import { SaveBar } from "@/components/admin/section-form-shell";
import { TextField, RepeaterItem, AddButton, FieldGrid } from "@/components/admin/form-fields";
import { useSaveAction } from "@/hooks/use-save-action";
import { saveGlobalConfig } from "@/app/admin/(dashboard)/home/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type NavLink = { id: string; label: string; href: string };
type FooterLink = { label: string; href: string };
type FooterColumn = { id: string; heading: string; links: FooterLink[] };
type Social = { id: string; platform: string; href: string };

type FormValues = {
  logo: { src: string; alt: string; href: string };
  header: { nav: NavLink[]; cta: { label: string; href: string } };
  footer: {
    tagline: string;
    columns: FooterColumn[];
    social: Social[];
    legal: { copyright: string; links: FooterLink[] };
    contact: { email: string; phone: string; address: string };
  };
};

export function GlobalConfigForm({ initialData }: { initialData: FormValues }) {
  const form = useForm<FormValues>({ defaultValues: initialData });
  const { pending, error, success, run } = useSaveAction();

  const nav = useFieldArray({ control: form.control, name: "header.nav" });
  const columns = useFieldArray({ control: form.control, name: "footer.columns" });
  const social = useFieldArray({ control: form.control, name: "footer.social" });
  const legalLinks = useFieldArray({ control: form.control, name: "footer.legal.links" });

  function onSubmit(values: FormValues) {
    run(() => saveGlobalConfig(values));
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold">Logo</h2>
          <FieldGrid>
            <TextField label="Src" {...form.register("logo.src")} />
            <TextField label="Alt" {...form.register("logo.alt")} />
          </FieldGrid>
          <TextField label="Href" {...form.register("logo.href")} />
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold">Header Nav</h2>
          {nav.fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Nav ${i + 1}`} onRemove={() => nav.remove(i)}>
              <FieldGrid>
                <TextField label="Label" {...form.register(`header.nav.${i}.label`)} />
                <TextField label="Href" {...form.register(`header.nav.${i}.href`)} />
              </FieldGrid>
            </RepeaterItem>
          ))}
          <AddButton
            label="Add Nav Item"
            onClick={() => nav.append({ id: `nav_${Date.now()}`, label: "", href: "" })}
          />
          <FieldGrid>
            <TextField label="Header CTA Label" {...form.register("header.cta.label")} />
            <TextField label="Header CTA Href" {...form.register("header.cta.href")} />
          </FieldGrid>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold">Footer</h2>
          <TextField label="Tagline" {...form.register("footer.tagline")} />

          {columns.fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Column ${i + 1}`} onRemove={() => columns.remove(i)}>
              <TextField label="Heading" {...form.register(`footer.columns.${i}.heading`)} />
              <FooterColumnLinks columnIndex={i} />
            </RepeaterItem>
          ))}
          <AddButton
            label="Add Column"
            onClick={() => columns.append({ id: `col_${Date.now()}`, heading: "", links: [] })}
          />

          {social.fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Social ${i + 1}`} onRemove={() => social.remove(i)}>
              <FieldGrid>
                <TextField label="Platform" {...form.register(`footer.social.${i}.platform`)} />
                <TextField label="Href" {...form.register(`footer.social.${i}.href`)} />
              </FieldGrid>
            </RepeaterItem>
          ))}
          <AddButton
            label="Add Social Link"
            onClick={() => social.append({ id: `soc_${Date.now()}`, platform: "", href: "" })}
          />

          <TextField label="Legal Copyright" {...form.register("footer.legal.copyright")} />
          {legalLinks.fields.map((field, i) => (
            <RepeaterItem key={field.id} title={`Legal Link ${i + 1}`} onRemove={() => legalLinks.remove(i)}>
              <FieldGrid>
                <TextField label="Label" {...form.register(`footer.legal.links.${i}.label`)} />
                <TextField label="Href" {...form.register(`footer.legal.links.${i}.href`)} />
              </FieldGrid>
            </RepeaterItem>
          ))}
          <AddButton label="Add Legal Link" onClick={() => legalLinks.append({ label: "", href: "" })} />

          <FieldGrid>
            <TextField label="Contact Email" {...form.register("footer.contact.email")} />
            <TextField label="Contact Phone" {...form.register("footer.contact.phone")} />
          </FieldGrid>
          <TextField label="Contact Address" {...form.register("footer.contact.address")} />
        </section>

        <SaveBar pending={pending} error={error} success={success} />
      </form>
    </FormProvider>
  );
}

function FooterColumnLinks({ columnIndex }: { columnIndex: number }) {
  const form = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `footer.columns.${columnIndex}.links`,
  });

  return (
    <div className="space-y-2 border-t border-border pt-3">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Links</span>
      {fields.map((field, j) => (
        <div key={field.id} className="flex items-end gap-2">
          <TextField label="Label" {...form.register(`footer.columns.${columnIndex}.links.${j}.label`)} />
          <TextField label="Href" {...form.register(`footer.columns.${columnIndex}.links.${j}.href`)} />
          <Button type="button" variant="ghost" size="icon-sm" onClick={() => remove(j)} className="mb-1">
            <Trash2 className="size-3.5 text-destructive" />
          </Button>
        </div>
      ))}
      <AddButton label="Add Link" onClick={() => append({ label: "", href: "" })} />
    </div>
  );
}
