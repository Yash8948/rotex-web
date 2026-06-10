"use client";
import { cn } from "@/lib/utils";

export type Tab = { id: string; label: string };

type TabsNavProps = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
};

export function TabsNav({ tabs, active, onChange, className }: TabsNavProps) {
  return (
    <div className={cn("border-b border-stone-300", className)}>
      <div className="flex items-center justify-between lg:justify-start gap-0 lg:gap-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-2.5 py-3 lg:py-5 text-base lg:text-sm font-montserrat font-semibold lg:font-medium leading-6 lg:leading-5 border-b-2 -mb-px transition-colors duration-150 whitespace-nowrap",
              tab.id === active
                ? "border-red-600 text-red-600"
                : "border-transparent text-neutral-400 lg:text-stone-900 hover:text-red-600"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
