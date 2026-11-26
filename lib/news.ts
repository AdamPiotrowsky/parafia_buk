import { listNews } from "@/lib/content-store";
import { news as legacyNews } from "@/lib/legacy";
import { legacyHtml, legacyUrl } from "@/lib/legacy/assets";

/*
 * Aktualności na stronie: dodane w panelu + przeniesione ze starej strony, od najnowszych.
 */
export type NewsEntry = {
  slug: string;
  title: string;
  date: string; // dd.mm.rrrr
  html: string;
  image?: string; // gotowy adres zdjęcia
  local: boolean; // zdjęcie z panelu (/api/zdjecia) — już zmniejszone, bez optymalizacji next/image
};

const sortKey = (date: string) => date.split(".").reverse().join("-");

export async function allNews(): Promise<NewsEntry[]> {
  const stored: NewsEntry[] = (await listNews()).map((n) => ({
    slug: n.slug,
    title: n.title,
    date: n.date.split("-").reverse().join("."),
    html: n.html,
    image: n.image ? `/api/zdjecia/${n.image}` : undefined,
    local: true,
  }));
  const legacy: NewsEntry[] = legacyNews.map((n) => ({
    slug: n.slug,
    title: n.title,
    date: n.date,
    html: legacyHtml(n.content),
    image: n.images[0] ? legacyUrl(n.images[0]) : undefined,
    local: false,
  }));
  // sortowanie stabilne: przy tej samej dacie wpisy z panelu zostają przed starymi
  return [...stored, ...legacy].sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)));
}
