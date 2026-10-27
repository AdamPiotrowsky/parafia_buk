"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { href, type Locale } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";
import { formatPolishDate, saintOfDay, warsawNow, type WarsawNow } from "@/lib/liturgy";

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


/* Data w języku strony — w innych językach bez polskiego patrona dnia */
function formatDate(now: WarsawNow, lang: Locale) {
  if (lang === "pl") return formatPolishDate(now);
  return new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(now.year, now.month - 1, now.day)),
  );
}

export function TodayBar({ lang = "pl" }: { lang?: Locale }) {
  const now = useWarsawNow();
  if (!now) return <div className="h-9" />;

  const saint = lang === "pl" ? saintOfDay(now.year, now.month, now.day) : null;
  return (
    <div className="flex h-9 items-center justify-between gap-6 text-[0.78rem] text-gold-pale/80">
      <p className="truncate">
        <span className="text-gold-pale first-letter:uppercase">{formatDate(now, lang)}</span>
        {saint && (
          <>
            <span className="mx-2 text-gold/60">✦</span>
            <Link href="/swieci" className="hover:text-gold-pale">
              {saint.name}
            </Link>
          </>
        )}
      </p>
      <Link href={href("/msze", lang)} className="hidden shrink-0 items-center gap-2 hover:text-gold-pale sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
        {ui[lang].massTimes}
      </Link>
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
