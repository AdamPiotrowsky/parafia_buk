import type { Locale } from "@/lib/i18n/config";

/*
 * Godziny pracy biura parafialnego dzień po dniu — od poniedziałku do niedzieli.
 * null = biuro nieczynne. Zmiana godzin: tylko tutaj (tekstowe wersje w lib/site.ts i lib/i18n/ui.ts
 * są jeszcze używane w zdaniach typu „dzwoń w godzinach pracy biura”).
 */
export type OfficeDay = { from: string; to: string } | null;

export const officeWeek: OfficeDay[] = [
  null, // poniedziałek
  { from: "9:00", to: "11:00" }, // wtorek
  { from: "16:00", to: "18:00" }, // środa
  { from: "9:00", to: "11:00" }, // czwartek
  { from: "9:00", to: "11:00" }, // piątek
  { from: "9:00", to: "11:00" }, // sobota
  null, // niedziela
];

/* 2024-01-01 był poniedziałkiem — z niego bierzemy nazwy dni w danym języku */
const monday = Date.UTC(2024, 0, 1);

export function dayNames(lang: Locale, width: "short" | "long") {
  return officeWeek.map((_, i) => {
    const name = new Intl.DateTimeFormat(lang, { weekday: width, timeZone: "UTC" }).format(new Date(monday + i * 86_400_000));
    const clean = width === "short" ? name.replace(/\.$/, "") : name;
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  });
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/* Indeks w officeWeek (0 = poniedziałek) z dnia tygodnia JS (0 = niedziela) */
export const weekIndex = (jsWeekday: number) => (jsWeekday + 6) % 7;

/* Czy biuro jest teraz otwarte, a jeśli nie — kiedy najbliżej (indeks dnia i godzina) */
export function officeStatus(jsWeekday: number, minutes: number) {
  const today = weekIndex(jsWeekday);
  const hours = officeWeek[today];
  if (hours && minutes >= toMinutes(hours.from) && minutes < toMinutes(hours.to)) {
    return { open: true as const, until: hours.to };
  }
  for (let step = 0; step < 8; step++) {
    const i = (today + step) % 7;
    const h = officeWeek[i];
    if (!h) continue;
    if (step === 0 && minutes >= toMinutes(h.from)) continue;
    return { open: false as const, nextDay: i, nextFrom: h.from, isToday: step === 0, isTomorrow: step === 1 };
  }
  return null;
}
