"use client";
import { useState } from "react";
import Link from "next/link";
import { TabsNav, type Tab } from "@/components/ui/tabs-nav";
import { ArticleCard } from "@/components/ui/article-card";

const tabs: Tab[] = [
  { id: "case-studies", label: "Case Studies" },
  { id: "news",         label: "News & Updates" },
  { id: "blogs",        label: "Blogs" },
];

const content: Record<string, { image: string; title: string; href: string }[]> = {
  "case-studies": [
    {
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      title: "Solenoid Valve Classification: The Engineering Logic Behind Reliable Automation Systems",
      href: "/case-studies/solenoid-valve-classification",
    },
    {
      image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
      title: "Future of Industrial Valves: 7 Rotex Technologies Improving Reliability & Uptime",
      href: "/case-studies/future-industrial-valves",
    },
    {
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
      title: "How to Select the Right Solenoid Valve for Your Industrial Process?",
      href: "/case-studies/select-solenoid-valve",
    },
  ],
  news: [
    {
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
      title: "Rotex Expands Global Distribution Network Across 15 New Markets",
      href: "/news/global-expansion",
    },
    {
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
      title: "Rotex Launches Next-Generation Smart Valve Controllers for Industry 4.0",
      href: "/news/smart-valve-controllers",
    },
    {
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
      title: "Rotex Achieves SIL 3 Certification for Critical Safety Systems",
      href: "/news/sil3-certification",
    },
  ],
  blogs: [
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
      title: "5 Signs Your Industrial Valve Needs Immediate Maintenance",
      href: "/blog/valve-maintenance-signs",
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      title: "Understanding Valve Actuators: A Comprehensive Guide for Engineers",
      href: "/blog/valve-actuators-guide",
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      title: "Flow Control in the Oil & Gas Industry: Challenges and Solutions",
      href: "/blog/flow-control-oil-gas",
    },
  ],
};

const ctaLabel: Record<string, string> = {
  "case-studies": "Read All Case Studies",
  news:           "View All News",
  blogs:          "Read All Blogs",
};

export function LearnSection() {
  const [active, setActive] = useState("case-studies");
  const cards = content[active];

  return (
    <section className="bg-white py-10 lg:py-20">
      <div className="container">

        {/* Heading */}
        <h2 className="font-montserrat font-normal text-3xl lg:text-4xl leading-10 mb-6">
          <span className="text-gradient-orange-dark">Resources</span>
        </h2>

        {/* Tabs */}
        <TabsNav tabs={tabs} active={active} onChange={setActive} className="mb-10" />

        {/* Cards — horizontal swiper on mobile, 3-column grid on desktop */}
        <div
          className="no-scrollbar flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory lg:snap-none -mx-5 px-5 lg:mx-0 lg:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {cards.map((card) => (
            <ArticleCard key={card.href} {...card} className="w-64 shrink-0 snap-center lg:w-auto" />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10 lg:mt-14">
          <Link
            href={`/${active}`}
            className="inline-flex justify-center items-center gap-3.5 px-6 py-3.5 rounded-full bg-stone-900 text-white font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-stone-800 transition-colors duration-150"
          >
            {ctaLabel[active]}
          </Link>
        </div>

      </div>
    </section>
  );
}
