"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import type { WhyChooseCard } from "@/data/industries";
import { HexIcon } from "@/components/ui/hex-icon";
import industryFaqBg from "@/assets/Images/industry/industry-faq-bg.jpg";

type Props = {
  industryName: string;
  whyChoose: {
    title: string;
    highlight: string;
    cards: WhyChooseCard[];
  };
};

// ── Desktop: sticky scroll version ───────────────────────────────────────────

function WhyChooseDesktop({ whyChoose }: Omit<Props, "industryName">) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const scrollDist = useMotionValue(300);
  const wrapperH = useTransform(scrollDist, (d) => `calc(100vh + ${d}px)`);

  useEffect(() => {
    const measure = () => {
      if (!cardsRef.current) return;
      scrollDist.set(Math.max(0, cardsRef.current.scrollHeight - 552));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [whyChoose.cards, scrollDist]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(
    [scrollYProgress, scrollDist],
    ([p, d]: number[]) => -(p * d)
  );

  return (
    <motion.div ref={wrapperRef} style={{ height: wrapperH }} className="relative">
      <div className="sticky top-24 h-[792px] overflow-hidden">
        <Image src={industryFaqBg} alt="" fill priority className="object-cover object-center" />
        <div className="container relative z-10 h-full flex items-start pt-[120px] gap-16">
          <div className="w-96 shrink-0">
            <h2 className="text-white text-4xl font-medium font-montserrat leading-10">
              {whyChoose.title}{" "}
              <span className="text-gradient-orange-dark">{whyChoose.highlight}</span>
            </h2>
          </div>

          <div className="flex-1 flex flex-col relative">
            <div className="h-[552px] overflow-hidden">
              <motion.div ref={cardsRef} style={{ y }} className="flex flex-col gap-3">
                {whyChoose.cards.map((card, i) => (
                  <div key={i} className="w-full p-5 bg-white rounded-lg flex flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-stone-900 text-xl font-medium font-montserrat leading-7">
                        {card.title}
                      </span>
                      <HexIcon size={14} className="mt-1" />
                    </div>
                    <p className="text-stone-500 text-sm font-medium font-montserrat leading-5">
                      {card.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="h-0.5 bg-white/60 w-[110%] -ml-10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Mobile: simple stacked version ───────────────────────────────────────────

function WhyChooseMobile({ whyChoose }: Omit<Props, "industryName">) {
  return (
    <div className="relative overflow-hidden">
      <Image src={industryFaqBg} alt="" fill priority className="object-cover object-center" />
      <div className="relative z-10 container py-12 flex flex-col gap-8">
        <h2 className="text-white text-2xl font-medium font-montserrat leading-8">
          {whyChoose.title}{" "}
          <span className="text-orange-300">{whyChoose.highlight}</span>
        </h2>
        <div className="flex flex-col gap-4">
          {whyChoose.cards.map((card, i) => (
            <div key={i} className="w-full p-5 bg-white rounded-lg flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <span className="text-stone-900 text-base font-medium font-montserrat leading-6">
                  {card.title}
                </span>
                <HexIcon size={14} className="mt-1" />
              </div>
              <p className="text-stone-500 text-sm font-medium font-montserrat leading-5">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Exported: renders the right variant per breakpoint ────────────────────────

export function WhyChooseSection({ whyChoose }: Props) {
  return (
    <>
      <div className="lg:hidden">
        <WhyChooseMobile whyChoose={whyChoose} />
      </div>
      <div className="hidden lg:block">
        <WhyChooseDesktop whyChoose={whyChoose} />
      </div>
    </>
  );
}
