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
    <div className={cn("border-b border-stone-200", className)}>
      <div className="flex items-end gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "pb-3 text-sm font-montserrat font-medium border-b-2 -mb-px transition-colors duration-150 whitespace-nowrap",
              tab.id === active
                ? "border-brand-500 text-brand-500"
                : "border-transparent text-stone-500 hover:text-stone-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
