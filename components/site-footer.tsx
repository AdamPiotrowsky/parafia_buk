import Image from "next/image";
import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { flatNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="lapis-sky pb-24 text-gold-pale/80 sm:pb-0">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo/logo-gold.png" alt="Logo Sanktuarium Matki Bożej Bukowskiej Literackiej" width={128} height={128} className="h-32 w-32" />
            <p className="mt-5 font-display text-3xl font-semibold leading-tight text-gold-pale">
              Sanktuarium Matki Bożej
              <br />
              Bukowskiej Literackiej
            </p>
            <p className="mt-3 text-sm leading-6">
              {site.parish}
              <br />
              {site.diocese}
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-light">Adres</p>
            <p className="mt-4 text-sm leading-7">
              {site.address.street}
              <br />
              {site.address.city}
            </p>
            <a href={site.links.map} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-gold-light underline-offset-4 hover:underline">
              Pokaż na mapie
            </a>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-light">Biuro parafialne</p>
            <p className="mt-4 text-sm leading-7">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold-pale">tel. {site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-gold-pale">{site.email}</a>
            </p>
            <ul className="mt-3 space-y-1 text-xs leading-5 text-gold-pale/60">
              {site.officeHours.map((o) => (
                <li key={o.days}>{o.days}: {o.hours}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-light">Ofiary na sanktuarium</p>
            <p className="mt-4 font-mono text-[0.8rem] leading-6 text-gold-pale">{site.bankAccount}</p>
            <CopyButton value={site.bankAccount.replace(/\s/g, "")} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-gold/20 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[...flatNav.filter((l) => !l.href.startsWith("http")), { label: "Intencje", href: "/intencje" }].map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold-pale">{item.label}</Link>
            ))}
          </nav>
          <p className="text-xs text-gold-pale/50">© {new Date().getFullYear()} {site.parish}</p>
        </div>
      </div>
    </footer>
  );
}
