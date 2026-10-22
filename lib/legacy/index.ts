import galleryData from "@/lib/legacy/gallery.json";
import newsData from "@/lib/legacy/news.json";

/*
 * Treści przeniesione ze starej strony sanktuarium-buk.pl
 * (aktualności i galerie, pobrane w październiku 2026).
 */

export type NewsItem = {
  slug: string;
  title: string;
  date: string; // dd.mm.rrrr
  content: string; // oczyszczony HTML
  images: string[];
};

export type Album = {
  slug: string;
  title: string;
  photos: string[];
};

export const news = newsData as NewsItem[];
export const albums = galleryData as Album[];

export function excerpt(html: string, length = 180) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > length ? `${text.slice(0, length).replace(/\s+\S*$/, "")}…` : text;
}

/* „15.09.2026” → „15 września 2026” */
export function formatNewsDate(date: string) {
  const m = date.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  if (!m) return date;
  const months = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
  ];
  return `${Number(m[1])} ${months[Number(m[2]) - 1]} ${m[3]}`;
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page || 1), pages);
  return { items: items.slice((current - 1) * perPage, current * perPage), current, pages };
}
