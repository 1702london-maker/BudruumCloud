import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project, projectPolicy } from "@/lib/schema";
import { isSafeIdentifier } from "@/lib/api-auth";

const MODES = ["public", "service"];

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const tableName = String(body.tableName || "");
  const readMode = String(body.readMode || "public");
  const writeMode = String(body.writeMode || "public");
  if (!isSafeIdentifier(tableName) || !MODES.includes(readMode) || !MODES.includes(writeMode)) {
    return NextResponse.json({ error: "Invalid policy" }, { status: 400 });
  }

  await db.delete(projectPolicy)
    .where(and(eq(projectPolicy.projectId, id), eq(projectPolicy.tableName, tableName)));
  const now = new Date();
  const [policy] = await db.insert(projectPolicy).values({
    id: `pol_${nanoid(18)}`,
    projectId: id,
    tableName,
    readMode,
    writeMode,
    createdAt: now,
    updatedAt: now,
  }).returning();

  return NextResponse.json({ policy });
}
