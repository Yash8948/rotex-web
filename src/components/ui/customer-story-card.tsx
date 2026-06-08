import { ImageView } from "@/components/ui/image-view";
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";

type CustomerStoryCardProps = {
  image: string | StaticImageData;
  quote: string;
  author: string;
  company: string;
  className?: string;
};

export function CustomerStoryCard({ image, quote, author, company, className }: CustomerStoryCardProps) {
  return (
    <div
      className={cn(
        "shrink-0 w-[560px] rounded-2xl bg-white border border-stone-200 p-5 flex flex-col",
        className
      )}
    >
      {/* Image — 8px radius */}
      <div className="rounded-lg overflow-hidden h-72 shrink-0">
        <ImageView
          fill
          src={image}
          alt={author}
          containerClassName="w-full h-full"
          className="object-cover"
        />
      </div>

      {/* Quote — 20px gap from image */}
      <p className="mt-5 text-stone-900 font-montserrat text-[15px] font-semibold leading-6">
        {quote}
      </p>

      {/* Divider — 12px gap from quote */}
      <div className="mt-3 border-t border-stone-100" />

      {/* Author — 12px gap from divider */}
      <div className="mt-3">
        <p className="text-stone-400 font-montserrat text-[13px] font-medium">{author}</p>
        <p className="text-stone-400 font-montserrat text-xs mt-0.5">{company}</p>
      </div>
    </div>
  );
}
