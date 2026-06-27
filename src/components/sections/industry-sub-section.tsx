"use client";
import { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import type { SubIndustry, WhyChooseCard } from "@/data/industries";
import { IndustryTabs } from "@/components/sections/industry-tabs";
import { IndustryHero } from "@/components/sections/industry-hero";
import { TrustedLeaders } from "@/components/sections/trusted-leaders";
import { IndustryChallengesSolutions } from "@/components/sections/industry-challenges-solutions";
import { IndustryProductsSwiper } from "@/components/sections/industry-products-swiper";
import { IndustryCustomerStories } from "@/components/sections/industry-customer-stories";
import { WhyChooseSection } from "@/components/sections/why-choose-section";
import { IndustryEnquiryForm } from "@/components/sections/industry-enquiry-form";

type Props = {
  sectorSlug: string;
  industryName: string;
  activeSlug: string;
  subIndustries: SubIndustry[];
  whyChoose: { title: string; highlight: string; cards: WhyChooseCard[] };
  bg?: StaticImageData | string;
};

export function IndustrySubSection({
  sectorSlug,
  industryName,
  activeSlug,
  subIndustries,
  whyChoose,
  bg,
}: Props) {
  const active = subIndustries.find((s) => s.slug === activeSlug) ?? subIndustries[0];

  return (
    <>
      <IndustryTabs
        sectorSlug={sectorSlug}
        subIndustries={subIndustries}
      />

      <motion.div
        key={active.slug}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {bg && (
          <IndustryHero name={active.name} description={active.description} bg={bg} />
        )}

        <TrustedLeaders title="Trusted by Industry leaders" />

        <IndustryChallengesSolutions
          challengesTitle={active.challengesTitle}
          challenges={active.challenges}
          solutionsTitle={active.solutionsTitle}
          solutionsIntro={active.solutionsIntro}
          solutions={active.solutions}
        />

        <div id="recommended-products">
          <IndustryProductsSwiper products={active.recommendedProducts} />
        </div>

        <IndustryCustomerStories stories={active.customerStories} />

        <WhyChooseSection industryName={industryName} whyChoose={whyChoose} />

        <div id="enquiry-form">
          <IndustryEnquiryForm industryName={industryName} />
        </div>
      </motion.div>
    </>
  );
}
