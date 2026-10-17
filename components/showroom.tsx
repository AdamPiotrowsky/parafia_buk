"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Monitor, Smartphone } from "lucide-react";

type Variant = { id: number; href: string; name: string; text: string };
type Device = "desktop" | "phone";

const SIZES: Record<Device, { w: number; h: number }> = {
  desktop: { w: 1440, h: 900 },
  phone: { w: 390, h: 844 },
};

const STORAGE_KEY = "propozycje-ulubione";

function readFavorites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

/*
 * Tryb prezentacji propozycji: podgląd na żywo każdej wersji strony głównej
 * w ramce komputera albo telefonu, przełączanie strzałkami, zaznaczanie ulubionych.
 */
export function Showroom({ variants }: { variants: Variant[] }) {
  const [index, setIndex] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const current = variants[index];
  const size = SIZES[device];

  useEffect(() => {
    const saved = readFavorites();
    if (saved.length) queueMicrotask(() => setFavorites(saved));
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((f) => {
      const next = f.includes(id) ? f.filter((x) => x !== id) : [...f, id].sort();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* bez pamięci w przeglądarce — wybór zostaje tylko do odświeżenia */
      }
      return next;
    });
  };

  const go = useCallback(
    (delta: number) => {
      setLoaded(false);
      setIndex((i) => (i + delta + variants.length) % variants.length);
    },
    [variants.length]
  );

  // Strzałki na klawiaturze
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Dopasowanie podglądu do dostępnego miejsca
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const fit = () => {
      const chrome = device === "desktop" ? 44 : 28;
      const pad = device === "desktop" ? 0 : 28;
      const s = Math.min((el.clientWidth - pad) / size.w, (el.clientHeight - chrome - pad) / size.h, 1);
      setScale(Math.max(s, 0.15));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [device, size.w, size.h]);

  return (
    <div className="lapis-sky flex h-svh flex-col text-gold-pale lg:flex-row">
      {/* Lista propozycji */}
      <aside className="flex shrink-0 flex-col border-gold/20 lg:w-[22rem] lg:border-r">
        <div className="flex items-center gap-3 px-6 pb-4 pt-6">
          <Image src="/logo/logo-gold.png" alt="" width={56} height={56} className="h-14 w-14" />
          <div>
            <p className="font-display text-xl font-semibold leading-tight">Sanktuarium w Buku</p>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold-light">Propozycje strony głównej</p>
          </div>
        </div>

        <ol className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:pb-6">
          {variants.map((v, i) => {
            const active = i === index;
            const fav = favorites.includes(v.id);
            return (
              <li key={v.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => {
                    if (i !== index) setLoaded(false);
                    setIndex(i);
                  }}
                  className={`flex w-56 items-start gap-4 rounded-2xl border p-4 text-left transition lg:w-full ${
                    active ? "border-gold-light/70 bg-gold-light/10" : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${
                      active ? "bg-gold-light text-lapis-deep" : "border border-gold/40 text-gold-light"
                    }`}
                  >
                    {v.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-display text-xl font-semibold">
                      {v.name}
                      {fav && <Heart size={14} className="fill-wine text-wine" />}
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-xs leading-5 text-gold-pale/60 lg:line-clamp-3">{v.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="hidden border-t border-gold/20 px-6 py-4 text-xs text-gold-pale/60 lg:block">
          {favorites.length ? (
            <p>
              Wybrane: <strong className="text-gold-light">{favorites.map((f) => `SG${f}`).join(", ")}</strong>
            </p>
          ) : (
            <p>Zaznacz serduszkiem wersje, które się podobają.</p>
          )}
          <p className="mt-1">Strzałki ← → przełączają propozycje.</p>
        </div>
      </aside>

      {/* Podgląd */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 pb-3 pt-5">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Poprzednia" className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 hover:bg-white/10">
              <ChevronLeft size={18} />
            </button>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gold-light">
                Propozycja {current.id} z {variants.length}
              </p>
              <h1 className="font-display text-3xl font-semibold leading-none">{current.name}</h1>
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Następna" className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 hover:bg-white/10">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-gold/30 p-1">
              {(["desktop", "phone"] as Device[]).map((d) => {
                const Icon = d === "desktop" ? Monitor : Smartphone;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDevice(d);
                      setLoaded(false);
                    }}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      device === d ? "bg-gold-light text-lapis-deep" : "text-gold-pale/80 hover:bg-white/10"
                    }`}
                  >
                    <Icon size={16} /> <span className="hidden sm:inline">{d === "desktop" ? "Komputer" : "Telefon"}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => toggleFavorite(current.id)}
              aria-pressed={favorites.includes(current.id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                favorites.includes(current.id) ? "border-wine bg-wine text-white" : "border-gold/30 hover:bg-white/10"
              }`}
            >
              <Heart size={16} className={favorites.includes(current.id) ? "fill-white" : ""} />
              <span className="hidden sm:inline">Podoba mi się</span>
            </button>
            <a
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-gold-light px-4 py-2.5 text-sm font-bold text-lapis-deep hover:bg-gold-pale"
            >
              <ExternalLink size={16} /> <span className="hidden sm:inline">Otwórz</span>
            </a>
          </div>
        </div>

        <p className="px-6 pb-4 text-sm text-gold-pale/70">{current.text}</p>

        <div className="relative min-h-0 flex-1 px-6 pb-6">
          <div ref={stageRef} className="flex h-full items-start justify-center">
            {device === "desktop" ? (
              <div className="overflow-hidden rounded-xl border border-white/15 bg-[#1b1f2a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]" style={{ width: size.w * scale }}>
                <div className="flex h-11 items-center gap-3 border-b border-white/10 px-4">
                  <span className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </span>
                  <span className="mx-auto truncate rounded-md bg-white/10 px-4 py-1 text-xs text-white/70">sanktuarium-buk.pl</span>
                </div>
                <Frame src={current.href} size={size} scale={scale} loaded={loaded} onLoad={() => setLoaded(true)} />
              </div>
            ) : (
              <div className="rounded-[2.6rem] border border-white/15 bg-[#111] p-[14px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <div className="overflow-hidden rounded-[2rem]">
                  <Frame src={current.href} size={size} scale={scale} loaded={loaded} onLoad={() => setLoaded(true)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Frame({
  src,
  size,
  scale,
  loaded,
  onLoad,
}: {
  src: string;
  size: { w: number; h: number };
  scale: number;
  loaded: boolean;
  onLoad: () => void;
}) {
  return (
    <div className="relative overflow-hidden bg-parchment" style={{ width: size.w * scale, height: size.h * scale }}>
      <iframe
        key={`${src}-${size.w}`}
        ref={(el) => {
          // strona mogła się wczytać, zanim React podpiął onLoad
          if (el?.contentDocument?.readyState === "complete" && el.contentWindow?.location.pathname === src) onLoad();
        }}
        src={src}
        title="Podgląd propozycji"
        onLoad={onLoad}
        className="absolute left-0 top-0 origin-top-left border-0"
        style={{ width: size.w, height: size.h, transform: `scale(${scale})` }}
      />
      {!loaded && (
        <div className="lapis-sky absolute inset-0 flex items-center justify-center">
          <Image src="/logo/postac-gold.png" alt="" width={80} height={80} className="h-20 w-20 animate-pulse" />
        </div>
      )}
    </div>
  );
}
