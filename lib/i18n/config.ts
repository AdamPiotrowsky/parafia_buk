/*
 * Wersje językowe strony.
 * Polski jest pod zwykłymi adresami (/sanktuarium), pozostałe języki pod prefiksem (/en/sanktuarium).
 * Ścieżki stron zostają polskie we wszystkich językach — przełącznik zamienia tylko prefiks.
 */
export const locales = ["pl", "en", "de", "es"] as const;
export type Locale = (typeof locales)[number];

export const foreignLocales = ["en", "de", "es"] as const;
export type ForeignLocale = (typeof foreignLocales)[number];

export const isForeignLocale = (value: string): value is ForeignLocale =>
  (foreignLocales as readonly string[]).includes(value);

export const localeNames: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
  es: "Español",
};

/* Strony, które mają już tłumaczenie — pozostałe prowadzą do strony głównej danego języka */
export const translatedPaths = ["", "/sanktuarium", "/koscioly", "/msze", "/sakramenty", "/swieci", "/swieci/rafal-chylinski", "/kontakt"];

/** Adres strony w danym języku: href("/msze", "en") → "/en/msze" */
export const href = (path: string, lang: Locale) => (lang === "pl" ? path || "/" : `/${lang}${path === "/" ? "" : path}`);

/** Zdejmuje prefiks języka: "/en/msze" → { lang: "en", path: "/msze" } */
export function splitPath(pathname: string): { lang: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isForeignLocale(first)) {
    const path = rest.length ? `/${rest.join("/")}` : "";
    return { lang: first, path };
  }
  return { lang: "pl", path: pathname === "/" ? "" : pathname };
}

/** Ten sam adres w innym języku — albo strona główna, jeśli tłumaczenia jeszcze nie ma */
export function switchLocalePath(pathname: string, target: Locale) {
  const { path } = splitPath(pathname);
  const base = path.split("#")[0];
  if (target === "pl") return base || "/";
  return translatedPaths.includes(base) ? href(base, target) : href("", target);
}
