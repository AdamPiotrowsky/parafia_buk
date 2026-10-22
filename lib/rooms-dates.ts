import { warsawNow } from "@/lib/liturgy";

/* Daty grafiku jako tekst RRRR-MM-DD, liczone w UTC, żeby nie mieszać stref czasowych */
export const toDate = (s: string) => new Date(`${s}T00:00:00Z`);
export const fmt = (d: Date) => d.toISOString().slice(0, 10);
export const addDays = (s: string, n: number) => fmt(new Date(toDate(s).getTime() + n * 86_400_000));

/* Poniedziałek tygodnia, w którym jest dana data */
export function mondayOf(s: string) {
  const dow = toDate(s).getUTCDay(); // 0 = niedziela
  return addDays(s, dow === 0 ? -6 : 1 - dow);
}

export function addMonths(s: string, n: number) {
  const d = toDate(s);
  d.setUTCMonth(d.getUTCMonth() + n);
  return fmt(d);
}

export const dayLabel = (s: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("pl-PL", { timeZone: "UTC", ...opts }).format(toDate(s));

export const hourLabel = (h: number) => `${h}:00–${h + 1}:00`;

export function todayString() {
  const n = warsawNow();
  return `${n.year}-${String(n.month).padStart(2, "0")}-${String(n.day).padStart(2, "0")}`;
}

/* Lista godzin → „czw. 22.10, 19:00–21:00 · pt. 23.10, 18:00–19:00” */
export function describeSlots(slots: { date: string; hour: number }[], max = 4) {
  const byDate = new Map<string, number[]>();
  for (const s of [...slots].sort((a, b) => (a.date === b.date ? a.hour - b.hour : a.date.localeCompare(b.date)))) {
    byDate.set(s.date, [...(byDate.get(s.date) ?? []), s.hour]);
  }
  const parts: string[] = [];
  for (const [date, hours] of byDate) {
    const ranges: string[] = [];
    let from = hours[0];
    for (let i = 1; i <= hours.length; i++) {
      if (hours[i] !== hours[i - 1] + 1) {
        ranges.push(`${from}:00–${hours[i - 1] + 1}:00`);
        from = hours[i];
      }
    }
    parts.push(`${dayLabel(date, { weekday: "short", day: "numeric", month: "numeric" })}, ${ranges.join(", ")}`);
  }
  return parts.length > max ? `${parts.slice(0, max).join(" · ")} · i ${parts.length - max} więcej` : parts.join(" · ");
}
