"use client";
import Link from "next/link";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { VideoPlayer } from "@/components/ui/video-player";

const ARROW_GRADIENT = "linear-gradient(135deg, #ff9a00 0%, #f03900 50%, #950000 100%)";

/* Exact path from Figma — hexagon with cubic-bezier rounded corners */
const HEX_PATH =
  "M129.891 476.761L5.18832 267.08C-1.72947 255.169 -1.72947 240.52 5.18832 228.926L129.891 18.9152C137.111 7.31554 149.978 0 163.813 0L413.199 0C427.645 0 440.21 7.32162 447.109 18.9152L571.812 228.926C578.73 240.519 578.73 255.175 571.812 267.08L447.109 476.761C440.204 488.666 427.645 496 413.199 496L163.813 496C149.984 496 137.117 488.666 129.891 476.761Z";

export function HeroSection() {
  return (
    <section className="relative bg-[#0D0D0D] overflow-hidden min-h-screen">

      {/* Orange radial glow — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-225 h-225 rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #f03900 0%, transparent 65%)",
          opacity: 0.15,
          transform: "translate(30%, 30%)",
        }}
      />

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

            {/* Left arrow — outlined */}
            <button
              className="size-11 rounded-full border border-white/25 flex items-center justify-center text-white/50 hover:border-white/50 hover:text-white transition-colors duration-150"
              aria-label="Previous"
            >
              <IoChevronBackOutline size={18} />
            </button>

            {/* Right arrow — orange fill */}
            <button
              className="size-11 rounded-full flex items-center justify-center text-white transition-opacity duration-150 hover:opacity-80"
              style={{ background: ARROW_GRADIENT }}
              aria-label="Next"
            >
              <IoChevronForwardOutline size={18} />
            </button>
          </div>
        </div>

        {/* ── RIGHT: hexagon vertically centered ── */}
        <div className="shrink-0 flex items-center" style={{ width: 577 }}>
          <HexSlider />
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
      className="px-5 py-2.5 rounded-full border border-white/25 text-white text-[11px] font-semibold font-montserrat tracking-widest uppercase whitespace-nowrap hover:bg-white/8 transition-colors duration-150"
    >
      {children}
    </Link>
  );
}

/* Hexagon slider — SVG shape with gradient border, VideoPlayer handles skeleton + fade */
function HexSlider() {
  return (
    <svg
      viewBox="0 0 577 496"
      width="577"
      height="496"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="hex-border-grad"
          cx="0" cy="0" r="1"
          gradientTransform="matrix(1069.09 -200.586 -178.765 -898.273 -158.848 244.598)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9A00" />
          <stop offset="0.28" stopColor="#F03900" />
          <stop offset="0.61" stopColor="#950000" />
          <stop offset="0.87" stopColor="#000000" />
        </radialGradient>

        <clipPath id="hex-inner-clip">
          <path
            d={HEX_PATH}
            transform="translate(288.5,248) scale(0.9653,0.9597) translate(-288.5,-248)"
          />
        </clipPath>
      </defs>

      {/* Gradient border */}
      <path fillRule="evenodd" clipRule="evenodd" d={HEX_PATH} fill="url(#hex-border-grad)" />

      {/* VideoPlayer clipped to hex shape — shimmer + fade handled internally */}
      <foreignObject x="0" y="0" width="577" height="496" clipPath="url(#hex-inner-clip)">
        <VideoPlayer
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          variant="dark"
          containerClassName="w-full h-full"
        />
      </foreignObject>
    </svg>
  );
}
