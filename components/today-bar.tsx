"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { formatPolishDate, nextMass, saintOfDay, warsawNow, type WarsawNow } from "@/lib/liturgy";

/* Liczone w przeglądarce, żeby zawsze pokazywać bieżący dzień i godzinę */
function useWarsawNow() {
  const [now, setNow] = useState<WarsawNow | null>(null);
  useEffect(() => {
    const tick = () => setNow(warsawNow());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function inWords(minutes: number) {
  if (minutes < 60) return `za ${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `za ${h} godz. ${m} min` : `za ${h} godz.`;
}

export function TodayBar() {
  const now = useWarsawNow();
  if (!now) return <div className="h-9" />;

  const saint = saintOfDay(now.year, now.month, now.day);
  const mass = nextMass(now);

  return (
    <div className="flex h-9 items-center justify-between gap-6 text-[0.78rem] text-gold-pale/80">
      <p className="truncate">
        <span className="text-gold-pale">{formatPolishDate(now)}</span>
        {saint && (
          <>
            <span className="mx-2 text-gold/60">✦</span>
            <Link href="/swieci" className="hover:text-gold-pale">
              {saint.name}
            </Link>
          </>
        )}
      </p>
      <Link href="/msze" className="hidden shrink-0 items-center gap-2 hover:text-gold-pale sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
        Najbliższa Msza: <strong className="font-semibold text-gold-pale">{mass.when} {mass.time}</strong>
      </Link>
    </div>
  );
}

export function NextMassCard({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const now = useWarsawNow();
  const mass = now ? nextMass(now) : null;
  const light = tone === "light";

  return (
    <div>
      <p className={`text-[0.7rem] font-bold uppercase tracking-[0.25em] ${light ? "text-gold" : "text-gold-light"}`}>
        Najbliższa Msza Święta
      </p>
      <p className={`mt-2 font-display text-6xl font-semibold leading-none tabular-nums ${light ? "text-lapis" : "text-gold-pale"}`}>
        {mass ? mass.time : "—"}
      </p>
      <p className={`mt-2 text-sm ${light ? "text-ink-muted" : "text-gold-pale/70"}`}>
        {mass ? `${mass.when} · ${inWords(mass.inMinutes)}` : " "}
      </p>
    </div>
  );
}

export function SaintOfDayCard() {
  const now = useWarsawNow();
  if (!now) return <div className="h-40" />;
  const saint = saintOfDay(now.year, now.month, now.day);

  return (
    <div>
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold">Dziś w kalendarzu</p>
      <p className="mt-1 text-sm text-ink-muted">{formatPolishDate(now)}</p>
      {saint ? (
        <>
          <p className="mt-4 font-display text-[1.9rem] font-semibold leading-tight text-lapis">{saint.name}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-wine">{saint.rank}</p>
          {saint.local && (
            <p className="mt-4 border-l-2 border-gold pl-3 text-sm leading-6 text-ink-soft">{saint.local}</p>
          )}
        </>
      ) : (
        <p className="mt-4 font-display text-[1.9rem] font-semibold leading-tight text-lapis">
          Dzień powszedni
        </p>
      )}
    </div>
  );
}
