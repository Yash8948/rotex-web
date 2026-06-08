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
        "group flex flex-col rounded-2xl overflow-hidden bg-[#f5f1ef] hover:-translate-y-1 transition-transform duration-200",
        className
      )}
    >
      {/* Image with arrow button */}
      <div className="relative aspect-[4/3] shrink-0">
        <ImageView
          fill
          src={image}
          alt={title}
          containerClassName="w-full h-full"
          className="object-cover"
        />
        {/* Arrow button — top right corner */}
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center text-stone-700 shadow-sm group-hover:bg-brand-500 group-hover:text-white transition-colors duration-200">
          <ArrowUpRight />
        </div>
      </div>

      {/* Title */}
      <div className="p-4">
        <h3 className="text-stone-800 font-montserrat font-semibold text-[14px] leading-5">
          {title}
        </h3>
      </div>
    </Link>
  );
}
