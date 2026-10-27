import Image from "next/image";
import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { FacebookIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { type Locale } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";
import { site } from "@/lib/site";

export function SiteFooter({ lang = "pl" }: { lang?: Locale }) {
  const t = ui[lang];
  const links = t.nav.flatMap((item) => (item.children ? item.children : [item]));
  return (
    <footer className="lapis-sky pb-24 text-gold-pale/80 sm:pb-0">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo/logo-gold.png" alt={t.footer.logoAlt} width={128} height={128} className="h-32 w-32" />
            <p className="mt-5 font-display text-3xl font-semibold leading-tight text-gold-pale">{t.parishShort}</p>
            <p className="mt-1 font-display text-xl italic leading-snug text-gold-light">{t.sanctuary}</p>
            <p className="mt-3 text-sm leading-6">
              {t.parishFull}
              <br />
              {t.diocese}
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-light">{t.footer.address}</p>
            <p className="mt-4 text-sm leading-7">
              {site.address.street}
              <br />
              {site.address.city}
            </p>
            <a href={site.links.map} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-gold-light underline-offset-4 hover:underline">
              {t.footer.showMap}
            </a>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-light">{t.footer.office}</p>
            <p className="mt-4 text-sm leading-7">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold-pale">tel. {site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-gold-pale">{site.email}</a>
            </p>
            <p className="mt-3 text-xs font-semibold text-gold-pale/70">{t.footer.callHours}</p>
            <ul className="mt-1 space-y-1 text-xs leading-5 text-gold-pale/60">
              {t.officeHours.map((o) => (
                <li key={o.days}>{o.days}: {o.hours}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-light">{t.footer.offerings}</p>
            <p className="mt-4 font-mono text-[0.8rem] leading-6 text-gold-pale">{site.bankAccount}</p>
            <CopyButton value={site.bankAccount.replace(/\s/g, "")} label={t.footer.copyAccount} copiedLabel={t.footer.copied} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-gold/20 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.filter((l) => !l.href.startsWith("http")).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold-pale">{item.label}</Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={site.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-gold-pale"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-light/15 text-gold-pale">
                <FacebookIcon size={15} />
              </span>
              Facebook
            </a>
            <LanguageSwitcher lang={lang} label={t.languageLabel} className="[&_svg]:h-4 [&_svg]:w-6" />
            <p className="text-xs text-gold-pale/50">© {new Date().getFullYear()} {t.parishFull}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
