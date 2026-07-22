import { NextResponse } from "next/server";

function hasEnv(name: string) {
  return Boolean(process.env[name]);
}

function hasAnyEnv(names: string[]) {
  return names.some((name) => hasEnv(name));
}

export async function GET() {
  const checks = [
    { name: "Next.js API", status: "ok", detail: "Local API route is responding." },
    {
      name: "Neon Postgres",
      status: hasEnv("DATABASE_URL") ? "configured" : "missing",
      detail: hasEnv("DATABASE_URL") ? "DATABASE_URL is set." : "Add DATABASE_URL to .env.local.",
    },
    {
      name: "Better Auth",
      status: hasEnv("BETTER_AUTH_SECRET") ? "configured" : "dev-default",
      detail: hasEnv("BETTER_AUTH_SECRET")
        ? "BETTER_AUTH_SECRET is set."
        : "Using local development fallback. Set BETTER_AUTH_SECRET before production.",
    },
    {
      name: "Cloudflare R2",
      status:
        hasEnv("CLOUDFLARE_R2_BUCKET") &&
        hasEnv("CLOUDFLARE_R2_ACCESS_KEY_ID") &&
        hasEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY")
          ? "configured"
          : "missing",
      detail: "Requires R2 bucket, access key ID, and secret access key.",
    },
    {
      name: "Ably Realtime",
      status: hasAnyEnv(["ABLY_API_KEY", "ABLY_KEY", "ABLY_APP_KEY"]) ? "configured" : "missing",
      detail: hasAnyEnv(["ABLY_API_KEY", "ABLY_KEY", "ABLY_APP_KEY"])
        ? "Ably server key is set."
        : "Realtime is not wired until ABLY_API_KEY is set.",
    },
  ];

  return NextResponse.json({
    ok: true,
    service: "Budruum Cloud backend",
    environment: process.env.NODE_ENV,
    checks,
  });
}
