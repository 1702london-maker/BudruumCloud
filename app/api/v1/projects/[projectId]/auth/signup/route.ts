import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { requireProjectApiKey } from "@/lib/api-auth";
import { ensureProjectDatabase, getProjectSql, qualifyTable } from "@/lib/project-db";
import { createProjectSession, hashPassword } from "@/lib/project-auth";
import { recordProjectLog, requestIp } from "@/lib/logging";

export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  const started = Date.now();
  const { projectId } = await params;
  const auth = await requireProjectApiKey(req, projectId);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const name = body.name ? String(body.name).trim() : null;
  if (!email || password.length < 8) return NextResponse.json({ error: "Email and password with at least 8 characters are required" }, { status: 400 });

  await ensureProjectDatabase(projectId, auth.project.dbUrl);
  const sql = getProjectSql(auth.project.dbUrl);
  const userId = `usr_${nanoid(24)}`;

  try {
    const rows = await sql.query(
      `INSERT INTO ${qualifyTable(projectId, "auth_users")} ("id", "email", "name", "password_hash") VALUES ($1, $2, $3, $4) RETURNING "id", "email", "name", "email_verified", "created_at"`,
      [userId, email, name, hashPassword(password)]
    );
    const session = await createProjectSession(projectId, auth.project.dbUrl, userId);
    await recordProjectLog({ projectId, service: "auth", method: "POST", path: req.nextUrl.pathname, status: 201, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `Signup ${email}` });
    return NextResponse.json({ user: rows[0], session, error: null }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error && err.message.includes("duplicate") ? "User already exists" : err instanceof Error ? err.message : "Signup failed";
    await recordProjectLog({ projectId, service: "auth", method: "POST", path: req.nextUrl.pathname, status: 400, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ user: null, session: null, error: message }, { status: 400 });
  }
}
