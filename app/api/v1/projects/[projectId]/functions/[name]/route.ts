import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { requireProjectApiKey } from "@/lib/api-auth";
import { db } from "@/lib/db";
import { projectFunction } from "@/lib/schema";
import { recordProjectLog, requestIp } from "@/lib/logging";
import { ensurePlatformTables } from "@/lib/platform-tables";

async function invoke(req: NextRequest, projectId: string, name: string) {
  const started = Date.now();
  const auth = await requireProjectApiKey(req, projectId);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  await ensurePlatformTables();
  const [fn] = await db.select().from(projectFunction)
    .where(and(eq(projectFunction.projectId, projectId), eq(projectFunction.name, name), eq(projectFunction.status, "active")));
  if (!fn) {
    await recordProjectLog({ projectId, service: "functions", method: req.method, path: req.nextUrl.pathname, status: 404, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `Function not found: ${name}` });
    return NextResponse.json({ error: "Function not found" }, { status: 404 });
  }

  const data = JSON.parse(fn.responseBody);
  await recordProjectLog({ projectId, service: "functions", method: req.method, path: req.nextUrl.pathname, status: 200, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `Invoked ${name}` });
  return NextResponse.json(data);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ projectId: string; name: string }> }) {
  const { projectId, name } = await params;
  return invoke(req, projectId, name);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string; name: string }> }) {
  const { projectId, name } = await params;
  return invoke(req, projectId, name);
}
