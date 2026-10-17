"use client";

import { useEffect, useRef } from "react";

/*
 * Wyciszony, zapętlony film w tle (np. przelot drona).
 * Przy „ogranicz ruch” w systemie zostaje sam kadr (poster).
 */
export function AmbientVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      /* autoplay zablokowany — zostaje poster */
    });
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
