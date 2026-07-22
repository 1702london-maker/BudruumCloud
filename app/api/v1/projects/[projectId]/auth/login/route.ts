import { NextRequest, NextResponse } from "next/server";
import { requireProjectApiKey } from "@/lib/api-auth";
import { ensureProjectDatabase, getProjectSql, qualifyTable } from "@/lib/project-db";
import { createProjectSession, verifyPassword } from "@/lib/project-auth";
import { recordProjectLog, requestIp } from "@/lib/logging";

export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const started = Date.now();
  const { projectId } = await params;
  const auth = await requireProjectApiKey(req, projectId);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!email || !password) return NextResponse.json({ error: "Email and password are required" }, { status: 400 });

  await ensureProjectDatabase(projectId, auth.project.dbUrl);
  const sql = getProjectSql(auth.project.dbUrl);
  const rows = await sql.query(
    `SELECT "id", "email", "name", "password_hash", "email_verified", "created_at" FROM ${qualifyTable(projectId, "auth_users")} WHERE "email" = $1 LIMIT 1`,
    [email]
  ) as { id: string; email: string; name: string | null; password_hash: string; email_verified: boolean; created_at: string }[];
  const user = rows[0];

  if (!user || !verifyPassword(password, user.password_hash)) {
    await recordProjectLog({ projectId, service: "auth", method: "POST", path: req.nextUrl.pathname, status: 401, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `Failed login ${email}` });
    return NextResponse.json({ user: null, session: null, error: "Invalid email or password" }, { status: 401 });
  }

  const session = await createProjectSession(projectId, auth.project.dbUrl, user.id);
  await recordProjectLog({ projectId, service: "auth", method: "POST", path: req.nextUrl.pathname, status: 200, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `Login ${email}` });
  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    email_verified: user.email_verified,
    created_at: user.created_at,
  };
  return NextResponse.json({ user: safeUser, session, error: null });
}
