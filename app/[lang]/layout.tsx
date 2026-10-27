import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PolishOnlyNote } from "@/components/polish-only-note";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cormorant, manrope } from "@/lib/fonts";
import { foreignLocales, isForeignLocale } from "@/lib/i18n/config";
import { content } from "@/lib/i18n/content";
import { ui } from "@/lib/i18n/ui";
import "../globals.css";

/* Wersje obcojęzyczne: /en, /de, /es — każdy inny prefiks to 404 */
export const dynamicParams = false;
export const generateStaticParams = () => foreignLocales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isForeignLocale(lang)) return {};
  const t = content[lang].home;
  return {
    title: { default: t.metaTitle, template: `%s | ${ui[lang].parishShort}` },
    description: t.metaDescription,
    alternates: { languages: { pl: "/", en: "/en", de: "/de", es: "/es" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isForeignLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <SiteHeader lang={lang} />
        <main className="paper">
          {children}
          <PolishOnlyNote lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
