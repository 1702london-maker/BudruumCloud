import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project, projectFunction } from "@/lib/schema";

async function requireProject(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Unauthorized", status: 401 as const };
  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return { error: "Not found", status: 404 as const };
  return { project: proj };
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authResult = await requireProject(id);
  if ("error" in authResult) return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  const functions = await db.select().from(projectFunction)
    .where(eq(projectFunction.projectId, id))
    .orderBy(desc(projectFunction.updatedAt));
  return NextResponse.json({ functions });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authResult = await requireProject(id);
  if ("error" in authResult) return NextResponse.json({ error: authResult.error }, { status: authResult.status });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  const responseBody = typeof body.responseBody === "string" ? body.responseBody : JSON.stringify({ ok: true, message: "Hello from Budruum Function" }, null, 2);
  if (!name) return NextResponse.json({ error: "Function name is required" }, { status: 400 });

  try {
    JSON.parse(responseBody);
  } catch {
    return NextResponse.json({ error: "Response body must be valid JSON" }, { status: 400 });
  }

  const now = new Date();
  const [created] = await db.insert(projectFunction).values({
    id: `fn_${nanoid(20)}`,
    projectId: id,
    name,
    status: "active",
    responseBody,
    createdAt: now,
    updatedAt: now,
  }).returning();

  return NextResponse.json({ function: created }, { status: 201 });
}
