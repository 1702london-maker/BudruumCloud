import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { isSafeIdentifier } from "@/lib/api-auth";
import { ensureProjectDatabase, getProjectSql, listProjectColumns, qualifyTable } from "@/lib/project-db";

type Params = { params: Promise<{ id: string; table: string }> };
type JsonValue = string | number | boolean | null;
type JsonRecord = Record<string, JsonValue>;

async function requireProject(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Unauthorized", status: 401 as const };

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return { error: "Not found", status: 404 as const };

  return { project: proj };
}

function validRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function buildWhere(match: JsonRecord, offset = 1) {
  const columns = Object.keys(match);
  if (columns.length === 0 || !columns.every(isSafeIdentifier)) return null;
  return {
    clause: columns.map((column, index) => `"${column}" = $${offset + index}`).join(" AND "),
    values: columns.map((column) => match[column]),
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id, table } = await params;
  if (!isSafeIdentifier(table)) return NextResponse.json({ error: "Invalid table name" }, { status: 400 });

  const authResult = await requireProject(id);
  if ("error" in authResult) return NextResponse.json({ error: authResult.error }, { status: authResult.status });

  await ensureProjectDatabase(id, authResult.project.dbUrl);
  const sql = getProjectSql(authResult.project.dbUrl);
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") || 100), 500);
  const rows = await sql.query(`SELECT * FROM ${qualifyTable(id, table)} LIMIT $1`, [limit]);
  const columns = await listProjectColumns(id, table, authResult.project.dbUrl);

  return NextResponse.json({ rows, columns });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id, table } = await params;
  if (!isSafeIdentifier(table)) return NextResponse.json({ error: "Invalid table name" }, { status: 400 });

  const authResult = await requireProject(id);
  if ("error" in authResult) return NextResponse.json({ error: authResult.error }, { status: authResult.status });

  const body = await req.json();
  if (!validRecord(body)) return NextResponse.json({ error: "JSON object body is required" }, { status: 400 });

  const columns = Object.keys(body);
  if (columns.length === 0 || !columns.every(isSafeIdentifier)) {
    return NextResponse.json({ error: "Invalid columns" }, { status: 400 });
  }

  await ensureProjectDatabase(id, authResult.project.dbUrl);
  const sql = getProjectSql(authResult.project.dbUrl);
  const columnList = columns.map((column) => `"${column}"`).join(", ");
  const valueSlots = columns.map((_, index) => `$${index + 1}`).join(", ");
  const values = columns.map((column) => body[column]);
  const rows = await sql.query(
    `INSERT INTO ${qualifyTable(id, table)} (${columnList}) VALUES (${valueSlots}) RETURNING *`,
    values
  );

  return NextResponse.json({ rows }, { status: 201 });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id, table } = await params;
  if (!isSafeIdentifier(table)) return NextResponse.json({ error: "Invalid table name" }, { status: 400 });

  const authResult = await requireProject(id);
  if ("error" in authResult) return NextResponse.json({ error: authResult.error }, { status: authResult.status });

  const body = await req.json();
  if (!validRecord(body?.match) || !validRecord(body?.values)) {
    return NextResponse.json({ error: "Body must include match and values objects" }, { status: 400 });
  }

  const updateColumns = Object.keys(body.values);
  if (updateColumns.length === 0 || !updateColumns.every(isSafeIdentifier)) {
    return NextResponse.json({ error: "Invalid update columns" }, { status: 400 });
  }

  const where = buildWhere(body.match, updateColumns.length + 1);
  if (!where) return NextResponse.json({ error: "A safe match object is required" }, { status: 400 });

  await ensureProjectDatabase(id, authResult.project.dbUrl);
  const sql = getProjectSql(authResult.project.dbUrl);
  const setClause = updateColumns.map((column, index) => `"${column}" = $${index + 1}`).join(", ");
  const values = [...updateColumns.map((column) => body.values[column]), ...where.values];
  const rows = await sql.query(
    `UPDATE ${qualifyTable(id, table)} SET ${setClause} WHERE ${where.clause} RETURNING *`,
    values
  );

  return NextResponse.json({ rows });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id, table } = await params;
  if (!isSafeIdentifier(table)) return NextResponse.json({ error: "Invalid table name" }, { status: 400 });

  const authResult = await requireProject(id);
  if ("error" in authResult) return NextResponse.json({ error: authResult.error }, { status: authResult.status });

  const body = await req.json();
  if (!validRecord(body?.match)) {
    return NextResponse.json({ error: "Body must include a match object" }, { status: 400 });
  }

  const where = buildWhere(body.match);
  if (!where) return NextResponse.json({ error: "A safe match object is required" }, { status: 400 });

  await ensureProjectDatabase(id, authResult.project.dbUrl);
  const sql = getProjectSql(authResult.project.dbUrl);
  const rows = await sql.query(
    `DELETE FROM ${qualifyTable(id, table)} WHERE ${where.clause} RETURNING *`,
    where.values
  );

  return NextResponse.json({ rows });
}
