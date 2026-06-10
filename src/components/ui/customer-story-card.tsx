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
        "shrink-0 w-full lg:w-144.5 flex flex-col lg:rounded-[10px] lg:bg-white lg:outline-1 lg:-outline-offset-1 lg:outline-neutral-200 lg:p-5 lg:gap-5",
        className
      )}
    >
      {/* Image */}
      <div className="h-48 lg:h-80 lg:rounded-lg rounded-tl-2xl rounded-tr-2xl border border-neutral-200 lg:border-0 overflow-hidden shrink-0">
        <ImageView
          fill
          src={image}
          alt={author}
          containerClassName="w-full h-full"
          className="object-cover"
        />
      </div>

      {/* Quote + author */}
      <div className="flex flex-col gap-10 lg:gap-3 p-3.5 lg:p-0 bg-white lg:bg-transparent rounded-bl-[10px] rounded-br-2xl lg:rounded-none outline outline-1 -outline-offset-1 lg:outline-0 outline-neutral-200">
        <p className="text-stone-500 lg:text-stone-900 font-montserrat font-medium text-base leading-5 lg:leading-6">
          {quote}
        </p>

        <div className="flex flex-col gap-3.5 lg:gap-3">
          <div className="self-stretch border-t border-neutral-200" />
          <div className="flex flex-col gap-1">
            <p className="text-neutral-400 font-montserrat font-semibold lg:font-medium text-sm leading-6 lg:leading-5">{author}</p>
            <p className="text-neutral-400 font-montserrat font-semibold lg:font-medium text-sm leading-6 lg:leading-5">{company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
