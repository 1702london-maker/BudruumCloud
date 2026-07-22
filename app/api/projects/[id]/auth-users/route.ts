import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { ensureProjectDatabase, getProjectSql, qualifyTable } from "@/lib/project-db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await ensureProjectDatabase(id, proj.dbUrl);
  const sql = getProjectSql(proj.dbUrl);
  const users = await sql.query(
    `SELECT "id", "name", "email", "email_verified" AS "emailVerified", "created_at" AS "createdAt" FROM ${qualifyTable(id, "auth_users")} ORDER BY "created_at" DESC LIMIT 500`
  );

  return NextResponse.json({ users });
}
