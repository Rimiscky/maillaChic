const WINDOW_MS = 15 * 60 * 1_000;
const DUPLICATE_MS = 10 * 60 * 1_000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 10_000;

const origins = new Map<string, { count: number; resetAt: number }>();
const emails = new Map<string, number>();

export class SignupAbuseError extends Error {}

function prune(now: number) {
  for (const [key, value] of origins) if (value.resetAt <= now) origins.delete(key);
  for (const [key, expiresAt] of emails) if (expiresAt <= now) emails.delete(key);
  if (origins.size > MAX_TRACKED_KEYS || emails.size > MAX_TRACKED_KEYS) {
    origins.clear();
    emails.clear();
  }
}

export function enforceSignupRateLimit(origin: string, email: string, now = Date.now()) {
  prune(now);
  const duplicateUntil = emails.get(email);
  if (duplicateUntil && duplicateUntil > now) throw new SignupAbuseError("Cette adresse est déjà enregistrée. Réessayez plus tard.");

  const current = origins.get(origin);
  if (current && current.resetAt > now && current.count >= MAX_REQUESTS) {
    throw new SignupAbuseError("Trop de tentatives. Merci de réessayer plus tard.");
  }

  origins.set(origin, current && current.resetAt > now
    ? { count: current.count + 1, resetAt: current.resetAt }
    : { count: 1, resetAt: now + WINDOW_MS });
  emails.set(email, now + DUPLICATE_MS);
}

export function resetSignupProtectionForTests() {
  origins.clear();
  emails.clear();
}
