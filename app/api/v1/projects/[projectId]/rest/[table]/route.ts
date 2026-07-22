import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { isSafeIdentifier, requireProjectApiKey } from "@/lib/api-auth";
import { ensureProjectDatabase, qualifyTable } from "@/lib/project-db";
import { recordProjectLog, requestIp } from "@/lib/logging";

type Params = Promise<{ projectId: string; table: string }>;
type JsonRecord = Record<string, string | number | boolean | null>;

function invalidTable(table: string) {
  return !isSafeIdentifier(table);
}

function buildFilters(url: NextRequest["nextUrl"], startingIndex = 1) {
  const filters = [...url.searchParams.entries()].filter(([key]) => key.startsWith("eq."));
  const whereClauses: string[] = [];
  const values: (string | number | boolean | null)[] = [];

  for (const [key, value] of filters) {
    const column = key.slice(3);
    if (!isSafeIdentifier(column)) {
      return { error: `Invalid filter column: ${column}` };
    }
    values.push(value);
    whereClauses.push(`"${column}" = $${startingIndex + values.length - 1}`);
  }

  return { whereClauses, values };
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const started = Date.now();
  const { projectId, table } = await params;
  const auth = await requireProjectApiKey(req, projectId);

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (invalidTable(table)) {
    return NextResponse.json({ error: "Invalid table name" }, { status: 400 });
  }

  const url = req.nextUrl;
  const select = url.searchParams.get("select") || "*";
  const limit = Math.min(Number(url.searchParams.get("limit") || "100"), 500);
  const offset = Math.max(Number(url.searchParams.get("offset") || "0"), 0);
  const order = url.searchParams.get("order");

  if (select !== "*" && !select.split(",").every((column) => isSafeIdentifier(column.trim()))) {
    return NextResponse.json({ error: "Invalid select columns" }, { status: 400 });
  }

  const filterResult = buildFilters(url);
  if ("error" in filterResult) {
    return NextResponse.json({ error: filterResult.error }, { status: 400 });
  }

  await ensureProjectDatabase(projectId, auth.project.dbUrl);
  const sql = neon(auth.project.dbUrl || process.env.DATABASE_URL!);
  const columns = select === "*" ? "*" : select.split(",").map((column) => `"${column.trim()}"`).join(", ");
  const where = filterResult.whereClauses.length ? ` WHERE ${filterResult.whereClauses.join(" AND ")}` : "";
  let orderBy = "";
  if (order) {
    const [column, direction = "asc"] = order.split(".");
    if (!isSafeIdentifier(column) || !["asc", "desc"].includes(direction.toLowerCase())) {
      return NextResponse.json({ error: "Invalid order parameter" }, { status: 400 });
    }
    orderBy = ` ORDER BY "${column}" ${direction.toUpperCase()}`;
  }
  const query = `SELECT ${columns} FROM ${qualifyTable(projectId, table)}${where}${orderBy} LIMIT ${limit} OFFSET ${offset}`;

  try {
    const data = await sql.query(query, filterResult.values);
    await recordProjectLog({ projectId, service: "api", method: "GET", path: req.nextUrl.pathname + req.nextUrl.search, status: 200, durationMs: Date.now() - started, ipAddress: requestIp(req) });
    return NextResponse.json({ data, error: null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Query failed";
    await recordProjectLog({ projectId, service: "api", method: "GET", path: req.nextUrl.pathname + req.nextUrl.search, status: 400, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const started = Date.now();
  const { projectId, table } = await params;
  const auth = await requireProjectApiKey(req, projectId);

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (invalidTable(table)) {
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
    await recordProjectLog({ projectId, service: "api", method: "POST", path: req.nextUrl.pathname, status: 201, durationMs: Date.now() - started, ipAddress: requestIp(req) });
    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Insert failed";
    await recordProjectLog({ projectId, service: "api", method: "POST", path: req.nextUrl.pathname, status: 400, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const started = Date.now();
  const { projectId, table } = await params;
  const auth = await requireProjectApiKey(req, projectId);

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (invalidTable(table)) {
    return NextResponse.json({ error: "Invalid table name" }, { status: 400 });
  }

  const body = await req.json().catch(() => null) as JsonRecord | null;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ data: null, error: "Request body must be an object" }, { status: 400 });
  }

  const columns = Object.keys(body);
  if (columns.length === 0 || !columns.every(isSafeIdentifier)) {
    return NextResponse.json({ data: null, error: "Invalid update columns" }, { status: 400 });
  }

  const values = columns.map((column) => body[column]);
  const setClause = columns.map((column, index) => `"${column}" = $${index + 1}`).join(", ");
  const filterResult = buildFilters(req.nextUrl, values.length + 1);
  if ("error" in filterResult) {
    return NextResponse.json({ data: null, error: filterResult.error }, { status: 400 });
  }
  if (filterResult.whereClauses.length === 0) {
    return NextResponse.json({ data: null, error: "Update requires at least one eq filter" }, { status: 400 });
  }

  await ensureProjectDatabase(projectId, auth.project.dbUrl);
  const sql = neon(auth.project.dbUrl || process.env.DATABASE_URL!);
  const query = `UPDATE ${qualifyTable(projectId, table)} SET ${setClause} WHERE ${filterResult.whereClauses.join(" AND ")} RETURNING *`;

  try {
    const data = await sql.query(query, [...values, ...filterResult.values]);
    await recordProjectLog({ projectId, service: "api", method: "PATCH", path: req.nextUrl.pathname + req.nextUrl.search, status: 200, durationMs: Date.now() - started, ipAddress: requestIp(req) });
    return NextResponse.json({ data, error: null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    await recordProjectLog({ projectId, service: "api", method: "PATCH", path: req.nextUrl.pathname + req.nextUrl.search, status: 400, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const started = Date.now();
  const { projectId, table } = await params;
  const auth = await requireProjectApiKey(req, projectId);

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (invalidTable(table)) {
    return NextResponse.json({ error: "Invalid table name" }, { status: 400 });
  }

  const filterResult = buildFilters(req.nextUrl);
  if ("error" in filterResult) {
    return NextResponse.json({ data: null, error: filterResult.error }, { status: 400 });
  }
  if (filterResult.whereClauses.length === 0) {
    return NextResponse.json({ data: null, error: "Delete requires at least one eq filter" }, { status: 400 });
  }

  await ensureProjectDatabase(projectId, auth.project.dbUrl);
  const sql = neon(auth.project.dbUrl || process.env.DATABASE_URL!);
  const query = `DELETE FROM ${qualifyTable(projectId, table)} WHERE ${filterResult.whereClauses.join(" AND ")} RETURNING *`;

  try {
    const data = await sql.query(query, filterResult.values);
    await recordProjectLog({ projectId, service: "api", method: "DELETE", path: req.nextUrl.pathname + req.nextUrl.search, status: 200, durationMs: Date.now() - started, ipAddress: requestIp(req) });
    return NextResponse.json({ data, error: null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    await recordProjectLog({ projectId, service: "api", method: "DELETE", path: req.nextUrl.pathname + req.nextUrl.search, status: 400, durationMs: Date.now() - started, ipAddress: requestIp(req), message });
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }
}
