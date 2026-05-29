import Image, { type ImageProps, type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type ImageViewProps = Omit<ImageProps, "src"> & {
  src: string | StaticImageData;
  containerClassName?: string;
};

export function ImageView({ src, alt, fill, className, containerClassName, ...props }: ImageViewProps) {
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        <Image src={src} alt={alt} fill className={cn("object-cover", className)} {...props} />
      </div>
    );
  }

  return <Image src={src} alt={alt} className={cn("object-contain", className)} {...props} />;
}
