import { fetchHomeSection } from "@/lib/site-api";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustedLeaders } from "@/components/sections/trusted-leaders";
import { RedefiningSection } from "@/components/sections/redefining-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ProductsSection } from "@/components/sections/products-section";
import { CustomerStoriesSection } from "@/components/sections/customer-stories-section";
import { LearnSection } from "@/components/sections/learn-section";
import { CtaSection } from "@/components/sections/cta-section";

type PartnersData = { title: string; logos: { id: string; src: string; alt: string }[] };
type RedefiningData = {
  heading: { title: string; subtitle: string };
  media: { type: "image" | "video"; src: string; alt?: string };
  tagline: { prefix: string; highlight: string; suffix: string };
  stats: { id: string; value: number; suffix: string; label: string; format_comma: boolean; published: boolean }[];
};

export default async function Home() {
  const partners = await fetchHomeSection<PartnersData>("partners");
  const redefining = await fetchHomeSection<RedefiningData>("redefining");

  return (
    <>
      <HeroSection />
      {partners?.enabled && <TrustedLeaders title={partners.title} logos={partners.logos} />}
      {redefining?.enabled && (
        <RedefiningSection
          heading={redefining.heading}
          media={redefining.media}
          tagline={redefining.tagline}
          stats={redefining.stats}
        />
      )}
      <IndustriesSection />
      <ProductsSection />
      <TrustedLeaders
        title="Certified & Trusted Worldwide"
        primary
      />
      <CustomerStoriesSection />
      <LearnSection />
      <CtaSection />
    </>
  );
}
