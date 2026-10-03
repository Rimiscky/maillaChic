"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export function SignupForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // React remet currentTarget à null après le gestionnaire synchrone : on garde le formulaire.
    const formElement = event.currentTarget;
    setState("loading");
    setMessage("");
    const form = new FormData(formElement);
    const payload = {
      email: form.get("email"),
      consent: form.get("consent") === "on",
      company: form.get("company"),
      interests: form.getAll("interests"),
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => ({})) as { message?: string };
      if (!response.ok) throw new Error(body.message || "L'inscription n'a pas pu être enregistrée.");
      setState("success");
      setMessage(body.message || "Votre inscription est enregistrée.");
      formElement.reset();
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
      <fieldset className="interest-fieldset">
        <legend>Ce que vous souhaitez suivre</legend>
        <label><input name="interests" type="checkbox" value="collection" defaultChecked /> <span>La révélation de la collection</span></label>
        <label><input name="interests" type="checkbox" value="matieres" /> <span>Les matières et leur entretien</span></label>
        <label><input name="interests" type="checkbox" value="coulisses" /> <span>Le carnet de création</span></label>
      </fieldset>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Entreprise</label><input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent-row"><input name="consent" type="checkbox" required /><span>J'accepte que Maila Chic utilise mon adresse pour m'informer de son lancement. <Link href="/confidentialite">En savoir plus</Link>.</span></label>
      <button className="button button-dark" type="submit" disabled={state === "loading"}>{state === "loading" ? "Inscription..." : "Me prévenir"}</button>
      <p className={`form-status ${state}`} aria-live="polite">{message}</p>
    </form>
  );
}
