/* Grafik salek — wspólne typy i stałe (serwer i przeglądarka) */

export type RoomId = "duza" | "biblioteka";

export const rooms: { id: RoomId; name: string; short: string }[] = [
  { id: "duza", name: "Duża sala", short: "Duża" },
  { id: "biblioteka", name: "Biblioteka", short: "Biblioteka" },
];

/* Godziny rozpoczęcia: 8:00 – 21:00 (ostatnia rezerwacja kończy się o 22:00) */
export const HOURS = Array.from({ length: 14 }, (_, i) => 8 + i);

export type Booking = {
  date: string; // RRRR-MM-DD
  hour: number; // godzina rozpoczęcia
  room: RoomId;
  who: string;
};

/* Wpis w historii zmian — kto nadpisał lub zwolnił cudzą rezerwację */
export type ChangeLog = {
  at: string; // ISO
  by: string; // imię i nazwisko
  room: RoomId;
  from: string;
  to: string | null; // null = zwolniono
  slots: { date: string; hour: number }[];
};

export const bookingKey = (b: Pick<Booking, "date" | "hour" | "room">) => `${b.date}|${b.hour}|${b.room}`;

/* Grupy do wyboru (z dotychczasowego arkusza i listy wspólnot) */
export const roomGroups = [
  "Akcja Katolicka",
  "Apostolat Miłosierdzia",
  "Bierzmowani klasa 7",
  "Bierzmowani klasa 8",
  "Caritas",
  "Chórek parafialny",
  "Czciciele Matki Bożej Bukowskiej Literackiej",
  "Dobrem Zwyciężaj",
  "Grupa biblijna",
  "Grupa bł. Ojca Rafała Chylińskiego",
  "Grupa Ojca Pio",
  "Katecheza przed chrztem",
  "Krucjata Rodzin",
  "Magnificat",
  "Ministranci",
  "Przymierze Miłosierdzia",
  "Różaniec Rodziców",
  "Stowarzyszenie Dzieci i Młodzieży Maryjnej",
  "Wspólnota Ikonopisarzy",
  "Żywy Różaniec",
];

/* Stały kolor dla każdej grupy — ta sama grupa zawsze wygląda tak samo */
const palette = [
  "bg-[#e8eefb] text-[#1b2f5b] border-[#c5d3f0]",
  "bg-[#f7e9e7] text-[#7c2a26] border-[#ecc9c4]",
  "bg-[#f4ecd7] text-[#6b5320] border-[#e3d3a6]",
  "bg-[#e6f2ec] text-[#22543d] border-[#bfdccd]",
  "bg-[#efe7f6] text-[#4b2e6b] border-[#d8c6ea]",
  "bg-[#fdeee0] text-[#8a4512] border-[#f3d1b0]",
  "bg-[#e5f1f4] text-[#1e5262] border-[#bfdde5]",
  "bg-[#f3e8ee] text-[#6e2a4c] border-[#e4c7d6]",
];

export function groupColor(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}

export const isValidDate = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d);
