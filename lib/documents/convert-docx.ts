import * as mammoth from "mammoth";
import sanitizeHtml from "sanitize-html";

export type ConvertedDocument = {
  html: string;
  warnings: string[];
};

export async function convertDocxToHtml(
  buffer: Buffer
): Promise<ConvertedDocument> {
  const result = await mammoth.convertToHtml(
    {
      buffer,
    },
    {
      /*
       * Chcemy strukturę dokumentu,
       * a nie dokładne odwzorowanie wyglądu Worda.
       *
       * Word może używać polskich albo angielskich
       * nazw stylów, dlatego obsługujemy oba warianty.
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

      /*
       * Nie pozwalamy dokumentowi na odwoływanie się
       * do zewnętrznych plików.
       */
      externalFileAccess: false,
    }
  );

  const cleanHtml = sanitizeHtml(result.value, {
    allowedTags: [
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",

      "p",

      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",

      "ul",
      "ol",
      "li",

      "br",
      "hr",

      "blockquote",

      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",

      "a",

      "sup",
      "sub",
    ],

    allowedAttributes: {
      a: ["href", "target", "rel"],

      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },

    allowedSchemes: [
      "http",
      "https",
      "mailto",
      "tel",
    ],

    transformTags: {
      a: sanitizeHtml.simpleTransform(
        "a",
        {
          target: "_blank",
          rel: "noopener noreferrer",
        },
        true
      ),
    },
  });

  return {
    html: cleanHtml,

    warnings: result.messages.map(
      (message) => message.message
    ),
  };
}