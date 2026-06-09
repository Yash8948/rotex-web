
"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { VideoPlayer } from "@/components/ui/video-player";
import { RotexArrow } from "@/components/ui/rotex-arrow";

function ArrowBtn({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="size-10 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 transition-colors duration-200"
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      <RotexArrow
        size={9}
        color="#EF3E23"
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

/* Figma: 577×496 exact */
const HEX_W = 577;
const HEX_H = 496;

/* Regular hexagon with 20px rounded corners, in objectBoundingBox (0–1).
   Vertices: TL(0.25,0) TR(0.75,0) R(1,0.5) BR(0.75,1) BL(0.25,1) L(0,0.5)
   Each Q bezier cuts 20px off the corner using computed tangent offsets. */
const HEX_PATH_BB =
  "M0.2847,0 L0.7153,0 Q0.75,0 0.7674,0.0349 L0.9826,0.4653 Q1.0,0.5 0.9826,0.5347 L0.7674,0.9651 Q0.75,1.0 0.7153,1.0 L0.2847,1.0 Q0.25,1.0 0.2326,0.9651 L0.0174,0.5347 Q0.0,0.5 0.0174,0.4653 L0.2326,0.0349 Q0.25,0 0.2847,0 Z";

/* Left-edge stroke — three Q beziers matching every rounded corner of HEX_PATH_BB:
   TL corner Q(144.25,0), L vertex Q(0,248), BL corner Q(144.25,496) */
const HEX_LEFT_EDGE =
  "M164.27,0 Q144.25,0 134.21,17.31 L10.04,230.79 Q0,248 10.04,265.21 L134.21,478.69 Q144.25,496 164.27,496";

export function HeroSection() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex(i => (i + 1) % SLIDES.length);

  return (
    <section className="relative w-full flex justify-center overflow-hidden bg-stone-900">
      {/* 1440×740 canvas — centers on wide viewports, fills narrow ones */}
      <div className="relative w-full max-w-[1440px] lg:h-[740px]">

        {/* Hex slider — desktop only; Figma: left 784px (54.44%), top 160px */}
        <div
          className="absolute z-20 hidden lg:block"
          style={{ left: "54.44%", top: "160px" }}
        >
          <HexSlider index={index} />
        </div>

        {/* Hex — mobile decorative (clipped by section overflow-hidden) */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-10 lg:hidden pointer-events-none opacity-20">
          <HexSlider index={index} />
        </div>

        {/* Content block — Figma: left 80px, top 404.5px, w 669px, gap-9
            Mobile: relative flow with padding; Desktop: absolute positioned */}
        <div className="relative lg:absolute z-30 flex flex-col gap-9 px-6 pt-36 pb-14 lg:px-0 lg:pt-0 lg:pb-0 lg:left-[80px] lg:top-[404px] lg:w-[669px]">

          <div className="flex flex-col gap-5">
            {/* Figma: text-5xl (48px), weight 400, leading-[58px], letter-spacing -1.3px */}
            <h1
              className="max-w-[597px] text-white font-normal leading-[58px]"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(30px, 3.33vw, 48px)",
                letterSpacing: "-1.3px",
              }}
            >
              Flow Control.
              <br />
              Where It Matters Most.
            </h1>

            {/* Figma: text-base (16px), weight 500, leading-6, color zinc-100 */}
            <p
              className="max-w-[547px] text-zinc-100 text-base font-medium leading-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Engineered precise solutions that reduce downtime, enhance safety,
              and ensure uninterrupted operations across critical industry
              applications.
            </p>
          </div>

          {/* Figma: buttons gap-5, outline outline-1 outline-offset-[-1px] outline-stone-500 */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-5">
            <HeroOutlineBtn href="/solutions">EXPLORE SOLUTIONS</HeroOutlineBtn>
            <HeroOutlineBtn href="/downloads">
              DOWNLOAD &apos;ZERO DOWNTIME BLUE PRINT&apos;
            </HeroOutlineBtn>

            <nav aria-label="Banner navigation" className="inline-flex items-center gap-4">
              <ArrowBtn dir="prev" onClick={prev} />
              <ArrowBtn dir="next" onClick={next} />
            </nav>
          </div>

        </div>
      </div>
    </section>
  );
}

/* Figma: rounded-[100px], outline-1, outline-offset-[-1px], outline-stone-500,
   px-5 py-2.5, text-xs (12px), font-semibold, uppercase, leading-5 */
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
      className="inline-flex items-center whitespace-nowrap rounded-[100px] outline outline-1 outline-offset-[-1px] outline-stone-500 px-5 py-2.5 text-white hover:bg-white/5 transition-colors duration-150"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        lineHeight: "20px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Link>
  );
}

/* Hexagon clip + video slider */
function HexSlider({ index }: { index: number }) {
  return (
    <div style={{ width: HEX_W, height: HEX_H, position: "relative", flexShrink: 0 }}>

      {/* Declares clip path in normalised 0–1 coords — scales with container */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <clipPath id="hex-clip-bb" clipPathUnits="objectBoundingBox">
            <path d={HEX_PATH_BB} />
          </clipPath>
        </defs>
      </svg>

      {/* Video clipped to hex shape */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: "url(#hex-clip-bb)",
          background: "#0D0D0D",
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

      {/* Gradient left-edge stroke */}
      <svg
        viewBox="0 0 577 496"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <defs>
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
