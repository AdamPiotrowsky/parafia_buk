import type { Metadata } from "next";
import { CalendarDays, Phone } from "lucide-react";

import { Eyebrow } from "@/components/ornament";
import { PageHeader } from "@/components/page-header";
import { communities, communityGroups } from "@/lib/communities";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Wspólnoty parafialne" };

export default function WspolnotyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Parafia"
        title="Wspólnoty parafialne"
        lead={`${communities.length} wspólnot modlitwy, formacji i posługi. Każdy znajdzie tu swoje miejsce — zapraszamy!`}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <nav className="mb-12 flex flex-wrap gap-2" aria-label="Rodzaje wspólnot">
          {communityGroups.map((g) => (
            <a key={g.id} href={`#${g.id.replace(/\s/g, "-")}`} className="rounded-full border border-lapis/20 px-4 py-2 text-sm font-semibold text-lapis hover:bg-parchment-deep">
              {g.label}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {communityGroups.map((g) => (
            <div key={g.id} id={g.id.replace(/\s/g, "-")} className="scroll-mt-32">
              <Eyebrow>{g.label}</Eyebrow>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {communities
                  .filter((c) => c.group === g.id)
                  .map((c) => (
                    <article key={c.slug} id={c.slug} className="flex scroll-mt-32 flex-col rounded-2xl border border-line bg-vellum p-7">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-3xl font-semibold leading-tight text-lapis">{c.name}</h2>
                        {c.since && <span className="shrink-0 rounded-full bg-parchment-deep px-3 py-1 text-xs font-semibold text-ink-muted">od {c.since}</span>}
                      </div>
                      {c.summary ? (
                        <p className="mt-4 leading-7 text-ink-soft">{c.summary}</p>
                      ) : (
                        <p className="mt-4 leading-7 text-ink-muted">Zapraszamy do wspólnoty — szczegóły spotkań przekaże biuro parafialne.</p>
                      )}
                      {c.details && (
                        <ul className="mt-3 space-y-1.5 text-[0.95rem] leading-6 text-ink-soft">
                          {c.details.map((d) => (
                            <li key={d} className="flex gap-3">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                              {d}
                            </li>
                          ))}
                        </ul>
                      )}
                      {(c.meetings || c.contact) && (
                        <div className="mt-auto space-y-1 pt-5 text-sm text-ink-muted">
                          {c.meetings && (
                            <p className="flex items-center gap-2">
                              <CalendarDays size={15} className="text-gold" /> Spotkania: {c.meetings}
                            </p>
                          )}
                          {c.contact && <p>{c.contact}</p>}
                        </div>
                      )}
                    </article>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-16 flex items-center justify-center gap-3 rounded-2xl bg-lapis p-6 text-gold-pale hover:bg-lapis-light">
          <Phone size={20} />
          <span>
            Chcesz dołączyć? Biuro parafialne: <strong className="font-display text-2xl">{site.phone}</strong>
          </span>
        </a>
      </section>
    </>
  );
}
