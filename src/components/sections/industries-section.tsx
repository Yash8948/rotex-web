"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ImageView } from "@/components/ui/image-view";
import { RotexArrow } from "@/components/ui/rotex-arrow";
import { cn } from "@/lib/utils";

const industries = [
  {
    id: "oil-gas",
    label: "Oil and Gas",
    title: "OIL AND GAS",
    description:
      "The Hidden Reason 73% of Oil & Gas Plants Shutdowns Are Actually Preventable (And Why Most Plants Still Don't Know This)",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    href: "/industries/oil-gas",
  },
  {
    id: "process",
    label: "Process",
    title: "PROCESS",
    description:
      "Precision flow control solutions built for continuous process environments where uptime is non-negotiable.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    href: "/industries/process",
  },
  {
    id: "power",
    label: "Power",
    title: "POWER",
    description:
      "Engineered screening and conveying systems that keep power generation facilities running at peak efficiency.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
    href: "/industries/power",
  },
  {
    id: "rail",
    label: "Rail",
    title: "RAIL",
    description:
      "Heavy-duty material handling solutions designed for the demanding conditions of rail infrastructure and maintenance.",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
    href: "/industries/rail",
  },
  {
    id: "machine-solution",
    label: "Machine Solution",
    title: "MACHINE SOLUTION",
    description:
      "Custom-engineered flow and separation systems integrated seamlessly into your existing machine architecture.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80",
    href: "/industries/machine-solution",
  },
  {
    id: "aerospace",
    label: "Aerospace & Defence",
    title: "AEROSPACE & DEFENCE",
    description:
      "Certified separation and screening equipment meeting the rigorous standards of aerospace and defence supply chains.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&q=80",
    href: "/industries/aerospace",
  },
  {
    id: "automotive",
    label: "Automotive",
    title: "AUTOMOTIVE",
    description:
      "High-throughput material handling systems built for the speed and precision demands of automotive production.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    href: "/industries/automotive",
  },
];

export function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = industries[activeIndex];

  return (
    <section className="bg-[#f5f1ef] py-16 lg:py-30">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* ── LEFT: heading + tabs ── */}
          <div className="w-full lg:w-72 lg:shrink-0">
            <h2
              className="text-gradient-orange-dark font-montserrat font-bold leading-tight mb-4 text-3xl lg:text-[36px]"
            >
              Built Around Your Industry
            </h2>

            <p className="text-stone-500 text-[13px] font-montserrat leading-5 mb-6 lg:mb-8 max-w-sm lg:max-w-56">
              Tailored solutions designed to meet the operational demands of your
              sector — ensuring precision, reliability, and long-term performance.
            </p>

            {/* Tab list — horizontal scroll on mobile, vertical on desktop */}
            <div className="flex flex-row overflow-x-auto gap-1 pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:gap-0">
              {industries.map((industry, i) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "shrink-0 text-left py-2.5 lg:py-3 px-4 lg:pl-4 lg:pr-0 border-b-2 lg:border-b-0 lg:border-l-2 font-montserrat font-medium text-sm transition-all duration-150 whitespace-nowrap lg:whitespace-normal rounded-md lg:rounded-none",
                    i === activeIndex
                      ? "border-brand-500 text-brand-500 bg-brand-500/5 lg:bg-transparent"
                      : "border-transparent text-stone-700 hover:text-brand-500 hover:border-brand-200"
                  )}
                >
                  {industry.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: image card — 847×565 from Figma ── */}
          <div
            className="w-full flex-1 relative rounded-2xl lg:rounded-3xl overflow-hidden"
            style={{ height: "clamp(300px, 44vw, 565px)" }}
          >

            {/* Animated image swap */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <ImageView
                  fill
                  src={active.image}
                  alt={active.title}
                  containerClassName="w-full h-full"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Base dark tint */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            {/* Bottom gradient — strong dark for text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)",
              }}
            />

            {/* Card content — bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between gap-6 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-text"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <h3 className="text-white font-montserrat font-bold text-xl tracking-widest uppercase mb-2">
                    {active.title}
                  </h3>
                  <p className="text-white/70 text-[13px] font-montserrat leading-5 max-w-xs">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <Link
                href={active.href}
                className="shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-brand-500 font-montserrat font-semibold text-sm whitespace-nowrap hover:bg-stone-50 transition-colors duration-150"
              >
                Explore
                <RotexArrow size={8} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
