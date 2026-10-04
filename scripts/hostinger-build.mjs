import { spawnSync } from "node:child_process";
import { cpSync, existsSync } from "node:fs";
import path from "node:path";

// Hostinger (application Node.js) attend un serveur Next.js autonome dans .next/standalone.
// GitHub Actions le construit et le publie sur deploy/hostinger : s'il est présent, on le
// réutilise ; sinon on reconstruit à partir des sources publiées avec lui.
const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");
const server = path.join(standalone, "server.js");

if (existsSync(server) && process.env.MAILA_FORCE_BUILD !== "1") {
  console.log("Serveur Next.js autonome préconstruit trouvé : compilation ignorée.");
} else {
  console.log("Aucun serveur autonome préconstruit : lancement de next build.");
  const result = spawnSync("npx", ["next", "build"], { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
  if (!existsSync(server)) {
    console.error("next build n'a pas produit .next/standalone/server.js : vérifier output: \"standalone\".");
    process.exit(1);
  }
}

// Le serveur autonome ne copie ni .next/static ni public : il les sert s'ils sont placés à côté de lui.
cpSync(path.join(root, ".next", "static"), path.join(standalone, ".next", "static"), { recursive: true, force: true });
if (existsSync(path.join(root, "public"))) {
  cpSync(path.join(root, "public"), path.join(standalone, "public"), { recursive: true, force: true });
}
console.log("Fichiers statiques copiés dans .next/standalone.");
