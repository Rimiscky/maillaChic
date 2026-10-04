import { NextResponse } from "next/server";
import { enforceSignupRateLimit, releaseSignupEmail, SignupAbuseError } from "@/lib/signup-protection";
import { parseSignup, saveSignup, signupConfiguration, SignupValidationError } from "@/lib/signup";

const MAX_BODY_BYTES = 8_192;
const SUCCESS_MESSAGE = "Votre inscription est enregistrée.";

// x-real-ip est fixé par l'hébergeur. À défaut, la dernière entrée de x-forwarded-for est celle
// ajoutée par le proxy le plus proche : les premières peuvent être choisies librement par le client.
function clientAddress(headers: Headers) {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return headers.get("x-forwarded-for")?.split(",").map((part) => part.trim()).filter(Boolean).at(-1) ?? "unknown";
}

function publicError(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return publicError("La requête est trop volumineuse.", 413);

  let input: unknown;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) return publicError("La requête est trop volumineuse.", 413);
    input = JSON.parse(raw);
  } catch {
    return publicError("Le formulaire envoyé n'est pas valide.", 400);
  }

  try {
    const signup = parseSignup(input);
    if (!signupConfiguration().enabled) throw new Error("signup_unconfigured");
    const agent = request.headers.get("user-agent")?.slice(0, 64) ?? "unknown";
    const { duplicate } = enforceSignupRateLimit(`${clientAddress(request.headers)}|${agent}`, signup.email);
    // Même réponse qu'une première inscription : le formulaire ne révèle pas qui est déjà inscrit.
    if (duplicate) return NextResponse.json({ message: SUCCESS_MESSAGE }, { status: 201 });
    try {
      await saveSignup(signup);
    } catch (error) {
      // Un échec d'enregistrement ne doit pas bloquer une nouvelle tentative avec la même adresse.
      releaseSignupEmail(signup.email);
      throw error;
    }
    return NextResponse.json({ message: SUCCESS_MESSAGE }, { status: 201 });
  } catch (error) {
    if (error instanceof SignupValidationError) return publicError(error.message, 400);
    if (error instanceof SignupAbuseError) return publicError(error.message, 429);
    console.error("signup_error", error instanceof Error ? error.name : "unknown");
    return publicError("L'inscription n'est pas disponible pour le moment.", 503);
  }
}
