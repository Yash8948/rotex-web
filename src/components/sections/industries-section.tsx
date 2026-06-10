"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
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

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-zinc-100 py-16 lg:py-28">
      <div className="container   ">

        {/* Heading + subtext */}
        <div className="flex flex-col gap-2 mb-8 lg:hidden">
          <h2 className="text-gradient-orange-dark font-montserrat font-normal leading-10 text-3xl">
            Built Around Your Industry
          </h2>
          <p className="text-zinc-500 text-sm font-medium font-montserrat leading-6">
            Tailored solutions designed to meet the operational demands of your
            sector — ensuring precision, reliability, and long-term performance.
          </p>
        </div>

        {/* ── MOBILE: accordion ── */}
        <div className="flex flex-col lg:hidden">
          {industries.map((industry, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={industry.id} className="border-b border-stone-300">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 py-4 text-left font-montserrat font-medium text-base leading-8 transition-colors duration-150",
                    isOpen ? "text-primary" : "text-stone-900"
                  )}
                >
                  {industry.label}
                  <Plus
                    size={18}
                    className={cn(
                      "shrink-0 transition-transform duration-200",
                      isOpen ? "rotate-45 text-primary" : "text-stone-500"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4">
                        <ImageView
                          fill
                          src={industry.image}
                          alt={industry.title}
                          containerClassName="w-full h-full"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black pointer-events-none" />

                        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-4 z-10">
                          <div>
                            <h3 className="text-zinc-100 font-montserrat font-medium text-xl uppercase leading-8 mb-2">
                              {industry.title}
                            </h3>
                            <p className="text-zinc-100 text-sm font-medium font-montserrat leading-6">
                              {industry.description}
                            </p>
                          </div>

                          <Link
                            href={industry.href}
                            className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-[45px] bg-white text-orange-600 font-montserrat font-medium text-base leading-7 hover:bg-primary hover:text-white transition-colors duration-150"
                          >
                            Explore
                            <RotexArrow size={8} color="currentColor" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP: tabs + image ── */}
        <div className="hidden lg:flex gap-5 items-start">

          {/* ── LEFT: heading + tabs ── */}
          <div className="w-96 shrink-0 flex flex-col justify-between self-stretch">
            <div className="flex flex-col gap-2">
              <h2 className="text-gradient-orange-dark font-montserrat font-normal leading-10 text-4xl">
                Built Around Your Industry
              </h2>
              <p className="text-zinc-500 text-sm font-medium font-montserrat leading-6">
                Tailored solutions designed to meet the operational demands of your
                sector — ensuring precision, reliability, and long-term performance.
              </p>
            </div>

            {/* Tab list */}
            <div className="flex flex-col gap-5">
              {industries.map((industry, i) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "shrink-0 text-left py-0.5 px-4 border-l-2 font-montserrat font-medium text-xl leading-8 transition-all duration-150 whitespace-normal",
                    i === activeIndex
                      ? "border-primary text-primary"
                      : "border-stone-300 text-stone-900 hover:text-primary hover:border-primary"
                  )}
                >
                  {industry.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: image card — 847×565 aspect ── */}
          <div className="w-full flex-1 relative rounded-[30px] overflow-hidden aspect-[847/565]">

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

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black pointer-events-none" />

            {/* Card content — bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-10 flex items-end justify-between gap-6 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-text"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <h3 className="text-zinc-100 font-montserrat font-medium text-2xl lg:text-3xl uppercase leading-10 mb-2">
                    {active.title}
                  </h3>
                  <p className="text-zinc-100 text-sm lg:text-base font-medium font-montserrat leading-6 max-w-sm">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <Link
                href={active.href}
                className="shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-orange-600 font-montserrat font-medium text-sm lg:text-base leading-7 whitespace-nowrap hover:bg-stone-50 transition-colors duration-150"
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
