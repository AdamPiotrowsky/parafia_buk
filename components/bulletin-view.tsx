import { ArrowUpRight } from "lucide-react";

import { DocumentContent } from "@/components/documents/document-content";
import type { Bulletin } from "@/lib/bulletins";

export function BulletinView({
  bulletin,
  aside,
}: {
  bulletin: Bulletin;
  aside?: React.ReactNode;
}) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_20rem] lg:px-8">
      <article className="rounded-2xl border border-line bg-vellum p-6 shadow-[0_30px_60px_-45px_rgba(16,29,59,0.5)] sm:p-12">
        <header className="mb-8 border-b border-line pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-gold">{bulletin.dateLabel}</p>
            {bulletin.sample && (
              <span className="rounded-full bg-wine/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-wine">
                przykładowa treść
              </span>
            )}
          </div>
          <h2 className="mt-2 font-display text-4xl font-semibold text-lapis">{bulletin.title}</h2>
        </header>
        <DocumentContent html={bulletin.html} />
      </article>

      <aside className="space-y-4 lg:sticky lg:top-40 lg:self-start">
        {aside}
        <PrintHint />
      </aside>
    </section>
  );
}

function PrintHint() {
  return (
    <div className="rounded-2xl border border-line p-6 text-sm leading-6 text-ink-muted">
      Treść publikowana jest co tydzień. Pytania? Zadzwoń do biura parafialnego: <br />
      <a href="tel:618140141" className="font-semibold text-lapis">61 8140 141</a>
    </div>
  );
}

export function AsideLink({ href, title, text }: { href: string; title: string; text: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block rounded-2xl bg-lapis p-6 text-gold-pale transition hover:bg-lapis-light"
    >
      <p className="flex items-center justify-between font-display text-2xl font-semibold">
        {title}
        <ArrowUpRight size={18} className="text-gold-light transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </p>
      <p className="mt-1 text-sm text-gold-pale/70">{text}</p>
    </a>
  );
}
