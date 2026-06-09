import Link from "next/link";
import { ImageView } from "@/components/ui/image-view";
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";

type ArticleCardProps = {
  image: string | StaticImageData;
  title: string;
  href: string;
  className?: string;
};

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 12.5L12.5 1.5M12.5 1.5H5M12.5 1.5V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArticleCard({ image, title, href, className }: ArticleCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-[20px] overflow-hidden bg-stone-100 outline-1 -outline-offset-1 outline-stone-200",
        className
      )}
    >
      {/* Square image with arrow button at top-right */}
      <div className="relative aspect-square w-full">
        <ImageView
          fill
          src={image}
          alt={title}
          containerClassName="w-full h-full"
          className="object-cover"
        />
        <div className="absolute top-4 right-4 size-10 rounded-full bg-white flex items-center justify-center text-stone-800 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
          <ArrowUpRight />
        </div>
      </div>

      {/* Title below image */}
      <div className="px-6 pt-4 pb-6">
        <h3 className="text-stone-900 font-montserrat font-medium text-base leading-6">
          {title}
        </h3>
      </div>
    </Link>
  );
}
