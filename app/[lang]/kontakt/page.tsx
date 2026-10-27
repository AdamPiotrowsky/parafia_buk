import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { PageHeader } from "@/components/page-header";
import type { ForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import { ui } from "@/lib/i18n/ui";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/kontakt">): Promise<Metadata> {
  return { title: content[(await params).lang as ForeignLocale].contact.metaTitle };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/kontakt">) {
  const lang = (await params).lang as ForeignLocale;
  const t = content[lang].contact;
  const u = ui[lang];
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent("ul. Mury 30, 64-320 Buk")}&z=16&output=embed&hl=${lang}`;

  return (
    <>
      <PageHeader eyebrow={u.diocese} title={t.title} lead={u.parishFull} />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-vellum p-8">
            <div className="flex items-center gap-3 text-gold">
              <Clock size={22} strokeWidth={1.6} />
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em]">{u.footer.office}</p>
            </div>
            <dl className="mt-6 divide-y divide-line">
              {u.officeHours.map((o) => (
                <div key={o.days} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                  <dt className="text-ink-soft first-letter:uppercase">{o.days}</dt>
                  <dd className="font-display text-2xl font-semibold tabular-nums text-lapis">{o.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a href={`tel:+48${site.phone.replace(/\s/g, "")}`} className="rounded-2xl bg-lapis p-6 text-gold-pale transition hover:bg-lapis-light">
              <Phone size={22} className="text-gold-light" />
              <p className="mt-4 font-display text-3xl font-semibold">+48 {site.phone}</p>
              <p className="text-sm text-gold-pale/70">{t.call}</p>
            </a>
            <a href={`mailto:${site.email}`} className="rounded-2xl border border-line bg-vellum p-6 transition hover:border-gold/60">
              <Mail size={22} className="text-gold" />
              <p className="mt-4 break-all font-display text-2xl font-semibold text-lapis">{site.email}</p>
              <p className="text-sm text-ink-muted">{t.write}</p>
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-vellum p-8">
            <div className="flex items-center gap-3 text-gold">
              <MapPin size={22} strokeWidth={1.6} />
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em]">{u.footer.address}</p>
            </div>
            <p className="mt-4 font-display text-3xl font-semibold text-lapis">{site.address.street}</p>
            <p className="text-lg text-ink-soft">{site.address.city}, Polska</p>
            <p className="mt-6 text-[0.72rem] font-bold uppercase tracking-[0.25em] text-gold">{t.account}</p>
            <p className="mt-2 font-mono text-lg text-ink">PL {site.bankAccount}</p>
            <CopyButton value={`PL${site.bankAccount.replace(/\s/g, "")}`} label={u.footer.copyAccount} copiedLabel={u.footer.copied} tone="light" />
          </div>
        </div>

        <div className="min-h-[24rem] overflow-hidden rounded-2xl border border-line">
          <iframe
            src={mapSrc}
            title={t.mapTitle}
            className="h-full min-h-[24rem] w-full grayscale-[30%] sepia-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
