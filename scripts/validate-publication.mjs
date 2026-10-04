const required = ["NEXT_PUBLIC_SITE_URL", "MAILA_SIGNUP_WEBHOOK_URL"];

// Domaines réservés (RFC 2606, RFC 6761), adresses locales et valeurs d'exemple de .env.example.
const reservedSuffixes = [".test", ".example", ".invalid", ".localhost", ".local", ".internal"];
const placeholderHosts = /(^|\.)(example\.(com|net|org|fr)|votre-domaine\.fr|votre-service-email\.fr)$/i;

function isForbiddenHost(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || (!host.includes(".") && !host.includes(":"))) return true;
  if (reservedSuffixes.some((suffix) => host.endsWith(suffix))) return true;
  if (placeholderHosts.test(host)) return true;
  // Adresses IP littérales : une publication doit utiliser un nom de domaine final.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(":")) return true;
  return false;
}

const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Configuration de publication manquante: ${missing.join(", ")}`);
  process.exit(1);
}

for (const name of required) {
  const value = process.env[name];
  let url;
  try {
    url = new URL(value);
  } catch {
    console.error(`${name} doit être une URL valide.`);
    process.exit(1);
  }
  if (url.protocol !== "https:" || isForbiddenHost(url.hostname)) {
    console.error(`${name} doit utiliser HTTPS et un domaine public final.`);
    process.exit(1);
  }
}

console.log("Configuration de publication valide.");
