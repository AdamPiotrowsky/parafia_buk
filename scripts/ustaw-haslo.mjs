/*
 * Ustawia (albo zmienia) hasło do panelu administracyjnego.
 *
 *   npm run admin:haslo
 *
 * Zapisuje skrót hasła w data/admin.json — ten sam format co lib/admin/auth.ts.
 * Hasło można też później zmienić w samym panelu (zakładka „Hasło”).
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const password = (await rl.question("Nowe hasło do panelu (min. 10 znaków): ")).trim();
rl.close();

if (password.length < 10) {
  console.error("Hasło jest za krótkie — podaj co najmniej 10 znaków.");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const config = {
  salt,
  hash: crypto.scryptSync(password, salt, 64).toString("hex"),
  secret: crypto.randomBytes(32).toString("hex"),
};

const file = path.join(process.cwd(), "data", "admin.json");
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, JSON.stringify(config, null, 1));
console.log("Hasło zapisane. Wszystkie wcześniejsze sesje zostały wylogowane.");
