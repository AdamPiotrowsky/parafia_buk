"use client";

import { useEffect, useRef } from "react";

/*
 * Wyciszony, zapętlony film w tle (np. przelot drona).
 * - telefon dostaje lżejszą wersję (mobileSrc, 720p), komputer pełne 1080p,
 * - film pobiera się i gra dopiero, gdy jest na ekranie, a poza nim się zatrzymuje (dane komórkowe, bateria),
 * - przy „ogranicz ruch” w systemie zostaje sam kadr (poster).
 */
export function AmbientVideo({
  src,
  mobileSrc,
  poster,
  label,
  className = "",
}: {
  src: string;
  mobileSrc?: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay zablokowany — zostaje poster */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} className={className} poster={poster} aria-label={label} muted loop playsInline preload="none">
      {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
