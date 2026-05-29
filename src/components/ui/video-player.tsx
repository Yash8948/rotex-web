"use client";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  src: string;
  variant?: "light" | "dark";
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  poster?: string;
  className?: string;
  containerClassName?: string;
};

export function VideoPlayer({
  src,
  variant = "light",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  poster,
  className,
  containerClassName,
}: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const shimmerClass = variant === "dark" ? "animate-shimmer-dark" : "animate-shimmer";
  const iconBg      = variant === "dark" ? "bg-white/10" : "bg-stone-300/60";
  const iconColor   = variant === "dark" ? "text-white/50" : "text-stone-500";

  return (
    <div className={cn("relative w-full h-full overflow-hidden", containerClassName)}>

      {/* Skeleton shimmer — shown until video is ready */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          shimmerClass,
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />

      {/* Play icon overlay on skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className={cn("w-14 h-14 rounded-full flex items-center justify-center", iconBg)}>
            <svg viewBox="0 0 24 24" className={cn("w-6 h-6 fill-current ml-1", iconColor)}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        poster={poster}
        onCanPlay={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}
