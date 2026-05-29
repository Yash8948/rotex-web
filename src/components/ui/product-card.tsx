import Link from "next/link";
import { ImageView } from "@/components/ui/image-view";
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";

type ProductCardProps = {
  name: string;
  description: string;
  image: string | StaticImageData;
  href: string;
  className?: string;
};

export function ProductCard({ name, description, image, href, className }: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col shrink-0 w-56 rounded-2xl overflow-hidden bg-[#f5f1ef] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200",
        className
      )}
    >
      {/* Product image — large, vertically centered */}
      <div className="flex items-center justify-center px-8 pt-8 pb-5" style={{ height: 196 }}>
        <ImageView
          src={image}
          alt={name}
          width={160}
          height={160}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text — centered */}
      <div className="flex-1 px-5 pb-6 text-center">
        <h3 className="text-brand-500 font-montserrat font-bold text-[15px] mb-2 leading-snug">
          {name}
        </h3>
        <p className="text-stone-500 font-montserrat text-[13px] leading-5">
          {description}
        </p>
      </div>

      {/* Bottom brand gradient bar */}
      <div
        className="h-0.75 w-full shrink-0"
        style={{ background: "linear-gradient(to right, #ff9a00, #f03900, #950000, #000000)" }}
      />
    </Link>
  );
}
