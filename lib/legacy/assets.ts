import fs from "node:fs";
import path from "node:path";

/*
 * Pliki ze starej strony (zdjęcia z galerii, plakaty, PDF-y gazetki) mają ścieżki /uploads/...
 * Dopóki folder `uploads` z kopii starej strony nie zostanie wgrany do public/uploads,
 * pobieramy je ze starej domeny. Po wgraniu — automatycznie z nowej strony.
 */
const LEGACY_ORIGIN = "https://sanktuarium-buk.pl";
const hasLocalUploads = fs.existsSync(path.join(process.cwd(), "public", "uploads"));

export function legacyUrl(p: string) {
  return hasLocalUploads ? p : `${LEGACY_ORIGIN}${p}`;
}

export function legacyHtml(html: string) {
  return hasLocalUploads ? html : html.replace(/(src|href)="\/uploads\//g, `$1="${LEGACY_ORIGIN}/uploads/`);
}
