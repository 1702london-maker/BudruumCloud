import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { neon } from "@neondatabase/serverless";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { sql } = await req.json();
  if (!sql?.trim()) return NextResponse.json({ error: "SQL is required" }, { status: 400 });

  const forbidden = /^\s*(drop|delete|truncate|alter)\s/i;
  if (forbidden.test(sql)) return NextResponse.json({ error: "Destructive queries are disabled in the editor." }, { status: 403 });

  try {
    const neonSql = neon(proj.dbUrl || process.env.DATABASE_URL!);
    const rows = await neonSql(sql);
    return NextResponse.json({ rows });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Query failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
