import { redirect, notFound } from "next/navigation";
import { INDUSTRIES } from "@/data/industries";

type Props = { params: Promise<{ sector: string }> };

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ sector: i.slug }));
}

export default async function IndustryPage({ params }: Props) {
  const { sector } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === sector);
  if (!industry) notFound();

  const firstSub = industry.subIndustries[0];
  if (!firstSub) notFound();

  redirect(`/industries/${sector}/${firstSub.slug}`);
}
