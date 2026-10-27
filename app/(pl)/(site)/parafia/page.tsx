import { redirect } from "next/navigation";

/* Dawna strona „Życie parafii” — menu „Parafia” prowadzi teraz bezpośrednio do podstron */
export default function ParafiaPage() {
  redirect("/parafia/wspolnoty");
}
