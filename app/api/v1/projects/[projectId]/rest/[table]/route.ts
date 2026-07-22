import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { isSafeIdentifier, requireProjectApiKey } from "@/lib/api-auth";
import { ensureProjectDatabase, qualifyTable } from "@/lib/project-db";

type Params = Promise<{ projectId: string; table: string }>;
type JsonRecord = Record<string, string | number | boolean | null>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { projectId, table } = await params;
  const auth = await requireProjectApiKey(req, projectId);

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (!isSafeIdentifier(table)) {
    return NextResponse.json({ error: "Invalid table name" }, { status: 400 });
  }

  const url = req.nextUrl;
  const select = url.searchParams.get("select") || "*";
  const limit = Math.min(Number(url.searchParams.get("limit") || "100"), 500);
  const filters = [...url.searchParams.entries()].filter(([key]) => key.startsWith("eq."));

  if (select !== "*" && !select.split(",").every((column) => isSafeIdentifier(column.trim()))) {
    return NextResponse.json({ error: "Invalid select columns" }, { status: 400 });
  }

  const whereClauses: string[] = [];
  const values: string[] = [];

  for (const [key, value] of filters) {
    const column = key.slice(3);
    if (!isSafeIdentifier(column)) {
      return NextResponse.json({ error: `Invalid filter column: ${column}` }, { status: 400 });
    }
    values.push(value);
    whereClauses.push(`"${column}" = $${values.length}`);
  }

  await ensureProjectDatabase(projectId, auth.project.dbUrl);
  const sql = neon(auth.project.dbUrl || process.env.DATABASE_URL!);
  const columns = select === "*" ? "*" : select.split(",").map((column) => `"${column.trim()}"`).join(", ");
  const where = whereClauses.length ? ` WHERE ${whereClauses.join(" AND ")}` : "";
  const query = `SELECT ${columns} FROM ${qualifyTable(projectId, table)}${where} LIMIT ${limit}`;

  try {
    const data = await sql.query(query, values);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Query failed";
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { projectId, table } = await params;
  const auth = await requireProjectApiKey(req, projectId);

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (!isSafeIdentifier(table)) {
    return NextResponse.json({ error: "Invalid table name" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const records = Array.isArray(body) ? body : body ? [body] : [];

  if (records.length === 0 || !records.every((record) => record && typeof record === "object" && !Array.isArray(record))) {
    return NextResponse.json({ data: null, error: "Request body must be an object or array of objects" }, { status: 400 });
  }

  const columns = Object.keys(records[0] as JsonRecord);
  if (columns.length === 0 || !columns.every(isSafeIdentifier)) {
    return NextResponse.json({ data: null, error: "Invalid insert columns" }, { status: 400 });
  }

  if (!records.every((record) => {
    const keys = Object.keys(record as JsonRecord);
    return keys.length === columns.length && columns.every((column) => keys.includes(column));
  })) {
    return NextResponse.json({ data: null, error: "All records must use the same columns" }, { status: 400 });
  }

  await ensureProjectDatabase(projectId, auth.project.dbUrl);
  const sql = neon(auth.project.dbUrl || process.env.DATABASE_URL!);
  const values: (string | number | boolean | null)[] = [];
  const rowsSql = records.map((record) => {
    const placeholders = columns.map((column) => {
      values.push((record as JsonRecord)[column]);
      return `$${values.length}`;
    });
    return `(${placeholders.join(", ")})`;
  });

  const query = `
    INSERT INTO ${qualifyTable(projectId, table)}
    (${columns.map((column) => `"${column}"`).join(", ")})
    VALUES ${rowsSql.join(", ")}
    RETURNING *
  `;

  try {
    const data = await sql.query(query, values);
    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Insert failed";
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }
}
