import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Frame-Options", value: "DENY" },
];

// La Content-Security-Policy des pages est posée par src/proxy.ts avec un nonce par requête.
// Les réponses JSON de l'API ne chargent rien : elles reçoivent la politique la plus stricte.
const apiHeaders = [{ key: "Content-Security-Policy", value: "default-src 'none'; frame-ancestors 'none'" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Hostinger (application Node.js) exige un serveur autonome : .next/standalone/server.js.
  output: "standalone",
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/api/:path*", headers: apiHeaders },
    ];
  },
};

export default nextConfig;
