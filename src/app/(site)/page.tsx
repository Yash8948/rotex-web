import { fetchHomeSection, fetchIndustries } from "@/lib/site-api";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustedLeaders } from "@/components/sections/trusted-leaders";
import { RedefiningSection } from "@/components/sections/redefining-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ProductsSection } from "@/components/sections/products-section";
import { CustomerStoriesSection } from "@/components/sections/customer-stories-section";
import { LearnSection } from "@/components/sections/learn-section";
import { CtaSection } from "@/components/sections/cta-section";

type HeroData = {
  slides: {
    id: string;
    published?: boolean;
    title: string;
    description: string;
    media: { type: "image" | "video"; src: string; alt?: string };
    cta_buttons: { label: string; href: string }[];
  }[];
};
type PartnersData = { title: string; logos: { id: string; src: string; alt: string }[] };
type RedefiningData = {
  heading: { title: string; subtitle: string };
  media: { type: "image" | "video"; src: string; alt?: string };
  tagline: { prefix: string; highlight: string; suffix: string };
  stats: { id: string; value: number; suffix: string; label: string; format_comma: boolean; published: boolean }[];
};
type IndustriesHeadingData = { heading: { title: string; subtitle: string } };
type IndustryCard = { id: string; slug: string; name: string; description: string; image: string };

export default async function Home() {
  const hero = await fetchHomeSection<HeroData>("hero");
  const partners = await fetchHomeSection<PartnersData>("partners");
  const redefining = await fetchHomeSection<RedefiningData>("redefining");
  const industriesSection = await fetchHomeSection<IndustriesHeadingData>("industries");
  const industriesList = await fetchIndustries<{ industries: IndustryCard[] }>();

  return (
    <>
      {hero?.enabled && <HeroSection slides={hero.slides} />}
      {partners?.enabled && partners.logos.length > 0 && (
        <TrustedLeaders title={partners.title} logos={partners.logos} />
      )}
      {redefining?.enabled && (
        <RedefiningSection
          heading={redefining.heading}
          media={redefining.media}
          tagline={redefining.tagline}
          stats={redefining.stats}
        />
      )}
      {industriesSection?.enabled && industriesList && industriesList.industries.length > 0 && (
        <IndustriesSection heading={industriesSection.heading} industries={industriesList.industries} />
      )}
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
