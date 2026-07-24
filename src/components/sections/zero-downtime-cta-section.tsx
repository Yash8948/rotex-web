import Image from "next/image";
import Link from "next/link";
import ctaBg from "@/assets/cta_bg.jpg";

type Feature = { label: string };

type ZeroDowntimeCtaSectionProps = {
  title?: string;
  description?: string;
  features?: Feature[];
};

const defaultFeatures: Feature[] = [
  { label: "45 Minutes" },
  { label: "No Sales Content" },
  { label: "Written Analysis in 48 Hours" },
];

export function ZeroDowntimeCtaSection({
  title = "Ready to engineer Zero Downtime into your plant?",
  description = "The N2W Zero Downtime Consultation applies 58 years of field-validated engineering to your specific plant — and identifies the failure modes most likely to cause your next shutdown.",
  features = defaultFeatures,
}: ZeroDowntimeCtaSectionProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden">
          <Image src={ctaBg} alt="" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex flex-col items-center text-center py-16 px-6 lg:px-10">
            <h2 className="text-white font-montserrat font-semibold text-2xl lg:text-[36px] leading-tight mb-4 max-w-2xl">
              {title}
            </h2>
            <p className="text-white/80 font-montserrat text-sm lg:text-[15px] leading-6 mb-8 max-w-xl">
              {description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {features.map((f) => (
                <span
                  key={f.label}
                  className="px-4 py-2 rounded-full ring-1 ring-inset ring-white/30 text-white text-xs font-semibold font-montserrat uppercase tracking-wide"
                >
                  {f.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center gap-3.5 px-6 py-3.5 rounded-full bg-white text-red-600 font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-stone-100 transition-colors duration-200"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/downloads"
                className="inline-flex justify-center items-center gap-3.5 px-6 py-3.5 rounded-full ring-1 ring-inset ring-white text-white font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-white/10 transition-colors duration-200"
              >
                Download N2W Framework
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
