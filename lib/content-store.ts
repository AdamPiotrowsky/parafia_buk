import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

/*
 * Treści edytowane w panelu: ogłoszenia, intencje i aktualności.
 *
 * Na razie pliki na serwerze (jak grafik salek):
 *   data/tresci.json   wszystkie wpisy,
 *   data/zdjecia/      zdjęcia aktualności (podawane przez /api/zdjecia/<plik>).
 *
 * Wystarcza na serwerze z trwałym dyskiem. Docelowo podmieniamy ten plik na bazę danych —
 * panel i strony korzystają tylko z funkcji poniżej.
 */
const DATA = path.join(process.cwd(), "data", "tresci.json");
export const PHOTOS_DIR = path.join(process.cwd(), "data", "zdjecia");

export type BulletinKind = "announcements" | "intentions";

export type StoredBulletin = {
  id: string;
  title: string;
  dateLabel: string;
  html: string;
  fileName?: string;
  createdAt: string;
  updatedAt: string;
};

export type StoredNews = {
  id: string;
  slug: string;
  title: string;
  date: string; // rrrr-mm-dd
  html: string;
  image?: string; // nazwa pliku w data/zdjecia
  createdAt: string;
  updatedAt: string;
};

type Store = { announcements: StoredBulletin[]; intentions: StoredBulletin[]; news: StoredNews[] };

let queue: Promise<unknown> = Promise.resolve();

/* Zapisy po kolei, żeby dwie zmiany naraz się nie nadpisały */
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function readStore(): Promise<Store> {
  try {
    const s = JSON.parse(await fs.readFile(DATA, "utf-8")) as Partial<Store>;
    return { announcements: s.announcements ?? [], intentions: s.intentions ?? [], news: s.news ?? [] };
  } catch {
    return { announcements: [], intentions: [], news: [] };
  }
}

async function writeStore(store: Store) {
  await fs.mkdir(path.dirname(DATA), { recursive: true });
  // najpierw do pliku tymczasowego — przerwany zapis nie zniszczy danych
  await fs.writeFile(`${DATA}.tmp`, JSON.stringify(store, null, 1));
  await fs.rename(`${DATA}.tmp`, DATA);
}

const newId = () => crypto.randomBytes(6).toString("hex");
const newestFirst = <T extends { createdAt: string }>(a: T, b: T) => b.createdAt.localeCompare(a.createdAt);

/* ---------- ogłoszenia i intencje ---------- */

export async function listBulletins(kind: BulletinKind) {
  return (await readStore())[kind].sort(newestFirst);
}

export async function getBulletin(kind: BulletinKind, id: string) {
  return (await readStore())[kind].find((b) => b.id === id) ?? null;
}

export type BulletinInput = Pick<StoredBulletin, "title" | "dateLabel" | "html" | "fileName">;

export function saveBulletin(kind: BulletinKind, input: BulletinInput, id?: string) {
  return serial(async () => {
    const store = await readStore();
    const now = new Date().toISOString();
    const existing = id ? store[kind].find((b) => b.id === id) : undefined;
    if (existing) Object.assign(existing, input, { updatedAt: now });
    else store[kind].push({ id: newId(), ...input, createdAt: now, updatedAt: now });
    await writeStore(store);
  });
}

export function deleteBulletin(kind: BulletinKind, id: string) {
  return serial(async () => {
    const store = await readStore();
    store[kind] = store[kind].filter((b) => b.id !== id);
    await writeStore(store);
  });
}

/* ---------- aktualności ---------- */

export async function listNews() {
  return (await readStore()).news.sort((a, b) => b.date.localeCompare(a.date) || newestFirst(a, b));
}

export async function getNews(id: string) {
  return (await readStore()).news.find((n) => n.id === id) ?? null;
}

/* „Zaproszenie na Jerycho Różańcowe!” → „zaproszenie-na-jerycho-rozancowe” */
export function slugify(text: string) {
  const map: Record<string, string> = { ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z" };
  return (
    text
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, (c) => map[c])
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "wpis"
  );
}

export type NewsInput = Pick<StoredNews, "title" | "date" | "html"> & { image?: string | null };

/* image: undefined = bez zmian, null = usuń zdjęcie, tekst = nowy plik. Zwraca usunięte pliki zdjęć. */
export function saveNews(input: NewsInput, id: string | undefined, takenSlugs: string[]) {
  return serial(async () => {
    const store = await readStore();
    const now = new Date().toISOString();
    const existing = id ? store.news.find((n) => n.id === id) : undefined;
    const removed: string[] = [];

    const { image, ...fields } = input;
    if (existing) {
      if (image !== undefined && existing.image && existing.image !== image) removed.push(existing.image);
      Object.assign(existing, fields, { updatedAt: now }, image !== undefined ? { image: image ?? undefined } : {});
    } else {
      const taken = new Set([...takenSlugs, ...store.news.map((n) => n.slug)]);
      const base = slugify(input.title);
      let slug = base;
      for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`;
      store.news.push({ id: newId(), slug, ...fields, image: image ?? undefined, createdAt: now, updatedAt: now });
    }
    await writeStore(store);
    return removed;
  });
}

export function deleteNews(id: string) {
  return serial(async () => {
    const store = await readStore();
    const item = store.news.find((n) => n.id === id);
    store.news = store.news.filter((n) => n.id !== id);
    await writeStore(store);
    return item?.image ? [item.image] : [];
  });
}

export async function removePhotos(files: string[]) {
  await Promise.all(files.map((f) => fs.rm(path.join(PHOTOS_DIR, path.basename(f)), { force: true })));
}
