"use client";
import { useRef } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/product-card";
import { RotexArrow } from "@/components/ui/rotex-arrow";

const products = [
  {
    id: "solenoid-valve",
    name: "Solenoid Valve",
    description: "The Component Inside Valves That Cannot Fail",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    href: "/products/solenoid-valve",
  },
  {
    id: "angle-seat-valve",
    name: "Angle Seat Valve",
    description: "Durable flow control for demanding needs",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=300&q=80",
    href: "/products/angle-seat-valve",
  },
  {
    id: "actuators",
    name: "Actuators",
    description: "Powerful mechanical devices for valve movement",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&q=80",
    href: "/products/actuators",
  },
  {
    id: "positioners",
    name: "Positioners",
    description: "Precise, digital control for valve positioning",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
    href: "/products/positioners",
  },
  {
    id: "controllers",
    name: "Controllers",
    description: "Smart process control for industrial systems",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&q=80",
    href: "/products/controllers",
  },
  {
    id: "sensors",
    name: "Sensors",
    description: "Accurate measurement for critical processes",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80",
    href: "/products/sensors",
  },
  {
    id: "automation",
    name: "Automation Systems",
    description: "End-to-end automation for flow operations",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=300&q=80",
    href: "/products/automation",
  },
];

const SCROLL_AMOUNT = 308; // card width (288) + gap (20)

export function ProductsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: dir === "right" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-16 lg:py-20 overflow-hidden">

      {/* Header — stays inside container */}
      <div className="container">
        <div className="flex items-center justify-between mb-9">
          <h2 className="text-gradient-orange-dark font-montserrat font-normal text-3xl lg:text-4xl leading-10">
            Engineered Flow Control Systems
          </h2>

          {/* Arrow nav */}
          <div className="flex items-center gap-7 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="size-11 rounded-full bg-orange-600/10 border border-stone-200 flex items-center justify-center hover:border-orange-600 transition-colors duration-150"
            >
              <RotexArrow size={7} className="rotate-180 text-red-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className="size-11 rounded-full bg-orange-600/10 border border-stone-200 flex items-center justify-center hover:border-orange-600 transition-colors duration-150"
            >
              <RotexArrow size={7} className="text-red-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Card track — starts at container left edge, bleeds to right viewport edge */}
      <div
        ref={trackRef}
        className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth py-3"
        style={{
          paddingLeft: "max(1.25rem, calc((100vw - 1280px) / 2))",
          scrollbarWidth: "none",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {/* Trailing spacer so last card doesn't sit flush against viewport */}
        <div className="shrink-0 w-4" />
      </div>

      {/* CTA — back inside container */}
      <div className="container flex justify-center mt-10">
        <Link
          href="/products"
          className="px-6 py-3.5 rounded-full bg-stone-900 text-white font-montserrat font-semibold text-sm uppercase leading-5 hover:bg-stone-800 transition-colors duration-150"
        >
          View All Products
        </Link>
      </div>

    </section>
  );
}
