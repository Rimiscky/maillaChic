"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export function SignupForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = {
      email: form.get("email"),
      consent: form.get("consent") === "on",
      company: form.get("company"),
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json() as { message?: string };
      if (!response.ok) throw new Error(body.message || "L'inscription n'a pas pu être enregistrée.");
      setState("success");
      setMessage(body.message || "Votre inscription est enregistrée.");
      event.currentTarget.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "L'inscription n'a pas pu être enregistrée.");
    }
  }

  return (
    <form className="signup-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="email">Votre adresse e-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required placeholder="vous@exemple.fr" aria-describedby="email-help" />
        <p id="email-help">Un message à la révélation de la collection, puis à l'ouverture.</p>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Entreprise</label><input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent-row"><input name="consent" type="checkbox" required /><span>J'accepte que Maila Chic utilise mon adresse pour m'informer de son lancement. <Link href="/confidentialite">En savoir plus</Link>.</span></label>
      <button className="button button-dark" type="submit" disabled={state === "loading"}>{state === "loading" ? "Inscription..." : "Me prévenir"}</button>
      <p className={`form-status ${state}`} aria-live="polite">{message}</p>
    </form>
  );
}
