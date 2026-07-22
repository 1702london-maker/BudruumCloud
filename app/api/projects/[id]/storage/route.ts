import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

const R2_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID!;
const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET!;
const R2_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;

async function r2Fetch(path: string, init?: RequestInit) {
  return fetch(
    `https://api.cloudflare.com/client/v4/accounts/${R2_ACCOUNT}/r2/buckets/${R2_BUCKET}${path}`,
    { ...init, headers: { Authorization: `Bearer ${R2_TOKEN}`, ...(init?.headers || {}) } }
  );
}

async function getProjectOwner(projectId: string, ownerId: string) {
  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, projectId), eq(project.ownerId, ownerId)));
  return proj;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const proj = await getProjectOwner(params.id, session.user.id);
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const prefix = req.nextUrl.searchParams.get("prefix") || "";
  const keyPrefix = `${params.id}/${prefix}`;

  try {
    const res = await r2Fetch(`/objects?prefix=${encodeURIComponent(keyPrefix)}&delimiter=/`);
    if (!res.ok) return NextResponse.json({ files: [] });
    const data = await res.json() as { result?: { objects?: Array<{ key: string; size: number; uploaded: string }> } };
    const objects = data.result?.objects || [];
    const files = objects.map((o: { key: string; size: number; uploaded: string }) => ({
      key: o.key.replace(keyPrefix, ""),
      size: o.size,
      lastModified: o.uploaded,
    }));
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const proj = await getProjectOwner(params.id, session.user.id);
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const prefix = (form.get("prefix") as string) || "";
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const key = `${params.id}/${prefix}${file.name}`;
  const bytes = await file.arrayBuffer();

  try {
    await r2Fetch(`/objects/${encodeURIComponent(key)}`, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: bytes,
    });
    return NextResponse.json({ ok: true, key });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
