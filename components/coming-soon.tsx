import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

/*
 * Podstrona, której treść czeka na przeniesienie ze starej strony
 * (dump bazy) albo na przygotowanie przez parafię.
 */
export function ComingSoonPage({
  eyebrow,
  title,
  lead,
  children,
  links = [],
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
  links?: { href: string; label: string }[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />
      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        {children && <div className="space-y-5 text-[1.05rem] leading-8 text-ink-soft">{children}</div>}

        <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-dashed border-gold/50 bg-vellum p-10 text-center">
          <Image src="/logo/postac-lapis.png" alt="" width={72} height={72} className="h-16 w-16 opacity-80" />
          <div>
            <p className="font-display text-3xl font-semibold text-lapis">Treść w przygotowaniu</p>
            <p className="mt-2 text-ink-muted">Szczegółowe informacje pojawią się tu wkrótce. Do tego czasu zapraszamy do kontaktu.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-lapis px-6 py-3 text-sm font-bold text-gold-pale hover:bg-lapis-light"
            >
              <Phone size={16} /> Biuro parafialne: {site.phone}
            </a>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-2 rounded-full border border-lapis/25 px-6 py-3 text-sm font-semibold text-lapis hover:bg-parchment-deep"
              >
                {l.label} <ArrowRight size={15} />
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-muted">Telefonicznie w godzinach pracy biura: {site.officeHoursShort}</p>
        </div>
      </section>
    </>
  );
}
