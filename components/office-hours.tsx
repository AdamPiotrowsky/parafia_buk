"use client";

import { useEffect, useState } from "react";

import type { Locale } from "@/lib/i18n/config";
import { warsawNow, type WarsawNow } from "@/lib/liturgy";
import { dayNames, officeStatus, officeWeek, weekIndex } from "@/lib/office-hours";

const labels: Record<Locale, { closed: string; today: string; openNow: (to: string) => string; closedNow: string; opens: (when: string, from: string) => string; todayWord: string; tomorrow: string }> = {
  pl: {
    closed: "nieczynne",
    today: "dziś",
    openNow: (to) => `Teraz otwarte · do ${to}`,
    closedNow: "Teraz zamknięte",
    opens: (when, from) => `otwieramy ${when} o ${from}`,
    todayWord: "dziś",
    tomorrow: "jutro",
  },
  en: {
    closed: "closed",
    today: "today",
    openNow: (to) => `Open now · until ${to}`,
    closedNow: "Closed now",
    opens: (when, from) => `opens ${when} at ${from}`,
    todayWord: "today",
    tomorrow: "tomorrow",
  },
  de: {
    closed: "geschlossen",
    today: "heute",
    openNow: (to) => `Jetzt geöffnet · bis ${to}`,
    closedNow: "Jetzt geschlossen",
    opens: (when, from) => `öffnet ${when} um ${from}`,
    todayWord: "heute",
    tomorrow: "morgen",
  },
  es: {
    closed: "cerrado",
    today: "hoy",
    openNow: (to) => `Abierto ahora · hasta las ${to}`,
    closedNow: "Cerrado ahora",
    opens: (when, from) => `abre ${when} a las ${from}`,
    todayWord: "hoy",
    tomorrow: "mañana",
  },
};

/* Bieżący dzień liczony w przeglądarce (czas Warszawy) — serwer renderuje bez wyróżnienia, żeby nie było rozjazdu */
function useNow() {
  const [now, setNow] = useState<WarsawNow | null>(null);
  useEffect(() => {
    const tick = () => setNow(warsawNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/*
 * Tydzień w jednym rzędzie — strona główna. Dni otwarte na granatowo z godzinami, dziś w złotej obwódce.
 * Na telefonie mieści się 7 kolumn, więc od razu widać, w które dni biuro działa.
 */
export function OfficeWeekStrip({ lang = "pl" }: { lang?: Locale }) {
  const now = useNow();
  const names = dayNames(lang, "short");
  const today = now ? weekIndex(now.weekday) : -1;
  const t = labels[lang];

  return (
    <ol className="grid grid-cols-7 gap-1 sm:gap-1.5">
      {officeWeek.map((h, i) => (
        <li
          key={i}
          aria-label={`${dayNames(lang, "long")[i]}: ${h ? `${h.from}–${h.to}` : t.closed}`}
          className={`flex flex-col items-center rounded-xl px-0.5 py-2 text-center ${
            h ? "bg-lapis text-gold-pale" : "bg-parchment-deep/60 text-ink-muted"
          } ${i === today ? "ring-2 ring-gold ring-offset-2 ring-offset-vellum" : ""}`}
        >
          <span className={`text-[0.68rem] font-bold uppercase tracking-wide ${h ? "text-gold-light" : ""}`}>{names[i]}</span>
          {h ? (
            <span className="mt-1 text-[0.72rem] font-semibold leading-tight tabular-nums sm:text-[0.8rem]">
              {h.from}
              <br />
              {h.to}
            </span>
          ) : (
            <span className="mt-1 text-[0.8rem] leading-tight" aria-hidden>
              —
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/* Czy teraz otwarte i kiedy najbliżej — jedna linijka nad listą */
export function OfficeStatusLine({ lang = "pl" }: { lang?: Locale }) {
  const now = useNow();
  if (!now) return <p className="h-6" />;
  const s = officeStatus(now.weekday, now.minutes);
  if (!s) return null;
  const t = labels[lang];
  if (s.open) {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
        <span className="h-2 w-2 rounded-full bg-emerald-600" /> {t.openNow(s.until)}
      </p>
    );
  }
  const when = s.isToday ? t.todayWord : s.isTomorrow ? t.tomorrow : dayNames(lang, "long")[s.nextDay].toLowerCase();
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-sm text-ink-soft">
      <span className="flex items-center gap-2 font-semibold text-wine">
        <span className="h-2 w-2 rounded-full bg-wine" /> {t.closedNow}
      </span>
      <span>{t.opens(when, s.nextFrom)}</span>
    </p>
  );
}

/* Pełny tydzień — strona Kontakt: każdy dzień w osobnej linijce, dziś wyróżnione */
export function OfficeWeekList({ lang = "pl" }: { lang?: Locale }) {
  const now = useNow();
  const names = dayNames(lang, "long");
  const today = now ? weekIndex(now.weekday) : -1;
  const t = labels[lang];

  return (
    <ul className="divide-y divide-line">
      {officeWeek.map((h, i) => (
        <li
          key={i}
          className={`flex items-baseline justify-between gap-3 px-3 py-2.5 ${i === today ? "-mx-0 rounded-lg bg-gold-pale/60 ring-1 ring-gold/60" : ""}`}
        >
          <span className={`flex items-center gap-2 ${h ? "font-semibold text-ink" : "text-ink-muted"}`}>
            {names[i]}
            {i === today && (
              <span className="rounded-full bg-gold px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white">{t.today}</span>
            )}
          </span>
          {h ? (
            <span className="font-display text-xl font-semibold tabular-nums text-lapis">
              {h.from} – {h.to}
            </span>
          ) : (
            <span className="text-sm text-ink-muted">{t.closed}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
