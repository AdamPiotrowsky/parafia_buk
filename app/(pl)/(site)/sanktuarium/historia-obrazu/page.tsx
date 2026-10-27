import { redirect } from "next/navigation";

/* Historia obrazu jest teraz częścią strony Sanktuarium */
export default function HistoriaObrazuPage() {
  redirect("/sanktuarium#historia");
}
