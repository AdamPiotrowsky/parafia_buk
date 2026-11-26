import * as mammoth from "mammoth";
import sanitizeHtml from "sanitize-html";

export type ConvertedDocument = {
  html: string;
  /* Pierwszy krótki akapit lub nagłówek dokumentu — podpowiedź tytułu (usunięty z html) */
  title: string;
  /* Data znaleziona w tytule, np. „12 października 2026” albo „12.10.2026” */
  dateLabel: string;
  warnings: string[];
};

/*
 * Bezpieczny HTML treści — tylko struktura (nagłówki, akapity, listy, tabele, linki),
 * bez stylów, skryptów i obrazków. Używany przy imporcie z Worda i przy zapisie z edytora.
 */
export function sanitizeContent(html: string) {
  const clean = sanitizeHtml(html, {
    allowedTags: [
      "h2", "h3", "h4",
      "p", "br", "hr", "blockquote",
      "strong", "b", "em", "i", "u", "s", "sup", "sub",
      "ul", "ol", "li",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td",
      "a",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      // nagłówek 1 z edytora → h2 (h1 jest tytułem strony)
      h1: "h2",
      div: "p",
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }, true),
    },
    exclusiveFilter: (frame) =>
      // puste akapity z Worda (same spacje / &nbsp;) tylko rozpychają treść
      frame.tag === "p" && !frame.text.replace(/ /g, " ").trim() && !frame.mediaChildren.length,
  })
    .replace(/(<br \/>\s*){3,}/g, "<br /><br />")
    .trim();
  // pierwsza linijka wpisana w edytorze bywa „gołym” tekstem, bez akapitu
  const firstBlock = clean.search(/<(h[2-4]|p|ul|ol|table|blockquote|hr)\b/);
  if (firstBlock === 0 || !clean) return clean;
  const lead = firstBlock < 0 ? clean : clean.slice(0, firstBlock);
  return lead.trim() ? `<p>${lead.trim()}</p>${clean.slice(lead.length)}` : clean.slice(lead.length);
}

const plain = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const months =
  "stycznia|lutego|marca|kwietnia|maja|czerwca|lipca|sierpnia|września|października|listopada|grudnia";

export function findDateLabel(text: string) {
  const m =
    text.match(new RegExp(`\\d{1,2}(?:\\s*[–-]\\s*\\d{1,2})?\\s+(?:${months})(?:\\s+\\d{4})?`, "i")) ??
    text.match(/\d{1,2}\.\d{1,2}(?:\.\d{4})?(?:\s*[–-]\s*\d{1,2}\.\d{1,2}\.\d{4})?/);
  return m?.[0] ?? "";
}

export async function convertDocxToHtml(buffer: Buffer): Promise<ConvertedDocument> {
  const result = await mammoth.convertToHtml(
    { buffer },
    {
      /*
       * Chcemy strukturę dokumentu, a nie dokładne odwzorowanie wyglądu Worda.
       * Word może używać polskich albo angielskich nazw stylów, dlatego obsługujemy oba warianty.
       */
      styleMap: [
        "p[style-name='Tytuł'] => h2:fresh",
        "p[style-name='Title'] => h2:fresh",
        "p[style-name='Nagłówek 1'] => h2:fresh",
        "p[style-name='Heading 1'] => h2:fresh",
        "p[style-name='Nagłówek 2'] => h3:fresh",
        "p[style-name='Heading 2'] => h3:fresh",
        "p[style-name='Nagłówek 3'] => h4:fresh",
        "p[style-name='Heading 3'] => h4:fresh",
      ],
      includeDefaultStyleMap: true,
      // obrazki pomijamy — dokument nie może też sięgać do zewnętrznych plików
      convertImage: mammoth.images.imgElement(() => Promise.resolve({ src: "" })),
      externalFileAccess: false,
    }
  );

  let html = sanitizeContent(result.value);

  // Pierwszy blok (nagłówek albo krótki akapit, np. „OGŁOSZENIA – XXVIII Niedziela Zwykła”) to tytuł
  let title = "";
  const first = html.match(/^<(h[2-4]|p)>([\s\S]*?)<\/\1>/);
  if (first && plain(first[2]).length <= 140) {
    title = plain(first[2]);
    html = html.slice(first[0].length).trim();
  }

  // „OGŁOSZENIA DUSZPASTERSKIE – Uroczystość Chrystusa Króla, 22 listopada 2026”
  //   → tytuł „Uroczystość Chrystusa Króla”, data „22 listopada 2026” (nagłówek strony i tak mówi, co to jest)
  const dateLabel = findDateLabel(title);
  const shortTitle = title
    .replace(dateLabel, "")
    .replace(/^\s*(ogłoszenia(\s+(duszpasterskie|parafialne))?|intencje(\s+mszalne)?)\b[\s:–-]*/i, "")
    .replace(/[\s,–-]+$/, "")
    .trim();
  // sam „INTENCJE MSZALNE 23 – 29 listopada” → bez tytułu; formularz zostawi domyślny
  title = shortTitle;

  return {
    html,
    title,
    dateLabel,
    warnings: result.messages.map((m) => m.message),
  };
}
