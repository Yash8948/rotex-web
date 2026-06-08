"use client";
import { useRef } from "react";
import { CustomerStoryCard } from "@/components/ui/customer-story-card";
import { RotexArrow } from "@/components/ui/rotex-arrow";

const stories = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80",
    quote:
      "Rotex solutions have consistently improved our system reliability and reduced downtime significantly. Their engineering precision truly reflects in performance.",
    author: "Rajesh Mehta",
    company: "Plant Head, Aarti Industries Ltd.",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80",
    quote:
      "Rotex solutions have consistently improved our system reliability and reduced downtime significantly. Their engineering precision truly reflects in performance.",
    author: "Rajesh Mehta",
    company: "Plant Head, Aarti Industries Ltd.",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80",
    quote:
      "Rotex solutions have consistently improved our system reliability and reduced downtime significantly. Their engineering precision truly reflects in performance.",
    author: "Rajesh Mehta",
    company: "Plant Head, Aarti Industries Ltd.",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80",
    quote:
      "Rotex solutions have consistently improved our system reliability and reduced downtime significantly. Their engineering precision truly reflects in performance.",
    author: "Rajesh Mehta",
    company: "Plant Head, Aarti Industries Ltd.",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80",
    quote:
      "Rotex solutions have consistently improved our system reliability and reduced downtime significantly. Their engineering precision truly reflects in performance.",
    author: "Rajesh Mehta",
    company: "Plant Head, Aarti Industries Ltd.",
  },
];

const SCROLL_AMOUNT = 580; // card width (560) + gap (20)

export function CustomerStoriesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: dir === "right" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="font-montserrat font-bold leading-tight text-2xl lg:text-[32px] mb-2">
              <span className="text-gradient-orange-dark">Customer</span>{" "}
              <span className="text-stone-900">Stories</span>
            </h2>
            <p className="text-stone-400 font-montserrat text-sm">
              Trusted across industries, proven in action
            </p>
          </div>

          {/* Arrow nav */}
          <div className="flex items-center gap-3 shrink-0 mt-1">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center hover:border-brand-500 transition-colors duration-150"
            >
              <RotexArrow size={7} className="rotate-180" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center hover:border-brand-500 transition-colors duration-150"
            >
              <RotexArrow size={7} />
            </button>
          </div>
        </div>

        {/* Card track — inside container */}
        <div
          ref={trackRef}
          className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {stories.map((story) => (
            <CustomerStoryCard key={story.id} {...story} />
          ))}
        </div>

      </div>
    </section>
  );
}
