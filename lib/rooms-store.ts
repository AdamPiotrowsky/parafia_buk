import fs from "node:fs/promises";
import path from "node:path";

import { bookingKey, HOURS, isValidDate, type Booking, type ChangeLog, type RoomId } from "@/lib/rooms";

/*
 * Magazyn rezerwacji salek — na razie pliki JSON na serwerze:
 *   data/salki.json      bieżące rezerwacje (przy pierwszym uruchomieniu kopiowane z data/salki.seed.json),
 *   data/salki-log.json  dziennik nadpisań i zwolnień cudzych rezerwacji.
 *
 * Wystarcza do pokazu i do serwera z trwałym dyskiem. Docelowo podmieniamy ten plik
 * na bazę danych — reszta strony (API i widok) się nie zmienia.
 */
const DATA = path.join(process.cwd(), "data", "salki.json");
const SEED = path.join(process.cwd(), "data", "salki.seed.json");
const LOG = path.join(process.cwd(), "data", "salki-log.json");

let queue: Promise<unknown> = Promise.resolve();

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

async function readAll(): Promise<Record<string, Booking>> {
  const list = await readJson<Booking[] | null>(DATA, null) ?? (await readJson<Booking[]>(SEED, []));
  return Object.fromEntries(list.map((b) => [bookingKey(b), b]));
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 1));
}

/* Zapisy po kolei, żeby dwie zmiany naraz się nie nadpisały */
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

export async function listBookings(from: string, to: string) {
  const all = await readAll();
  return Object.values(all).filter((b) => b.date >= from && b.date <= to);
}

export async function listLog(limit = 200) {
  const log = await readJson<ChangeLog[]>(LOG, []);
  return log.slice(-limit).reverse();
}

export type BookingChange = { date: string; hour: number; room: RoomId; who: string | null };

export function validateChange(c: Partial<BookingChange>): c is BookingChange {
  return (
    typeof c.date === "string" &&
    isValidDate(c.date) &&
    typeof c.hour === "number" &&
    HOURS.includes(c.hour) &&
    (c.room === "duza" || c.room === "biblioteka") &&
    (c.who === null || (typeof c.who === "string" && c.who.trim().length > 0 && c.who.length <= 80))
  );
}

export type ApplyResult = { ok: true } | { ok: false; needsAuthor: true; overwrites: number };

/*
 * Ustawia lub zwalnia (who = null) wiele godzin naraz.
 * Zmiana cudzej rezerwacji (inna nazwa albo zwolnienie) wymaga podpisu `author`
 * i jest zapisywana w dzienniku — sprawdzamy to tutaj, na serwerze.
 */
export function applyChanges(changes: BookingChange[], author?: string): Promise<ApplyResult> {
  return serial(async () => {
    const all = await readAll();
    const by = author?.trim();

    const overwrites = changes.filter((c) => {
      const existing = all[bookingKey(c)];
      return existing && existing.who !== (c.who?.trim() ?? null);
    });

    if (overwrites.length && !by) return { ok: false, needsAuthor: true, overwrites: overwrites.length };

    // Jeden wpis w dzienniku na każdą parę sala + „z czego na co”
    const at = new Date().toISOString();
    const groups = new Map<string, ChangeLog>();
    for (const c of overwrites) {
      const from = all[bookingKey(c)].who;
      const to = c.who?.trim() ?? null;
      const k = `${c.room}|${from}|${to}`;
      if (!groups.has(k)) groups.set(k, { at, by: by!, room: c.room, from, to, slots: [] });
      groups.get(k)!.slots.push({ date: c.date, hour: c.hour });
    }

    for (const c of changes) {
      const key = bookingKey(c);
      if (c.who === null) delete all[key];
      else all[key] = { date: c.date, hour: c.hour, room: c.room, who: c.who.trim() };
    }

    await writeJson(
      DATA,
      Object.values(all).sort((a, b) => bookingKey(a).localeCompare(bookingKey(b)))
    );
    if (groups.size) {
      const log = await readJson<ChangeLog[]>(LOG, []);
      await writeJson(LOG, [...log, ...groups.values()].slice(-2000));
    }
    return { ok: true };
  });
}
