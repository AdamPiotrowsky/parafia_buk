/*
 * Delikatnie rozmywa twarze na zdjęciu ołtarza fary (ochrona wizerunku osób na Mszy).
 * Uruchomienie: node scripts/rozmyj-twarze.mjs <wejście.jpg> <wyjście.jpg> [siła, domyślnie 1.3]
 * Miejsca twarzy dobrane ręcznie dla kadru 1600×1066 (fara-oltarz*.jpg).
 */
import sharp from "sharp";

sharp.cache(false);

const [input, output, strengthArg] = process.argv.slice(2);
// siła rozmycia (sigma) — małe twarze w tym kadrze wystarczy lekko zmiękczyć, żeby z daleka nie było śladu
const strength = Number(strengthArg ?? 1.3);
if (!input || !output) {
  console.error("Użycie: node scripts/rozmyj-twarze.mjs <wejście.jpg> <wyjście.jpg>");
  process.exit(1);
}

// [środek x, środek y, promień poziomy, promień pionowy]
const faces = [
  [778, 643, 15, 18], // ministrant za ołtarzem
  [570, 652, 15, 18], // kapłan po lewej
  [588, 656, 13, 16], // osoba obok
  [1030, 611, 15, 18], // biskup przy ambonie
  [1076, 640, 24, 20], // osoby za biskupem
  [146, 850, 30, 40], // kobieta z profilu na pierwszym planie
];

const { width, height } = await sharp(input).metadata();

// maska: białe elipsy z miękką krawędzią — rozmycie przechodzi płynnie w ostre zdjęcie
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="black"/>
  ${faces.map(([cx, cy, rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="white"/>`).join("\n  ")}
</svg>`;
const mask = await sharp(Buffer.from(svg)).blur(6).extractChannel(0).raw().toBuffer();

// dwa kroki: sharp wykonuje operacje w stałej kolejności, więc rozmycie i dołożenie maski muszą być osobno
const blurredRgb = await sharp(input).blur(strength).removeAlpha().raw().toBuffer();
const blurred = await sharp(blurredRgb, { raw: { width, height, channels: 3 } })
  .joinChannel(mask, { raw: { width, height, channels: 1 } })
  .png()
  .toBuffer();

await sharp(input)
  .composite([{ input: blurred }])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(output);

console.log(`Zapisano ${output}`);
