import Image from "next/image";
import Link from "next/link";
import growthImage from "@/assets/Images/aboutus/growth.png";

type GrowWithRotexSectionProps = {
  title?: string;
  description?: string;
};

export function GrowWithRotexSection({
  title = "Grow With Rotex",
  description = "Join our global distribution network and deliver precision-engineered flow control solutions trusted across critical industries.",
}: GrowWithRotexSectionProps) {
  return (
    <section className="bg-white py-6 lg:py-10">
      <div className="container">
        <div className="relative grid grid-cols-1 md:grid-cols-2 rounded-2xl lg:rounded-3xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-stone-100">
          <div className="relative z-10 flex flex-col justify-between gap-10 px-6 py-10 lg:px-12 lg:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 bottom-0 h-64 w-64 -rotate-12 rounded-[3rem] bg-red-50"
            />
            <div className="relative">
              <h2 className="text-stone-900 font-montserrat font-medium text-2xl lg:text-3xl leading-8 lg:leading-10">
                {title}
              </h2>
              <p className="mt-3 text-stone-500 font-montserrat font-medium text-sm lg:text-base leading-6 max-w-xs">
                {description}
              </p>
            </div>
            <Link
              href="/join-us"
              className="relative inline-flex w-fit justify-center items-center gap-3.5 px-6 py-3.5 rounded-full bg-red-600 text-white font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-red-700 transition-colors duration-200"
            >
              Become a Partner
            </Link>
          </div>

          <div className="relative min-h-64 md:min-h-0">
            <Image src={growthImage} alt="Rotex production floor" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
