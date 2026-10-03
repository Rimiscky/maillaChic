const required = ["NEXT_PUBLIC_SITE_URL", "MAILA_SIGNUP_WEBHOOK_URL"];
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
  const forbidden = /^(localhost|127\.0\.0\.1|example\.(?:com|invalid)|.+\.test)$/i.test(url.hostname);
  if (url.protocol !== "https:" || forbidden) {
    console.error(`${name} doit utiliser HTTPS et un domaine public final.`);
    process.exit(1);
  }
}

console.log("Configuration de publication valide.");
