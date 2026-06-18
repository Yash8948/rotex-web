import Link from "next/link";
import { notFound } from "next/navigation";
import type { StaticImageData } from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { INDUSTRIES } from "@/data/industries";

import oilBg        from "@/assets/Images/breadcurmbBackgrounds/oil_bg.jpg";
import powerBg      from "@/assets/Images/breadcurmbBackgrounds/power_bg.png";
import automativeBg from "@/assets/Images/breadcurmbBackgrounds/automative_bg.png";
import railBg       from "@/assets/Images/breadcurmbBackgrounds/rail_bg.jpg";
import aerospaceBg  from "@/assets/Images/breadcurmbBackgrounds/aerospace_bg.jpg";
import machineBg    from "@/assets/Images/breadcurmbBackgrounds/machine_bg.jpg";

const BG_MAP: Record<string, StaticImageData> = {
  oil:       oilBg,
  power:     powerBg,
  automative: automativeBg,
  rail:      railBg,
  aerospace: aerospaceBg,
  machine:   machineBg,
};

type Props = {
  params: Promise<{ sector: string }>;
};

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ sector: i.slug }));
}

export default async function IndustryPage({ params }: Props) {
  const { sector } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === sector);
  if (!industry) notFound();

  const bg = industry.bgKey ? BG_MAP[industry.bgKey] : undefined;

  return (
    <div>
      <PageHero title={industry.name} description={industry.description} bg={bg}>
        <div className="flex flex-wrap gap-5">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full ring-1 ring-inset ring-stone-500 text-white text-xs font-semibold font-montserrat uppercase leading-5 hover:bg-white/10 transition-colors duration-200"
          >
            Talk to an Expert
          </Link>
          <Link
            href={`/products?industry=${industry.slug}`}
            className="px-5 py-2.5 rounded-full ring-1 ring-inset ring-stone-500 text-white text-xs font-semibold font-montserrat uppercase leading-5 hover:bg-white/10 transition-colors duration-200"
          >
            See Recommended Products
          </Link>
        </div>
      </PageHero>

      {/* Page body */}
      <div className="container py-16">
        <p className="text-stone-400 text-sm">Industry page content coming soon.</p>
      </div>
    </div>
  );
}
