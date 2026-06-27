"use client";
import type { SubIndustry } from "@/data/industries";

type Props = {
  subIndustries: SubIndustry[];
  activeSlug: string;
  onTabChange: (slug: string) => void;
};

export function IndustryTabs({ subIndustries, activeSlug, onTabChange }: Props) {
  return (
    <div className="sticky top-16 lg:top-24 z-20 bg-white shadow-[0px_2px_4px_0px_rgba(31,31,31,0.05)]">
      <div className="container">
        <div className="flex items-end gap-0.5 lg:gap-1 overflow-x-auto no-scrollbar border-b border-stone-200">
          {subIndustries.map((sub) => {
            const isActive = sub.slug === activeSlug;
            return (
              <button
                key={sub.slug}
                onClick={() => onTabChange(sub.slug)}
                className={`shrink-0 px-2 py-4 lg:px-2.5 lg:py-6 border-b-2 -mb-px text-sm lg:text-lg font-semibold font-montserrat leading-5 whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-stone-900 hover:text-red-600"
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
