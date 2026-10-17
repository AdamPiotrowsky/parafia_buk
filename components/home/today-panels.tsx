"use client";

import { useEffect, useState } from "react";

import { massesFor, nextMass, warsawNow, type WarsawNow } from "@/lib/liturgy";

function useNow() {
  const [now, setNow] = useState<WarsawNow | null>(null);
  useEffect(() => {
    const tick = () => setNow(warsawNow());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/* Dzisiejsze Msze — minione przygaszone, najbliższa wyróżniona */
export function TodayMasses() {
  const now = useNow();
  if (!now) return <div className="h-14" />;

  const times = massesFor(now.year, now.month, now.day, now.weekday);
  const next = nextMass(now);

  return (
    <div>
      <p className="text-sm text-gold-pale/70">Msze dzisiaj</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {times.map((t) => {
          const past = toMin(t) <= now.minutes;
          const isNext = next.when === "dziś" && next.time === t;
          return (
            <li
              key={t}
              className={`rounded-full px-4 py-1.5 text-lg font-semibold tabular-nums ${
                isNext
                  ? "bg-gold-light text-lapis-deep"
                  : past
                    ? "text-gold-pale/35 line-through decoration-1"
                    : "border border-gold-light/40 text-gold-pale"
              }`}
            >
              {t}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Godziny kancelarii: 0 = niedziela; [od, do] w minutach */
const office: Record<number, [number, number]> = {
  2: [540, 660],
  3: [960, 1080],
  4: [540, 660],
  5: [540, 660],
  6: [540, 660],
};
const dayNames = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
const hhmm = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

export function OfficeStatus() {
  const now = useNow();
  if (!now) return <div className="h-16" />;

  const today = office[now.weekday];
  const isOpen = today && now.minutes >= today[0] && now.minutes < today[1];

  let nextLabel = "";
  if (!isOpen) {
    for (let i = 0; i < 7; i++) {
      const d = (now.weekday + i) % 7;
      const slot = office[d];
      if (!slot || (i === 0 && now.minutes >= slot[0])) continue;
      nextLabel = `${i === 0 ? "dziś" : i === 1 ? "jutro" : dayNames[d]} od ${hhmm(slot[0])}`;
      break;
    }
  }

  return (
    <div>
      <p className="flex items-center gap-2.5">
        <span className={`h-3 w-3 rounded-full ${isOpen ? "bg-emerald-600" : "bg-wine/70"}`} />
        <span className="font-display text-3xl font-semibold text-lapis">{isOpen ? "Otwarta teraz" : "Teraz zamknięta"}</span>
      </p>
      <p className="mt-1 text-ink-soft">
        {isOpen ? `do ${hhmm(today[1])}` : `Najbliżej: ${nextLabel}`}
      </p>
    </div>
  );
}
