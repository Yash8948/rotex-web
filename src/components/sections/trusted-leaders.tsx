import type { StaticImageData } from "next/image";
import logo from "@/assets/logo.svg";
import { ImageView } from "@/components/ui/image-view";

type LogoItem = { id: number; src: string | StaticImageData; alt: string };

type TrustedLeadersProps = {
  title?: string;
  primary?: boolean;
  logos?: LogoItem[];
};

const defaultLogos: LogoItem[] = [
  { id: 0, src: logo, alt: "Partner" },
  { id: 1, src: logo, alt: "Partner" },
  { id: 2, src: logo, alt: "Partner" },
  { id: 3, src: logo, alt: "Partner" },
  { id: 4, src: logo, alt: "Partner" },
  { id: 5, src: logo, alt: "Partner" },
  { id: 6, src: logo, alt: "Partner" },
];

export function TrustedLeaders({
  title = "Trusted by Industry Leaders",
  primary = false,
  logos = defaultLogos,
}: TrustedLeadersProps) {
  return (
    <section className="bg-white border-t border-b border-stone-100">
      <div className="container py-10 flex items-center gap-8">

        {/* Label */}
        {primary ? (
          <p className="text-gradient-orange-dark text-xl font-montserrat font-semibold whitespace-nowrap shrink-0">
            {title}
          </p>
        ) : (
          <p className="text-gray-700 text-xl font-montserrat font-medium whitespace-nowrap shrink-0">
            {title}
          </p>
        )}

        {/* Divider */}
        <div className="w-px h-5 bg-stone-200 shrink-0" />

        {/* Marquee */}
        <div className="relative flex-1 overflow-hidden">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #ffffff 20%, transparent 100%)" }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #ffffff 20%, transparent 100%)" }}
          />

          {/* Duplicate logos for seamless loop */}
          <div className="animate-marquee flex w-max items-center">
            {[...logos, ...logos].map(({ id, src, alt }, i) => (
              <div key={`${id}-${i}`} className="shrink-0 px-10">
                <ImageView
                  src={src}
                  alt={alt}
                  width={80}
                  height={28}
                  className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
