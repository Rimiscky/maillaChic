import { describe, expect, it } from "vitest";
import { POST } from "../src/app/api/signup/route";

describe("route d'inscription", () => {
  it("classe le JSON mal formé comme erreur client", async () => {
    const response = await POST(new Request("http://localhost/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    }));
    expect(response.status).toBe(400);
  });

  it("refuse un corps déclaré trop volumineux", async () => {
    const response = await POST(new Request("http://localhost/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json", "content-length": "9000" },
      body: "{}",
    }));
    expect(response.status).toBe(413);
  });

  it("classe une adresse invalide comme erreur client", async () => {
    const response = await POST(new Request("http://localhost/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "incorrect", consent: true, company: "" }),
    }));
    expect(response.status).toBe(400);
  });
});
