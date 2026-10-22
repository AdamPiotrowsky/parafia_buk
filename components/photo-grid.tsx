"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* Siatka zdjęć z podglądem na pełnym ekranie (strzałki ← →, Esc zamyka) */
export function PhotoGrid({ photos, title }: { photos: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-parchment-deep"
            aria-label={`Powiększ zdjęcie ${i + 1} z ${photos.length}`}
          >
            <Image src={src} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90" role="dialog" aria-modal="true" aria-label={title} onClick={() => setOpen(null)}>
          <div className="relative h-[85vh] w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[open]} alt={`${title} — zdjęcie ${open + 1}`} fill sizes="92vw" className="object-contain" priority />
          </div>
          <p className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1 text-sm text-white/80">
            {open + 1} / {photos.length}
          </p>
          <button type="button" onClick={() => setOpen(null)} aria-label="Zamknij" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Poprzednie"
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Następne"
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
