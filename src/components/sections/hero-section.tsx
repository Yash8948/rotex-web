
"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { VideoPlayer } from "@/components/ui/video-player";
import { RotexArrow } from "@/components/ui/rotex-arrow";

/* White bg + orange arrow → on hover: primary bg + white arrow */
function ArrowBtn({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="size-11 rounded-full flex items-center justify-center transition-colors duration-200"
      style={{ background: hovered ? "#EF3E23" : "#ffffff" }}
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      <RotexArrow
        size={9}
        color={hovered ? "#ffffff" : "#EF3E23"}
        className={dir === "prev" ? "rotate-180" : undefined}
      />
    </button>
  );
}

const SLIDES = [
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { src: "https://www.w3schools.com/html/movie.mp4" },
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

/* ── Change HEX_W to resize the hex — height auto-computed from 577:496 ratio ── */
const HEX_W = 520;
const HEX_H = Math.round(HEX_W * (496 / 577));

/* Hex path normalised to 0–1 for clipPathUnits="objectBoundingBox"
   (all x ÷ 577, all y ÷ 496) — scales automatically with any container size */
const HEX_PATH_BB =
  "M0.22511,0.96120 L0.00899,0.53847 C-0.00300,0.51446 -0.00300,0.48490 0.00899,0.46157 L0.22511,0.03813 C0.23761,0.01475 0.25993,0 0.28390,0 L0.71612,0 C0.74115,0 0.76291,0.01476 0.77489,0.03813 L0.99101,0.46157 C1.00300,0.48491 1.00300,0.51448 0.99101,0.53847 L0.77489,0.96120 C0.76292,0.98522 0.74115,1 0.71612,1 L0.28390,1 C0.25993,1 0.23762,0.98522 0.22511,0.96120 Z";

/* Open path — traces only the LEFT edge of the hex from top-left corner →
   left vertex → bottom-left corner. Used for the orange stroke so it doesn't
   bleed onto the flat top / bottom edges. */
const HEX_LEFT_EDGE =
  "M163.813,0 C149.978,0 137.111,7.31554 129.891,18.9152 L5.18832,228.926 C-1.72947,240.52 -1.72947,255.169 5.18832,267.08 L129.891,476.761 C137.117,488.666 149.984,496 163.813,496";

export function HeroSection() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex(i => (i + 1) % SLIDES.length);

  return (
    <section className="relative bg-[#0D0D0D] min-h-screen">

      {/* Glow container — overflow-hidden here contains the 900px glow without clipping the hex */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-225 h-225 rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(circle, #f03900 0%, transparent 65%)",
            opacity: 0.15,
            transform: "translate(30%, 30%)",
          }}
        />
      </div>

      <div className="container relative z-10 h-screen pt-24 flex gap-16">

        {/* ── LEFT: content pushed to bottom ── */}
        <div className="flex-1 flex flex-col justify-end pb-16 gap-6">

          {/* Heading */}
          <h1
            className="font-bold text-white font-montserrat"
            style={{ fontSize: 48, lineHeight: 1.1 }}
          >
            Flow Control.<br />
            Where It Matters Most.
          </h1>

          {/* Subtext */}
          <p className="text-white/60 text-[15px] font-montserrat leading-6 max-w-120">
            Engineered precise solutions that reduce downtime, enhance safety,
            and ensure uninterrupted operations across critical industry
            applications.
          </p>

          {/* Buttons + arrows — single row */}
          <div className="flex items-center gap-3">
            <HeroOutlineBtn href="/solutions">Explore Solutions</HeroOutlineBtn>
            <HeroOutlineBtn href="/downloads">
              Download &apos;Zero Downtime Blue Print&apos;
            </HeroOutlineBtn>

            <ArrowBtn dir="prev" onClick={prev} />
            <ArrowBtn dir="next" onClick={next} />
          </div>
        </div>

        {/* ── RIGHT: hexagon — fixed 577×496, vertically centered ── */}
        <div className="shrink-0 flex items-center overflow-visible">
          <HexSlider index={index} />
        </div>

      </div>
    </section>
  );
}

function HeroOutlineBtn({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-5 py-2.5 rounded-full border border-white/40 text-white text-[11px] font-semibold font-montserrat tracking-widest uppercase whitespace-nowrap hover:bg-white/8 transition-colors duration-150"
    >
      {children}
    </Link>
  );
}

/* Hexagon — objectBoundingBox clip scales with any HEX_W, viewBox SVG for stroke */
function HexSlider({ index }: { index: number }) {
  return (
    <div style={{ width: HEX_W, height: HEX_H, position: "relative", flexShrink: 0 }}>

      {/* Hidden SVG — declares the clip path in normalised 0–1 coords so it
         0 scales automatically to whatever size the container is */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <clipPath id="hex-clip-bb" clipPathUnits="objectBoundingBox">
            <path d={HEX_PATH_BB} />
          </clipPath>
        </defs>
      </svg>

      {/* Video — clipped by the objectBoundingBox clipPath, always fits the container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: "url(#hex-clip-bb)",
          background: "#0D0D0D",
          // overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <VideoPlayer
              src={SLIDES[index].src}
              variant="dark"
              containerClassName="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SVG overlay — gradient left-edge stroke */}
      <svg
        viewBox="0 0 577 496"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <defs>
          {/* Top → bottom: bright orange → deep orange-red → dark red */}
          <linearGradient id="hex-stroke-grad" x1="0" y1="0" x2="0" y2="496" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#FF9A00" />
            <stop offset="45%"  stopColor="#F03900" />
            <stop offset="100%" stopColor="#950000" />
          </linearGradient>
        </defs>
        <path
          d={HEX_LEFT_EDGE}
          fill="none"
          stroke="url(#hex-stroke-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

    </div>
  );
}
