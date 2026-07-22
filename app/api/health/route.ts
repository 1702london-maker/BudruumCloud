import { NextResponse } from "next/server";

function hasEnv(name: string) {
  return Boolean(process.env[name]);
}

function hasAnyEnv(names: string[]) {
  return names.some((name) => hasEnv(name));
}

export async function GET() {
  const checks = [
    { name: "API", status: "ok", detail: "Budruum API is responding." },
    {
      name: "Database",
      status: hasEnv("DATABASE_URL") ? "configured" : "missing",
      detail: hasEnv("DATABASE_URL") ? "Ready for project data." : "Database connection is not configured.",
    },
    {
      name: "Authentication",
      status: hasEnv("BETTER_AUTH_SECRET") ? "configured" : "dev-default",
      detail: hasEnv("BETTER_AUTH_SECRET")
        ? "Ready for user accounts."
        : "Using a development fallback. Configure production authentication before launch.",
    },
    {
      name: "Storage",
      status:
        hasEnv("CLOUDFLARE_R2_BUCKET") &&
        hasEnv("CLOUDFLARE_R2_ACCESS_KEY_ID") &&
        hasEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY")
          ? "configured"
          : "missing",
      detail:
        hasEnv("CLOUDFLARE_R2_BUCKET") &&
        hasEnv("CLOUDFLARE_R2_ACCESS_KEY_ID") &&
        hasEnv("CLOUDFLARE_R2_SECRET_ACCESS_KEY")
          ? "Ready for project files."
          : "Storage is not configured yet.",
    },
    {
      name: "Realtime",
      status: hasAnyEnv(["ABLY_API_KEY", "ABLY_KEY", "ABLY_APP_KEY"]) ? "configured" : "missing",
      detail: hasAnyEnv(["ABLY_API_KEY", "ABLY_KEY", "ABLY_APP_KEY"])
        ? "Ready for live project channels."
        : "Realtime channels are not configured yet.",
    },
  ];

  return NextResponse.json({
    ok: true,
    service: "Budruum Cloud backend",
    environment: process.env.NODE_ENV,
    checks,
  });
}
