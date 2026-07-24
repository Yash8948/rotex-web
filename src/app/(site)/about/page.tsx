import Link from "next/link";
import { AboutHeroSection } from "@/components/sections/about-hero-section";
import { AboutStorySection } from "@/components/sections/about-story-section";
import { MissionVisionSection } from "@/components/sections/mission-vision-section";
import { AboutValuesSection } from "@/components/sections/about-values-section";
import { JourneyTimelineSection } from "@/components/sections/journey-timeline-section";
import { TrustedCountriesBanner } from "@/components/sections/trusted-countries-banner";
import { ZeroDowntimeCtaSection } from "@/components/sections/zero-downtime-cta-section";
import { GrowWithRotexSection } from "@/components/sections/grow-with-rotex-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { GallerySwiperSection } from "@/components/sections/gallery-swiper-section";
import { AboutCaseStudiesSection } from "@/components/sections/about-case-studies-section";

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection
        title="Empowering Industries. Where It Matters Most."
        description="Engineered flow control solutions designed to perform where operational failure is not an option - across Oil & Gas, Chemical, Power, Pharma, Automotive, and global process industries."
      >
        <Link
          href="/contact"
          className="inline-flex justify-center items-center px-6 py-3.5 rounded-[47px] bg-white shadow-[0px_13px_7.8px_-12px_rgba(0,0,0,0.25)] outline outline-[0.5px] outline-offset-[-0.5px] outline-red-600 text-red-600 font-montserrat font-bold text-sm uppercase leading-5 hover:bg-zinc-100 transition-colors duration-200"
        >
          Talk to Expert
        </Link>
      </AboutHeroSection>

      <AboutStorySection />

      <MissionVisionSection />

      <AboutValuesSection />

      <JourneyTimelineSection />

      <TrustedCountriesBanner />

      <ZeroDowntimeCtaSection />

      <GrowWithRotexSection />

      <AchievementsSection />

      <GallerySwiperSection />

      <AboutCaseStudiesSection />
    </>
  );
}
