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

const SCROLL_AMOUNT = 606; // card width (578) + gap (28)

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
        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-gradient-orange-dark font-montserrat font-normal text-3xl lg:text-4xl leading-10">
              Customer Stories
            </h2>
            <p className="text-stone-500 font-montserrat font-medium text-base leading-6">
              Trusted across industries, proven in action
            </p>
          </div>

          {/* Arrow nav */}
          <div className="flex items-center gap-7 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="size-10 rounded-full bg-orange-600/10 outline-1 -outline-offset-1 outline-stone-200 flex items-center justify-center hover:outline-orange-600 transition-colors duration-150"
            >
              <RotexArrow size={7} className="rotate-180 text-red-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className="size-10 rounded-full bg-orange-600/10 outline-1 -outline-offset-1 outline-stone-200 flex items-center justify-center hover:outline-orange-600 transition-colors duration-150"
            >
              <RotexArrow size={7} className="text-red-600" />
            </button>
          </div>
        </div>

        {/* Card track */}
        <div
          ref={trackRef}
          className="no-scrollbar flex gap-7 overflow-x-auto scroll-smooth"
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
