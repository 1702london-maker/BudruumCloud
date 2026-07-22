import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { recordProjectLog, requestIp } from "@/lib/logging";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const started = Date.now();
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const apiKey = process.env.ABLY_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ABLY_API_KEY is not configured" }, { status: 500 });

  const body = await req.json().catch(() => ({}));
  const channel = String(body.channel || `project:${id}`);
  const event = String(body.event || "dashboard.test");
  const payload = body.payload ?? { message: "Hello from Budruum Realtime", sentAt: new Date().toISOString() };
  const encodedChannel = encodeURIComponent(channel);

  try {
    const response = await fetch(`https://rest.ably.io/channels/${encodedChannel}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: event, data: payload }),
    });

    const text = await response.text();
    if (!response.ok) throw new Error(text || "Publish failed");

    await recordProjectLog({ projectId: id, service: "realtime", method: "POST", path: req.nextUrl.pathname, status: 201, durationMs: Date.now() - started, ipAddress: requestIp(req), message: `Published ${event} on ${channel}` });
    return NextResponse.json({ ok: true, channel, event, payload });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Publish failed";
    await recordProjectLog({ projectId: id, service: "realtime", method: "POST", path: req.nextUrl.pathname, status: 500, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
