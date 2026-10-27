import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ForeignLocale } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";

/* Na końcu każdej strony obcojęzycznej: ogłoszenia, intencje i aktualności są po polsku */
export function PolishOnlyNote({ lang }: { lang: ForeignLocale }) {
  const note = ui[lang].polishOnly;
  if (!note) return null;

  return (
    <section className="border-t border-line bg-vellum">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold text-lapis">{note.title}</p>
          <p className="mt-1 max-w-xl text-ink-soft">{note.text}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {note.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              hrefLang="pl"
              className="inline-flex items-center gap-1 rounded-full border border-lapis/25 px-4 py-2 text-sm font-semibold text-lapis hover:bg-parchment-deep"
            >
              {l.label} <span className="text-xs text-ink-muted">(PL)</span>
              <ArrowUpRight size={14} className="text-gold" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
