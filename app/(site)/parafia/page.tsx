import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Baby, CalendarDays, HeartHandshake, Newspaper, Shield, Sparkles, Users } from "lucide-react";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Parafia" };

/*
 * Treści tych działów są do przeniesienia z dotychczasowej strony
 * (dump bazy SQL). Karty pokazują docelowy układ.
 */
const sections = [
  { icon: Baby, title: "Msze i sakramenty", text: "Chrzest, bierzmowanie, spowiedź, namaszczenie chorych, małżeństwo — co przygotować i kiedy przyjść.", href: "/msze" },
  { icon: Sparkles, title: "Bierzmowanie", text: "Spotkania, terminy i informacje dla kandydatów oraz rodziców.", href: "/bierzmowanie" },
  { icon: Users, title: "Wspólnoty", text: "Róże różańcowe, ministranci, chórek i grupy działające przy parafii.", href: "/parafia/wspolnoty" },
  { icon: CalendarDays, title: "Plan kolędy", text: "Kolejność odwiedzin duszpasterskich w ulicach i wsiach parafii." },
  { icon: HeartHandshake, title: "Duszpasterze", text: "Kapłani i osoby posługujące w parafii.", href: "/parafia/duszpasterze" },
  { icon: Shield, title: "Ochrona dzieci", text: "Standardy ochrony dzieci i młodzieży obowiązujące w parafii.", href: "/parafia/ochrona-dzieci" },
  { icon: Newspaper, title: "Gazetka parafialna", text: "Kolejne numery gazetki do przeczytania i pobrania.", href: "/gazetka" },
];

export default function ParafiaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Parafia pw. św. Stanisława BM"
        title="Życie parafii"
        lead="Sakramenty, wspólnoty i wszystko, czego potrzebujesz na co dzień."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {sections.map(({ icon: Icon, title, text, href }) => {
          const body = (
            <>
              <Icon className="text-gold" size={28} strokeWidth={1.4} />
              <h2 className="mt-5 font-display text-3xl font-semibold text-lapis">{title}</h2>
              <p className="mt-2 flex-1 leading-7 text-ink-soft">{text}</p>
              {href ? (
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-lapis">
                  Zobacz <ArrowRight size={15} />
                </span>
              ) : (
                <span className="mt-5 text-xs uppercase tracking-[0.18em] text-ink-muted">wkrótce</span>
              )}
            </>
          );
          const cls = "flex flex-col rounded-2xl border border-line bg-vellum p-8 transition";
          return href ? (
            <Link key={title} href={href} className={`${cls} hover:-translate-y-1 hover:border-gold/60`}>{body}</Link>
          ) : (
            <div key={title} className={cls}>{body}</div>
          );
        })}
      </section>
    </>
  );
}
