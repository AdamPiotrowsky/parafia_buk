import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { legacyUrl } from "@/lib/legacy/assets";

export const metadata: Metadata = { title: "Gazetka parafialna „Nasza Wspólnota”" };

/* Wersje elektroniczne czasopisma parafialnego „Nasza Wspólnota” (ze starej strony) */
const issues = [
  { date: "10 maja 2026", file: "/uploads/others/gazetka10.5.2026_bc97e5ca6ad0d38a1c81172276370603.pdf" },
  { date: "26 kwietnia 2026", file: "/uploads/others/gazetka26.4.2026_cce4add0439589376798a2e2324fb65b.pdf" },
  { date: "19 kwietnia 2026", file: "/uploads/others/gazetka19.4.2026_6d2d93f050ab3e5c5713e86c91bc6f4c.pdf" },
];

export default function GazetkaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Czasopismo parafialne"
        title="„Nasza Wspólnota”"
        lead="Gazetka parafialna w wersji elektronicznej — do przeczytania online lub pobrania."
      />
      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <ul className="space-y-4">
          {issues.map((i, n) => (
            <li key={i.file}>
              <a
                href={legacyUrl(i.file)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-line bg-vellum p-6 transition hover:border-gold/60"
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${n === 0 ? "bg-lapis text-gold-light" : "bg-parchment-deep text-lapis"}`}>
                  <FileText size={26} strokeWidth={1.5} />
                </span>
                <span className="flex-1">
                  {n === 0 && <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gold">Najnowszy numer</span>}
                  <span className="block font-display text-2xl font-semibold text-lapis">„Nasza Wspólnota” — {i.date}</span>
                  <span className="text-sm text-ink-muted">PDF · otwiera się w nowej karcie</span>
                </span>
                <Download size={20} className="text-gold transition group-hover:translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
