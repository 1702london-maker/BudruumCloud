import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { listProjectSchema } from "@/lib/project-db";
import { listPolicies } from "@/lib/policies";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const schema = await listProjectSchema(id, proj.dbUrl);
  const policies = await listPolicies(id, schema.map((table) => table.name));
  return NextResponse.json({ schema, policies });
}
