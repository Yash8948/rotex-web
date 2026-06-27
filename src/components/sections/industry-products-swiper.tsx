"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import product1 from "@/assets/Images/products/product_1.png";
import product2 from "@/assets/Images/products/product_2.png";
import product3 from "@/assets/Images/products/product_3.png";
import product4 from "@/assets/Images/products/product_4.png";

const PRODUCT_IMAGE_MAP: Record<string, StaticImageData> = {
  "Solenoid Valve":       product1,
  "Angle Seat Valve":     product2,
  "Actuators":            product3,
  "Positioners":          product4,
  "Automotive Solutions": product1,
};

type Props = {
  products: string[];
};

export function IndustryProductsSwiper({ products }: Props) {
  return (
    <section className="bg-white py-8 lg:py-10 border-t border-stone-100">
      <div className="container flex flex-col gap-6 lg:gap-8">
        <div className="flex items-center justify-between">
          <h3 className="text-stone-900 text-xl lg:text-2xl font-medium font-montserrat leading-7 lg:leading-8">
            Products recommended for you
          </h3>
          <Link
            href="/products"
            className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-full ring-1 ring-stone-300 text-stone-900 text-xs font-semibold font-montserrat uppercase leading-5 hover:bg-stone-50 transition-colors duration-150"
          >
            View All
          </Link>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={16}
            slidesPerView="auto"
            navigation={{ prevEl: ".prod-prev", nextEl: ".prod-next" }}
            className="!pb-2"
          >
            {products.map((name) => {
              const img = PRODUCT_IMAGE_MAP[name];
              return (
                <SwiperSlide key={name} style={{ width: "200px" }} className="lg:!w-60">
                  <div className="w-full p-4 lg:p-5 rounded-2xl ring-1 ring-inset ring-neutral-200 shadow-[0px_4px_0px_0px_rgba(239,62,35,1)] flex flex-col justify-start items-center gap-4 lg:gap-5">
                    <div className="w-full h-28 lg:h-36 relative overflow-hidden">
                      {img ? (
                        <Image
                          src={img}
                          alt={name}
                          width={192}
                          height={192}
                          className="absolute left-1 -top-6 lg:-top-8 object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-100 rounded-lg" />
                      )}
                    </div>
                    <p className="self-stretch text-center text-stone-900 text-sm lg:text-base font-semibold font-montserrat leading-5 lg:leading-6">
                      {name}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button className="prod-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-5 z-10 size-8 lg:size-9 flex items-center justify-center rounded-full bg-white ring-1 ring-stone-200 shadow-sm hover:bg-stone-50 transition-colors disabled:opacity-40">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="prod-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-5 z-10 size-8 lg:size-9 flex items-center justify-center rounded-full bg-white ring-1 ring-stone-200 shadow-sm hover:bg-stone-50 transition-colors disabled:opacity-40">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
