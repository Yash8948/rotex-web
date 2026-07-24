"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, ShieldCheck, Award } from "lucide-react";

type Achievement = { icon: "trophy" | "shield" | "award"; text: string };

type AchievementsSectionProps = {
  heading?: string;
  achievements?: Achievement[];
  cta?: { label: string; href: string };
};

const ICONS = { trophy: Trophy, shield: ShieldCheck, award: Award };

const defaultAchievements: Achievement[] = [
  {
    icon: "trophy",
    text: 'Featured as one of the "100 Innovative Companies in the Rail Sector of India".',
  },
  {
    icon: "shield",
    text: "Quality and compliance recognition for the manufacturing unit.",
  },
  {
    icon: "award",
    text: '1st Runner-Up at the National-Level Indian Society for Quality (ISQ) Competition for the "Aarambh" Case Study.',
  },
];

export function AchievementsSection({
  heading = "What We Achieved So Far",
  achievements = defaultAchievements,
  cta = { label: "See More of Our Wins", href: "/awards" },
}: AchievementsSectionProps) {
  return (
    <section className="bg-neutral-100 py-14 lg:py-20">
      <div className="container">
        <h2 className="text-gradient-orange-dark font-montserrat font-normal text-2xl lg:text-4xl leading-8 lg:leading-10 mb-10 lg:mb-14 text-center">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((a, i) => {
            const Icon = ICONS[a.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 flex flex-col gap-5"
              >
                <div className="size-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon className="size-6 text-red-600" />
                </div>
                <p className="text-stone-900 font-montserrat font-medium text-sm lg:text-base leading-6">
                  {a.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10 lg:mt-14">
          <Link
            href={cta.href}
            className="inline-flex justify-center items-center gap-3.5 px-6 py-3.5 rounded-full bg-stone-900 text-white font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-stone-800 transition-colors duration-150"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
