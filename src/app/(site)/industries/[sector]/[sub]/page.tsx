import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/data/industries";
import { IndustryHero } from "@/components/sections/industry-hero";
import { TrustedLeaders } from "@/components/sections/trusted-leaders";
import { IndustryChallengesSolutions } from "@/components/sections/industry-challenges-solutions";
import { IndustryProductsSwiper } from "@/components/sections/industry-products-swiper";
import { IndustryCustomerStories } from "@/components/sections/industry-customer-stories";

import type { StaticImageData } from "next/image";
import oilBg        from "@/assets/Images/breadcurmbBackgrounds/oil_bg.jpg";
import powerBg      from "@/assets/Images/breadcurmbBackgrounds/power_bg.png";
import automativeBg from "@/assets/Images/breadcurmbBackgrounds/automative_bg.png";
import railBg       from "@/assets/Images/breadcurmbBackgrounds/rail_bg.jpg";
import aerospaceBg  from "@/assets/Images/breadcurmbBackgrounds/aerospace_bg.jpg";
import machineBg    from "@/assets/Images/breadcurmbBackgrounds/machine_bg.jpg";

const BG_MAP: Record<string, StaticImageData> = {
  oil:        oilBg,
  power:      powerBg,
  automative: automativeBg,
  rail:       railBg,
  aerospace:  aerospaceBg,
  machine:    machineBg,
};

type Props = { params: Promise<{ sector: string; sub: string }> };

export async function generateStaticParams() {
  return INDUSTRIES.flatMap((industry) =>
    industry.subIndustries.map((sub) => ({
      sector: industry.slug,
      sub: sub.slug,
    }))
  );
}

export default async function IndustrySubPage({ params }: Props) {
  const { sector, sub } = await params;

  const industry = INDUSTRIES.find((i) => i.slug === sector);
  if (!industry) notFound();

  const subIndustry = industry.subIndustries.find((s) => s.slug === sub);
  if (!subIndustry) notFound();

  const bg = industry.bgKey ? BG_MAP[industry.bgKey] : undefined;

  return (
    <>
      {bg && (
        <IndustryHero
          name={subIndustry.name}
          description={subIndustry.description}
          bg={bg}
        />
      )}

      <TrustedLeaders title="Trusted by Industry leaders" />

      <IndustryChallengesSolutions
        challengesTitle={subIndustry.challengesTitle}
        challenges={subIndustry.challenges}
        solutionsTitle={subIndustry.solutionsTitle}
        solutionsIntro={subIndustry.solutionsIntro}
        solutions={subIndustry.solutions}
      />

      <div id="recommended-products">
        <IndustryProductsSwiper products={subIndustry.recommendedProducts} />
      </div>

      <IndustryCustomerStories stories={subIndustry.customerStories} />
    </>
  );
}
