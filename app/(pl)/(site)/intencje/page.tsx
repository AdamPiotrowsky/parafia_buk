import type { Metadata } from "next";

import { AsideLink, BulletinView } from "@/components/bulletin-view";
import { PageHeader } from "@/components/page-header";
import { currentIntentions } from "@/lib/bulletins";

export const metadata: Metadata = { title: "Intencje mszalne" };

export default function IntencjePage() {
  return (
    <>
      <PageHeader eyebrow="Bieżący tydzień" title="Intencje mszalne" />
      <BulletinView
        bulletin={currentIntentions}
        aside={
          <>
            <AsideLink href="/ogloszenia" title="Ogłoszenia" text="Ogłoszenia duszpasterskie na ten tydzień" />
            <AsideLink href="/kontakt" title="Biuro parafialne" text="Zamów Mszę Świętą w swojej intencji" />
          </>
        }
      />
    </>
  );
}
