import { createHash } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const allowedInterests = new Set(["collection", "matieres", "coulisses"]);

export type Signup = { email: string; consent: true; interests: string[] };
type SignupEnvironment = Partial<Record<"NODE_ENV" | "MAILA_SIGNUP_WEBHOOK_URL" | "MAILA_SIGNUP_WEBHOOK_TOKEN" | "MAILA_SUBSCRIBERS_FILE", string>>;

export class SignupValidationError extends Error {}

export function parseSignup(input: unknown): Signup {
  if (!input || typeof input !== "object") throw new SignupValidationError("Requête invalide.");
  const value = input as Record<string, unknown>;
  if (typeof value.company === "string" && value.company.trim()) throw new SignupValidationError("Requête refusée.");
  if (value.consent !== true) throw new SignupValidationError("Le consentement est requis.");
  if (typeof value.email !== "string") throw new SignupValidationError("Une adresse e-mail valide est requise.");
  const email = value.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email)) {
    throw new SignupValidationError("Cette adresse e-mail n'est pas valide.");
  }
  const interests = Array.isArray(value.interests)
    ? [...new Set(value.interests.filter((item): item is string => typeof item === "string" && allowedInterests.has(item)))]
    : [];
  return { email, consent: true, interests };
}

export function signupConfiguration(env: SignupEnvironment = process.env) {
  if (env.MAILA_SIGNUP_WEBHOOK_URL) return { enabled: true, mode: "webhook" as const };
  if (env.NODE_ENV !== "production") return { enabled: true, mode: "local" as const };
  return { enabled: false, mode: "unconfigured" as const };
}

export async function saveSignup(signup: Signup, env: SignupEnvironment = process.env) {
  const config = signupConfiguration(env);
  const record = { ...signup, consentedAt: new Date().toISOString(), source: "mailachic-v1" };

  if (config.mode === "webhook") {
    const url = new URL(env.MAILA_SIGNUP_WEBHOOK_URL!);
    if (url.protocol !== "https:") throw new Error("Le service d'inscription doit utiliser HTTPS.");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-idempotency-key": createHash("sha256").update(signup.email).digest("hex"),
        ...(env.MAILA_SIGNUP_WEBHOOK_TOKEN ? { authorization: `Bearer ${env.MAILA_SIGNUP_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(7_000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Le service d'inscription est momentanément indisponible.");
    return;
  }

  if (config.mode === "local") {
    const file = env.MAILA_SUBSCRIBERS_FILE ?? path.join(process.cwd(), ".data", "subscribers.ndjson");
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(file, `${JSON.stringify(record)}\n`, { encoding: "utf8", mode: 0o600 });
    return;
  }

  throw new Error("L'inscription sera activée avant la publication du site.");
}
