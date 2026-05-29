import { HeroSection } from "@/components/sections/hero-section";
import { TrustedLeaders } from "@/components/sections/trusted-leaders";
import { RedefiningSection } from "@/components/sections/redefining-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ProductsSection } from "@/components/sections/products-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedLeaders />
      <RedefiningSection />
      <IndustriesSection />
      <ProductsSection />
    </>
  );
}
