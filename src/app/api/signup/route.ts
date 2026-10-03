import { NextResponse } from "next/server";
import { parseSignup, saveSignup } from "@/lib/signup";

export async function POST(request: Request) {
  try {
    const signup = parseSignup(await request.json());
    await saveSignup(signup);
    return NextResponse.json({ message: "Votre inscription est enregistrée." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Une erreur est survenue.";
    const clientError = /adresse|consentement|requête/i.test(message);
    return NextResponse.json({ message }, { status: clientError ? 400 : 503 });
  }
}
