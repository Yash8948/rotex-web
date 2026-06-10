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
    <section className={primary ? "bg-white border-t border-b border-stone-100 py-10 lg:py-0 lg:h-64" : "bg-white border-t border-b border-stone-100 py-8 lg:py-0 lg:h-36"}>
      <div className="container h-full flex flex-col items-center gap-5 lg:flex-row lg:gap-8">

        {/* Label */}
        {primary ? (
          <p className="text-gradient-orange-dark self-stretch text-center lg:text-left text-base lg:text-2xl font-montserrat font-normal leading-6 lg:leading-8 lg:whitespace-nowrap shrink-0">
            {title}
          </p>
        ) : (
          <p className="text-stone-500 self-stretch text-center lg:text-left text-base lg:text-xl font-montserrat font-medium leading-6 lg:leading-7 lg:whitespace-nowrap shrink-0">
            {title}
          </p>
        )}

        {/* Divider — desktop only */}
        <div className="hidden lg:block w-px h-5 bg-stone-200 shrink-0" />

        {/* Marquee */}
        {primary ? (
          <div className="relative self-stretch lg:self-auto lg:flex-1 lg:min-w-0 overflow-hidden h-14 lg:h-24">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #ffffff 20%, transparent 100%)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #ffffff 20%, transparent 100%)" }} />
            <div className="animate-marquee flex items-center gap-14 w-max h-14 lg:h-24">
              {[...logos, ...logos].map(({ id, src, alt }, i) => (
                <div key={`${id}-${i}`} className="shrink-0 h-14 lg:h-24 flex items-center">
                  <ImageView
                    src={src}
                    alt={alt}
                    width={96}
                    height={64}
                    className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative self-stretch lg:self-auto lg:flex-1 lg:min-w-0 overflow-hidden h-14 lg:h-16">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #ffffff 20%, transparent 100%)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #ffffff 20%, transparent 100%)" }} />
            <div className="animate-marquee flex items-center gap-12 w-max h-14 lg:h-16">
              {[...logos, ...logos].map(({ id, src, alt }, i) => (
                <div key={`${id}-${i}`} className="shrink-0 h-14 lg:h-16 flex items-center">
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
        )}

      </div>
    </section>
  );
}
