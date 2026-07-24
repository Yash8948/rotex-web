import Link from "next/link";

type ZeroDowntimeCtaSectionProps = {
  title?: string;
  description?: string;
};

export function ZeroDowntimeCtaSection({
  title = "Ready to engineer Zero Downtime into your plant?",
  description = "The N2W Zero Downtime Consultation applies 58 years of field-validated engineering to your specific plant - and identifies the failure modes most likely to cause your next shutdown. 45 minutes. No sales content. Written analysis in 48 hours.",
}: ZeroDowntimeCtaSectionProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-red-600 via-red-900 to-neutral-950 py-12 px-6 lg:py-14 lg:px-10">
          <h2 className="text-white font-montserrat font-semibold text-2xl lg:text-[32px] leading-tight mb-4 max-w-2xl">
            {title}
          </h2>
          <p className="text-white/80 font-montserrat text-sm lg:text-[15px] leading-6 mb-8 max-w-2xl">
            {description}
          </p>

          <div className="flex flex-wrap gap-4">
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
    </section>
  );
}
