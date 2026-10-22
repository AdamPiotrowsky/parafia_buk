"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export type NavePanel = {
  id: string;
  title: string;
  summary: string;
  /** Zdjęcie pokazywane po lewej, gdy panel jest otwarty. */
  image?: string;
  imagePosition?: string;
  caption?: string;
  body: React.ReactNode;
  link?: { href: string; label: string };
};

const ALTAR = {
  image: "/images/fara-oltarz.jpg",
  position: "object-[51%_45%]",
  caption: "Ołtarz główny fary z obrazem Matki Bożej Bukowskiej Literackiej",
};

/*
 * „Nawa”: po lewej duże zdjęcie (domyślnie ołtarz), po prawej białe panele,
 * które się wysuwają — a zdjęcie płynnie przechodzi na temat otwartego panelu.
 */
export function Nave({ panels, intro }: { panels: NavePanel[]; intro: React.ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const active = panels.find((p) => p.id === open && p.image);
  const shown = active
    ? { image: active.image!, position: active.imagePosition ?? "object-center", caption: active.caption ?? active.title }
    : ALTAR;

  const layers = [ALTAR, ...panels.filter((p) => p.image).map((p) => ({ image: p.image!, position: p.imagePosition ?? "object-center", caption: p.caption ?? p.title }))];

  return (
    <section className="grid bg-white lg:min-h-[calc(100svh-7.25rem)] lg:grid-cols-[1.1fr_1fr]">
      {/* Zdjęcie */}
      <div className="relative aspect-[4/5] overflow-hidden bg-lapis-deep sm:aspect-[16/10] lg:sticky lg:top-[7.25rem] lg:aspect-auto lg:h-[calc(100svh-7.25rem)]">
        {layers.map((l, i) => (
          <Image
            key={l.image}
            src={l.image}
            alt={l.caption}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className={`object-cover ${l.position} transition-opacity duration-1000 ${i === 0 ? "hero-zoom" : ""} ${
              shown.image === l.image ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-24">
          <p className="font-display text-lg italic text-white/90">{shown.caption}</p>
        </div>
      </div>

      {/* Biała kolumna */}
      <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-14">
        {intro}

        <ul className="mt-10 border-t border-line">
          {panels.map((p) => {
            const isOpen = open === p.id;
            return (
              <li key={p.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-5 py-5 text-left"
                >
                  {p.image && (
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/50">
                      <Image src={p.image} alt="" fill sizes="56px" className={`object-cover ${p.imagePosition ?? ""}`} />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl font-semibold text-ink group-hover:text-lapis">{p.title}</span>
                    <span className="block text-sm text-ink-muted">{p.summary}</span>
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                      isOpen ? "rotate-45 border-lapis bg-lapis text-gold-pale" : "border-line text-lapis group-hover:border-lapis"
                    }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="pb-7 pl-0 text-[1.02rem] leading-7 text-ink-soft sm:pl-[4.75rem]">
                      {p.body}
                      {p.link && (
                        <Link href={p.link.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lapis hover:text-gold">
                          {p.link.label} <ArrowRight size={15} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
