import { ParishHero } from "@/components/home/home-layout";
import { Sg1Body } from "@/components/home/sg1";
import { plHome } from "@/lib/home";

/* Propozycja 10 — strona główna: wyraźny ołtarz z granatową tablicą, niżej panel na skróty i treści z SG1 */
export function HomeSg10() {
  return (
    <>
      <ParishHero hero={plHome.hero} />
      <Sg1Body />
    </>
  );
}
