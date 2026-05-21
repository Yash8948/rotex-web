"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

/*
  Gradient button — exact Figma spec:
  px-6 py-3
  bg-radial-[at_45%_-21%] from-amber-500 via-orange-600 28% to-black 87%
  rounded-[57px]
  inline-flex justify-center items-center gap-2.5
  text-white text-base font-medium font-['Montserrat']
*/

/* Exact gradient from style guide */
const GRADIENT =
  "radial-gradient(circle at 50% 0%, #ff9a00 0%, #f86a00 14%, #f03900 28%, #c31d00 44.5%, #ac0e00 52.75%, #950000 61%, #700000 67.5%, #4b0000 74%, #250000 80.5%, #130000 83.75%, #000000 87%)";

type GradientButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function GradientButton({
  children,
  href,
  onClick,
  className,
}: GradientButtonProps) {
  const baseClass = cn(
    "px-6 py-3 rounded-[57px] inline-flex justify-center items-center gap-2.5",
    "text-white text-base font-medium font-[var(--font-montserrat)] whitespace-nowrap",
    "transition-opacity duration-150 hover:opacity-90 cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClass} style={{ background: GRADIENT }}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass} style={{ background: GRADIENT }}>
      {children}
    </button>
  );
}
