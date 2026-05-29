"use client";
import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "@/components/ui/video-player";

const stats = [
  { raw: 33,   suffix: "",   label: "Utility Patents" },
  { raw: 83,   suffix: "+",  label: "Countries Served Worldwide" },
  { raw: 21,   suffix: "+",  label: "International Certifications" },
  { raw: 80,   suffix: "+",  label: "Global Distributors" },
  { raw: 9000, suffix: "+",  label: "Customers" },
  { raw: 6000, suffix: "+",  label: "Customised Solutions Developed", comma: true },
];

function Counter({ raw, suffix, comma }: { raw: number; suffix: string; comma?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
            setCount(Math.round(eased * raw));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [raw]);

  const display = comma ? count.toLocaleString() : String(count);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export function RedefiningSection() {
  return (
    <section className="bg-white py-20 container px-[100px]">

      {/* Heading */}
      <h2 className="text-gradient-orange-dark text-center font-montserrat font-semibold leading-tight mb-4"
          style={{ fontSize: 38 }}>
        Redefining Flow Performance
      </h2>

      {/* Subtext */}
      <p className="text-center text-stone-400 text-[15px] font-montserrat leading-6 max-w-xl mx-auto mb-12">
        A new chapter shaped by precision engineering, advanced capabilities, and a commitment
        to solving the most demanding industrial challenges.
      </p>

      {/* Video player — 1080×608 */}
      <div className="rounded-2xl overflow-hidden mb-16 w-full"
           style={{ aspectRatio: "1080 / 608" }}>
        <VideoPlayer
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
        />
      </div>

      {/* Bottom: tagline + stats */}
      <div className="flex items-center gap-20">

        {/* Left tagline */}
        <h3 className="font-montserrat font-bold text-stone-900 leading-[1.15] shrink-0"
            style={{ fontSize: 36 }}>
          Leading Flow<br />
          <span className="text-brand-500">Intelligence</span> Since 1967
        </h3>

        {/* Divider */}
        <div className="w-px self-stretch bg-stone-100 shrink-0" />

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-x-12 gap-y-7 flex-1">
          {stats.map(({ raw, suffix, label, comma }) => (
            <div key={label}>
              <p className="text-brand-500 font-montserrat font-bold text-2xl leading-none mb-1">
                <Counter raw={raw} suffix={suffix} comma={comma} />
              </p>
              <p className="text-gray-700 font-montserrat text-xs leading-4">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
