import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { deleteProjectObject } from "@/lib/storage";
import { recordProjectLog, requestIp } from "@/lib/logging";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; key: string }> }
) {
  const started = Date.now();
  const { id, key } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await deleteProjectObject(id, decodeURIComponent(key));
    await recordProjectLog({ projectId: id, service: "storage", method: "DELETE", path: req.nextUrl.pathname, status: 200, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `Delete ${decodeURIComponent(key)}` });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    await recordProjectLog({ projectId: id, service: "storage", method: "DELETE", path: req.nextUrl.pathname, status: 500, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
