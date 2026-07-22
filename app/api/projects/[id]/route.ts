import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project, apiKey } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, params.id), eq(project.ownerId, session.user.id)));

  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const keys = await db.select().from(apiKey).where(eq(apiKey.projectId, params.id));

  return NextResponse.json({ project: proj, apiKeys: keys });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, params.id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.delete(apiKey).where(eq(apiKey.projectId, params.id));
  await db.delete(project).where(eq(project.id, params.id));

  return NextResponse.json({ ok: true });
}
