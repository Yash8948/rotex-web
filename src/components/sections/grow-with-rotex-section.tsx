import Link from "next/link";

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
        <div className="bg-gradient-orange-radial rounded-2xl lg:rounded-3xl px-6 py-14 lg:py-20 flex flex-col items-center text-center gap-6">
          <h2 className="text-white font-montserrat font-normal text-2xl lg:text-4xl leading-8 lg:leading-10">
            {title}
          </h2>
          <p className="text-white/85 font-montserrat font-medium text-sm lg:text-base leading-6 max-w-xl">
            {description}
          </p>
          <Link
            href="/join-us"
            className="inline-flex justify-center items-center gap-3.5 px-6 py-3.5 rounded-full bg-white text-red-600 font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-stone-100 transition-colors duration-200"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  );
}
