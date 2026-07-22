import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

const R2_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID!;
const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET!;
const R2_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; key: string } }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, params.id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const fullKey = `${params.id}/${decodeURIComponent(params.key)}`;

  try {
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${R2_ACCOUNT}/r2/buckets/${R2_BUCKET}/objects/${encodeURIComponent(fullKey)}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${R2_TOKEN}` } }
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
