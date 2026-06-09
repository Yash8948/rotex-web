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
    <section className="bg-white py-14 lg:py-20">
      <div className="container px-5 sm:px-10 lg:px-20">

        {/* Heading + Subtext */}
        <div className="flex flex-col items-center gap-5 mb-14">
          <h2 className="text-3xl lg:text-4xl font-normal font-montserrat leading-10 text-center">
            <span className="text-gradient-orange-dark">Redefining Flow Performance</span>
          </h2>
          <p className="text-center text-stone-500 text-sm lg:text-base font-medium font-montserrat leading-6 max-w-2xl">
            A new chapter shaped by precision engineering, advanced capabilities, and a commitment
            to solving the most demanding industrial challenges.
          </p>
        </div>

        {/* Video player — 1080×608 */}
        <div className="rounded-2xl lg:rounded-[30px] overflow-hidden mb-14 lg:mb-16 w-full"
             style={{ aspectRatio: "1080 / 608" }}>
          <VideoPlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
          />
        </div>

        {/* Bottom: tagline + stats */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-24">

          {/* Left tagline */}
          <h3 className="font-montserrat font-normal text-stone-900 text-3xl lg:text-4xl leading-10 lg:shrink-0">
            Leading Flow <br />
            <span className="text-gradient-orange-dark">Intelligence</span> Since 1967
          </h3>

          {/* Stats grid */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-6">
              {stats.slice(0, 3).map(({ raw, suffix, label, comma }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <p className="text-red-600 font-montserrat font-medium text-2xl lg:text-3xl leading-10">
                    <Counter raw={raw} suffix={suffix} comma={comma} />
                  </p>
                  <p className="text-stone-900 font-montserrat font-medium text-xs lg:text-sm leading-5">{label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
              {stats.slice(3).map(({ raw, suffix, label, comma }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <p className="text-red-600 font-montserrat font-medium text-2xl lg:text-3xl leading-10">
                    <Counter raw={raw} suffix={suffix} comma={comma} />
                  </p>
                  <p className="text-stone-900 font-montserrat font-medium text-xs lg:text-sm leading-5">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
