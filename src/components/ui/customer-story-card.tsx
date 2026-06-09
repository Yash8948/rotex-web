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
        "shrink-0 w-144.5 rounded-[10px] bg-white outline-1 -outline-offset-1 outline-neutral-200 p-5 flex flex-col gap-5",
        className
      )}
    >
      {/* Image */}
      <div className="rounded-lg overflow-hidden h-80 shrink-0">
        <ImageView
          fill
          src={image}
          alt={author}
          containerClassName="w-full h-full"
          className="object-cover"
        />
      </div>

      {/* Quote + author */}
      <div className="flex flex-col gap-3">
        <p className="text-stone-900 font-montserrat font-medium text-base leading-6">
          {quote}
        </p>

        <div className="flex flex-col gap-3">
          <div className="self-stretch border-t border-neutral-200" />
          <div className="flex flex-col gap-1">
            <p className="text-neutral-400 font-montserrat font-medium text-sm leading-5">{author}</p>
            <p className="text-neutral-400 font-montserrat font-medium text-sm leading-5">{company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
