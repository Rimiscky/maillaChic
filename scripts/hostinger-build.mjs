import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

// Branche deploy/hostinger : GitHub Actions y publie une sortie .next déjà construite.
// Si l'hébergeur l'a conservée, on la réutilise ; s'il a nettoyé le dossier avant la
// compilation, on reconstruit à partir des sources publiées avec elle.
const buildId = path.join(process.cwd(), ".next", "BUILD_ID");

if (existsSync(buildId) && process.env.MAILA_FORCE_BUILD !== "1") {
  console.log("Sortie Next.js préconstruite par GitHub Actions trouvée : compilation ignorée.");
  process.exit(0);
}

console.log("Aucune sortie préconstruite : lancement de next build.");
const result = spawnSync("npx", ["next", "build"], { stdio: "inherit", shell: process.platform === "win32" });
process.exit(result.status ?? 1);
