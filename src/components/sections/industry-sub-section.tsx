"use client";
import { useState } from "react";
import { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  industryName: string;
  subIndustries: SubIndustry[];
  whyChoose: { title: string; highlight: string; cards: WhyChooseCard[] };
  bg?: StaticImageData | string;
};

export function IndustrySubSection({ industryName, subIndustries, whyChoose, bg }: Props) {
  const [activeSlug, setActiveSlug] = useState(subIndustries[0]?.slug ?? "");
  const active = subIndustries.find((s) => s.slug === activeSlug) ?? subIndustries[0];

  return (
    <>
      <IndustryTabs
        subIndustries={subIndustries}
        activeSlug={activeSlug}
        onTabChange={setActiveSlug}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
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

          <IndustryProductsSwiper products={active.recommendedProducts} />

          <IndustryCustomerStories stories={active.customerStories} />
        </motion.div>
      </AnimatePresence>

      <WhyChooseSection industryName={industryName} whyChoose={whyChoose} />

      <IndustryEnquiryForm industryName={industryName} />
    </>
  );
}
