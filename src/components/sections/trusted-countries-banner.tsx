"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const TrustedWorldMap = dynamic(() => import("./trusted-world-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full rounded-full bg-neutral-100 animate-pulse" />,
});

type TrustedCountriesBannerProps = {
  title?: string;
  description?: string;
};

export function TrustedCountriesBanner({
  title = "Trusted across 81 countries.",
  description = "From North Sea offshore platforms to Qatar gas fields, German cleanrooms, and Indian cement plants, Rotex is specified where precision matters and failure is not allowed.",
}: TrustedCountriesBannerProps) {
  return (
    <section className="bg-white py-16 lg:py-20 overflow-hidden">
      <div className="container flex flex-col items-center text-center gap-3">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-stone-900 font-montserrat font-medium text-2xl lg:text-3xl leading-8 lg:leading-10 max-w-xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-stone-500 font-montserrat font-medium text-sm lg:text-base leading-6 max-w-xl"
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative mx-auto mt-10 lg:mt-14 w-full max-w-3xl aspect-square"
      >
        <TrustedWorldMap />
      </motion.div>
    </section>
  );
}
