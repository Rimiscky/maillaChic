const WINDOW_MS = 15 * 60 * 1_000;
const DUPLICATE_MS = 10 * 60 * 1_000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 10_000;

const origins = new Map<string, { count: number; resetAt: number }>();
const emails = new Map<string, number>();

export class SignupAbuseError extends Error {}

// Les Map conservent l'ordre d'insertion : on évince les entrées les plus anciennes
// au lieu de tout vider, sinon un flot de clés suffirait à réinitialiser la limite.
function evictOldest<K, V>(map: Map<K, V>) {
  for (const key of map.keys()) {
    if (map.size <= MAX_TRACKED_KEYS) return;
    map.delete(key);
  }
}

function prune(now: number) {
  for (const [key, value] of origins) if (value.resetAt <= now) origins.delete(key);
  for (const [key, expiresAt] of emails) if (expiresAt <= now) emails.delete(key);
  evictOldest(origins);
  evictOldest(emails);
}

/**
 * Compte la tentative pour l'origine puis indique si l'adresse vient déjà d'être reçue.
 * Un doublon n'est pas signalé au visiteur, pour ne pas révéler qu'une adresse est inscrite.
 */
export function enforceSignupRateLimit(origin: string, email: string, now = Date.now()): { duplicate: boolean } {
  prune(now);
  const current = origins.get(origin);
  if (current && current.resetAt > now && current.count >= MAX_REQUESTS) {
    throw new SignupAbuseError("Trop de tentatives. Merci de réessayer plus tard.");
  }

  origins.delete(origin);
  origins.set(origin, current && current.resetAt > now
    ? { count: current.count + 1, resetAt: current.resetAt }
    : { count: 1, resetAt: now + WINDOW_MS });

  const duplicateUntil = emails.get(email);
  if (duplicateUntil && duplicateUntil > now) return { duplicate: true };
  emails.set(email, now + DUPLICATE_MS);
  return { duplicate: false };
}

export function releaseSignupEmail(email: string) {
  emails.delete(email);
}

export function resetSignupProtectionForTests() {
  origins.clear();
  emails.clear();
}
