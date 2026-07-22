import { nanoid } from "nanoid";
import { desc, eq, sql as drizzleSql } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { db } from "@/lib/db";
import { projectLog } from "@/lib/schema";

let ensured = false;

export type LogService = "api" | "database" | "auth" | "storage" | "functions" | "realtime";

export async function ensureLogTable() {
  if (ensured) return;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return;

  const sql = neon(databaseUrl);
  await sql.query(`
    CREATE TABLE IF NOT EXISTS "project_log" (
      "id" text PRIMARY KEY NOT NULL,
      "project_id" text NOT NULL REFERENCES "project"("id") ON DELETE cascade,
      "service" text NOT NULL,
      "method" text NOT NULL,
      "path" text NOT NULL,
      "status" integer NOT NULL,
      "duration_ms" integer NOT NULL,
      "ip_address" text,
      "message" text,
      "created_at" timestamp NOT NULL
    )
  `);
  ensured = true;
}

export function requestIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || null;
}

export async function recordProjectLog(input: {
  projectId: string;
  service: LogService;
  method: string;
  path: string;
  status: number;
  durationMs: number;
  ipAddress?: string | null;
  message?: string | null;
}) {
  try {
    await ensureLogTable();
    await db.insert(projectLog).values({
      id: `log_${nanoid(18)}`,
      projectId: input.projectId,
      service: input.service,
      method: input.method,
      path: input.path,
      status: input.status,
      durationMs: input.durationMs,
      ipAddress: input.ipAddress || null,
      message: input.message || null,
      createdAt: new Date(),
    });
  } catch {
    // Logs must never break the product request path.
  }
}

export async function listLogs(projectId: string, limit = 100) {
  await ensureLogTable();
  return db.select().from(projectLog)
    .where(eq(projectLog.projectId, projectId))
    .orderBy(desc(projectLog.createdAt))
    .limit(limit);
}

export async function logSummary(projectId: string) {
  await ensureLogTable();
  const rows = await db.execute(drizzleSql`
    SELECT
      service,
      count(*)::int AS requests,
      coalesce(round(avg(duration_ms)), 0)::int AS latency,
      count(*) FILTER (WHERE status >= 400)::int AS errors
    FROM project_log
    WHERE project_id = ${projectId}
      AND created_at > now() - interval '60 minutes'
    GROUP BY service
  `);
  return rows as unknown as { service: string; requests: number; latency: number; errors: number }[];
}
