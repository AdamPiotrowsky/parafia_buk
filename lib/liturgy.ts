import { massSchedule } from "@/lib/site";
import { saintsCalendar, type CalendarEntry } from "@/lib/saints";

const TIME_ZONE = "Europe/Warsaw";

export type WarsawNow = {
  year: number;
  month: number; // 1-12
  day: number;
  weekday: number; // 0 = niedziela
  minutes: number; // minuty od północy
};

export function warsawNow(date = new Date()): WarsawNow {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: weekdays.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function key(month: number, day: number) {
  return `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/* Wielkanoc — algorytm Meeusa/Jonesa/Butchera */
function easter(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 86_400_000);
}

/* Święta nakazane, które mogą wypaść w dzień roboczy */
export function isHolyDayOfObligation(year: number, month: number, day: number) {
  const fixed = ["01-01", "01-06", "05-03", "08-15", "11-01", "12-25", "12-26"];
  if (fixed.includes(key(month, day))) return true;

  const corpusChristi = addDays(easter(year), 60);
  return corpusChristi.getUTCMonth() + 1 === month && corpusChristi.getUTCDate() === day;
}

export function massesFor(year: number, month: number, day: number, weekday: number) {
  const summer = month === 7 || month === 8;
  if (weekday === 0) return summer ? massSchedule.sundaySummer : massSchedule.sunday;
  if (isHolyDayOfObligation(year, month, day)) return massSchedule.holyDayOnWorkday;
  return massSchedule.weekday;
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export type NextMass = { time: string; when: "dziś" | "jutro"; inMinutes: number };

export function nextMass(now: WarsawNow): NextMass {
  const today = massesFor(now.year, now.month, now.day, now.weekday);
  const upcoming = today.find((t) => toMinutes(t) > now.minutes);
  if (upcoming) {
    return { time: upcoming, when: "dziś", inMinutes: toMinutes(upcoming) - now.minutes };
  }

  const t = addDays(new Date(Date.UTC(now.year, now.month - 1, now.day)), 1);
  const tomorrow = massesFor(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCDay());
  return {
    time: tomorrow[0],
    when: "jutro",
    inMinutes: 24 * 60 - now.minutes + toMinutes(tomorrow[0]),
  };
}

export function saintOfDay(month: number, day: number): CalendarEntry | undefined {
  return saintsCalendar[key(month, day)];
}

export function formatPolishDate(now: WarsawNow) {
  const weekdays = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  const months = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
  ];
  const text = `${weekdays[now.weekday]}, ${now.day} ${months[now.month - 1]}`;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
