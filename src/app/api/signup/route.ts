import { NextResponse } from "next/server";
import { enforceSignupRateLimit, releaseSignupEmail, SignupAbuseError } from "@/lib/signup-protection";
import { parseSignup, saveSignup, signupConfiguration, SignupValidationError } from "@/lib/signup";

const MAX_BODY_BYTES = 8_192;

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
    const forwarded = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const agent = request.headers.get("user-agent")?.slice(0, 64) ?? "unknown";
    enforceSignupRateLimit(`${forwarded.trim()}|${agent}`, signup.email);
    try {
      await saveSignup(signup);
    } catch (error) {
      // Un échec d'enregistrement ne doit pas bloquer une nouvelle tentative avec la même adresse.
      releaseSignupEmail(signup.email);
      throw error;
    }
    return NextResponse.json({ message: "Votre inscription est enregistrée." }, { status: 201 });
  } catch (error) {
    if (error instanceof SignupValidationError) return publicError(error.message, 400);
    if (error instanceof SignupAbuseError) return publicError(error.message, 429);
    console.error("signup_error", error instanceof Error ? error.name : "unknown");
    return publicError("L'inscription n'est pas disponible pour le moment.", 503);
  }
}
