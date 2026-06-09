import Image from "next/image";
import Link from "next/link";
import ctaBg from "@/assets/cta_bg.jpg";

export function CtaSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">

        <div className="relative rounded-2xl overflow-hidden">
          {/* Background image */}
          <Image
            src={ctaBg}
            alt="CTA background"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-8">
            <h2 className="text-white font-montserrat font-semibold text-3xl lg:text-[36px] leading-tight mb-3">
              Let&apos;s Solve Your Next Challenge
            </h2>
            <p className="text-white/80 font-montserrat text-[15px] leading-6 mb-8 max-w-sm">
              Connect with our experts to find the right solution for your application.
            </p>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center gap-3.5 px-6 py-3.5 rounded-full bg-white text-red-600 font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-stone-100 transition-colors duration-200"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
