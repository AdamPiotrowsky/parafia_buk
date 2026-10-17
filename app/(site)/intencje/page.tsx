import type { Metadata } from "next";

import { AsideLink, BulletinView } from "@/components/bulletin-view";
import { PageHeader } from "@/components/page-header";
import { currentIntentions } from "@/lib/bulletins";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Intencje mszalne" };

export default function IntencjePage() {
  return (
    <>
      <PageHeader eyebrow="Bieżący tydzień" title="Intencje mszalne" />
      <BulletinView
        bulletin={currentIntentions}
        aside={
          <>
            <AsideLink href="/kontakt" title="Zamów Mszę" text="Intencje przyjmuje kancelaria parafialna" />
            <AsideLink href={site.links.petitions} title="Prośby do Matki Bożej" text="Odczytywane w czwartki" />
          </>
        }
      />
    </>
  );
}
