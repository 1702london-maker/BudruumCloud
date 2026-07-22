import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { listProjectObjects, putProjectObject } from "@/lib/storage";
import { recordProjectLog, requestIp } from "@/lib/logging";

async function getProjectOwner(projectId: string, ownerId: string) {
  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, projectId), eq(project.ownerId, ownerId)));
  return proj;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const started = Date.now();
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const proj = await getProjectOwner(id, session.user.id);
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const prefix = req.nextUrl.searchParams.get("prefix") || "";
  try {
    const files = await listProjectObjects(id, prefix);
    await recordProjectLog({ projectId: id, service: "storage", method: "GET", path: req.nextUrl.pathname + req.nextUrl.search, status: 200, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `List ${prefix || "/"}` });
    return NextResponse.json({ files });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Storage is not configured.";
    await recordProjectLog({ projectId: id, service: "storage", method: "GET", path: req.nextUrl.pathname + req.nextUrl.search, status: 500, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ files: [], warning: message });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const started = Date.now();
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const proj = await getProjectOwner(id, session.user.id);
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const prefix = (form.get("prefix") as string) || "";
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const key = `${id}/${prefix}${file.name}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  try {
    await putProjectObject(id, `${prefix}${file.name}`, bytes, file.type || "application/octet-stream");
    await recordProjectLog({ projectId: id, service: "storage", method: "POST", path: req.nextUrl.pathname, status: 201, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `Upload ${prefix}${file.name}` });
    return NextResponse.json({ ok: true, key });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    await recordProjectLog({ projectId: id, service: "storage", method: "POST", path: req.nextUrl.pathname, status: 500, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
