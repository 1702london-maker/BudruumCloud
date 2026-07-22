import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project, apiKey } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { nanoid } from "nanoid";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await db.select().from(project).where(eq(project.ownerId, session.user.id));
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, region } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") + "-" + nanoid(6);
  const id = nanoid();
  const now = new Date();

  const [newProject] = await db.insert(project).values({
    id,
    name: name.trim(),
    slug,
    region: region || "eu-west-2",
    ownerId: session.user.id,
    plan: "starter",
    createdAt: now,
    updatedAt: now,
  }).returning();

  // Generate anon + service API keys
  const anonKey = "bud_anon_" + nanoid(32);
  const serviceKey = "bud_service_" + nanoid(32);
  const keyNow = new Date();

  await db.insert(apiKey).values([
    { id: nanoid(), projectId: id, name: "anon key", key: anonKey, type: "anon", createdAt: keyNow },
    { id: nanoid(), projectId: id, name: "service key", key: serviceKey, type: "service", createdAt: keyNow },
  ]);

  return NextResponse.json({ project: newProject }, { status: 201 });
}
