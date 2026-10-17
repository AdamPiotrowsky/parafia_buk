"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

export type WingData = {
  label: string;
  image: string;
  title: string;
  subtitle: string;
  text: string;
  facts: { year: string; text: string }[];
  links: { href: string; label: string }[];
};

type Side = "left" | "right";

/*
 * Tryptyk: środek z najważniejszymi informacjami, a po bokach dwa „skrzydła”
 * — uchylone widać zdjęcie i podpis, po kliknięciu wysuwają się z pełną treścią.
 * Otwarte może być jedno skrzydło naraz.
 */
export function Triptych({
  left,
  right,
  children,
}: {
  left: WingData;
  right: WingData;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<Side | null>(null);
  const toggle = (side: Side) => setOpen((o) => (o === side ? null : side));

  return (
    <>
      {/* Komputer: skrzydła po bokach */}
      <div className="hidden min-h-[calc(100svh-7.25rem)] items-stretch gap-5 py-8 lg:flex">
        <Wing data={left} side="left" open={open === "left"} onToggle={() => toggle("left")} />
        <div className="flex min-w-0 flex-1 items-center justify-center">{children}</div>
        <Wing data={right} side="right" open={open === "right"} onToggle={() => toggle("right")} />
      </div>

      {/* Telefon: środek, pod nim skrzydła rozwijane w dół */}
      <div className="py-10 lg:hidden">
        {children}
        <div className="mt-10 space-y-4">
          <MobileWing data={left} open={open === "left"} onToggle={() => toggle("left")} />
          <MobileWing data={right} open={open === "right"} onToggle={() => toggle("right")} />
        </div>
      </div>
    </>
  );
}

function Wing({ data, side, open, onToggle }: { data: WingData; side: Side; open: boolean; onToggle: () => void }) {
  const Chevron = (side === "left") === open ? ChevronLeft : ChevronRight;

  return (
    <aside
      className={`group relative shrink-0 overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-gold/50 bg-lapis-deep shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "w-[30rem]" : "w-[10.5rem] hover:w-[12rem]"
      }`}
    >
      {/* Uchylone skrzydło — zdjęcie i pionowy podpis */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? `Zamknij: ${data.label}` : `Pokaż więcej: ${data.label}`}
        className={`absolute inset-0 z-10 flex flex-col items-center justify-end pb-8 text-gold-pale transition-opacity duration-500 ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Image src={data.image} alt="" fill sizes="200px" className="object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute inset-0 bg-gradient-to-t from-lapis-deep via-lapis-deep/40 to-transparent" />
        <span className="relative font-display text-3xl font-semibold [writing-mode:vertical-rl] rotate-180">{data.label}</span>
        <span className="relative mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold-light/60 bg-lapis-deep/60 text-gold-light transition group-hover:bg-gold-light group-hover:text-lapis-deep">
          <Chevron size={18} />
        </span>
      </button>

      {/* Wysunięte skrzydło — pełna treść */}
      <div
        className={`flex h-full w-[30rem] flex-col transition-opacity duration-500 ${
          open ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="relative h-[42%] min-h-56 shrink-0">
          <Image src={data.image} alt={data.title} fill sizes="480px" className="object-cover object-top" />
          <span className="absolute inset-0 bg-gradient-to-t from-lapis-deep to-transparent" />
          <button
            type="button"
            onClick={onToggle}
            aria-label="Zamknij"
            className="absolute right-5 top-16 flex h-10 w-10 items-center justify-center rounded-full bg-lapis-deep/70 text-gold-light ring-1 ring-gold/50 hover:bg-gold-light hover:text-lapis-deep"
          >
            <X size={18} />
          </button>
        </div>
        <WingBody data={data} />
      </div>
    </aside>
  );
}

function WingBody({ data }: { data: WingData }) {
  return (
    <div className="flex-1 overflow-y-auto px-8 pb-8">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-gold-light">{data.subtitle}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-gold-pale">{data.title}</h2>
      <p className="mt-4 text-[0.95rem] leading-7 text-gold-pale/80">{data.text}</p>
      <dl className="mt-6 space-y-2 border-t border-gold/25 pt-5">
        {data.facts.map((f) => (
          <div key={f.year} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3">
            <dt className="font-display text-2xl font-semibold text-gold-light">{f.year}</dt>
            <dd className="text-sm text-gold-pale/75">{f.text}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-7 flex flex-wrap gap-2">
        {data.links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
              i === 0
                ? "bg-gold-light text-lapis-deep hover:bg-gold-pale"
                : "border border-gold-light/40 text-gold-pale hover:bg-gold-light/10"
            }`}
          >
            {l.label} {i === 0 && <ArrowRight size={15} />}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileWing({ data, open, onToggle }: { data: WingData; open: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold/50 bg-lapis-deep">
      <button type="button" onClick={onToggle} aria-expanded={open} className="relative flex h-32 w-full items-end p-5 text-left">
        <Image src={data.image} alt="" fill sizes="100vw" className="object-cover object-[50%_25%]" />
        <span className="absolute inset-0 bg-gradient-to-r from-lapis-deep via-lapis-deep/70 to-lapis-deep/10" />
        <span className="relative flex-1">
          <span className="block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold-light">{data.subtitle}</span>
          <span className="block font-display text-2xl font-semibold text-gold-pale">{data.label}</span>
        </span>
        <span
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-gold-light/60 text-gold-light transition duration-300 ${
            open ? "rotate-45 bg-gold-light text-lapis-deep" : ""
          }`}
        >
          <Plus size={18} />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="pt-6">
            <WingBody data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
