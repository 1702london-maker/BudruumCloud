import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project, projectFunction } from "@/lib/schema";
import { ensurePlatformTables } from "@/lib/platform-tables";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string; functionId: string }> }) {
  const { id, functionId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await ensurePlatformTables();
  await db.delete(projectFunction)
    .where(and(eq(projectFunction.id, functionId), eq(projectFunction.projectId, id)));
  return NextResponse.json({ ok: true });
}
