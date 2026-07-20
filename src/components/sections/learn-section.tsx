"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { TabsNav } from "@/components/ui/tabs-nav";
import { ArticleCard } from "@/components/ui/article-card";

type ResourceItem = { slug: string; title: string; image: string };
type ResourceTab = {
  id: string;
  label: string;
  cta: { label: string; href: string };
  resources: ResourceItem[];
};

type LearnSectionProps = {
  heading?: string;
  tabs?: ResourceTab[];
};

const defaultTabs: ResourceTab[] = [
  {
    id: "case-studies",
    label: "Case Studies",
    cta: { label: "Read All Case Studies", href: "/case-studies" },
    resources: [
      {
        slug: "solenoid-valve-classification",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        title: "Solenoid Valve Classification: The Engineering Logic Behind Reliable Automation Systems",
      },
    ],
  },
];

export function LearnSection({ heading = "Resources", tabs = defaultTabs }: LearnSectionProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];
  const cards = activeTab?.resources ?? [];

  return (
    <section className="bg-white py-10 lg:py-20">
      <div className="container">

        {/* Heading */}
        <h2 className="font-montserrat font-normal text-3xl lg:text-4xl leading-10 mb-6">
          <span className="text-gradient-orange-dark">{heading}</span>
        </h2>

        {/* Tabs */}
        <TabsNav tabs={tabs} active={active} onChange={setActive} className="mb-10" />

        {/* Cards — horizontal swiper on mobile, 3-column grid on desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab?.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="no-scrollbar flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory lg:snap-none -mx-5 px-5 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {cards.map((card) => (
              <ArticleCard
                key={card.slug}
                image={card.image}
                title={card.title}
                href={`/${activeTab.id}/${card.slug}`}
                className="w-64 shrink-0 snap-center lg:w-auto"
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        {activeTab?.cta && (
          <div className="flex justify-center mt-10 lg:mt-14">
            <Link
              href={activeTab.cta.href}
              className="inline-flex justify-center items-center gap-3.5 px-6 py-3.5 rounded-full bg-stone-900 text-white font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-stone-800 transition-colors duration-150"
            >
              {activeTab.cta.label}
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
