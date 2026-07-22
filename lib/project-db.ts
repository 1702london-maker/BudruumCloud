import { neon } from "@neondatabase/serverless";

export function getProjectSchemaName(projectId: string) {
  return `bud_${projectId.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}`;
}

export function quoteIdent(identifier: string) {
  return `"${identifier.replace(/"/g, '""')}"`;
}

export function qualifyTable(projectId: string, table: string) {
  return `${quoteIdent(getProjectSchemaName(projectId))}.${quoteIdent(table)}`;
}

export function getProjectSql(dbUrl?: string | null) {
  return neon(dbUrl || process.env.DATABASE_URL!);
}

export async function ensureProjectDatabase(projectId: string, dbUrl?: string | null) {
  const sql = getProjectSql(dbUrl);
  const schema = getProjectSchemaName(projectId);

  await sql.query(`CREATE SCHEMA IF NOT EXISTS ${quoteIdent(schema)}`);
  await sql.query(`
    CREATE TABLE IF NOT EXISTS ${quoteIdent(schema)}."products" (
      "id" text PRIMARY KEY,
      "name" text NOT NULL,
      "status" text NOT NULL DEFAULT 'active',
      "created_at" timestamp NOT NULL DEFAULT now()
    )
  `);
  await sql.query(`
    CREATE TABLE IF NOT EXISTS ${quoteIdent(schema)}."auth_users" (
      "id" text PRIMARY KEY,
      "email" text NOT NULL UNIQUE,
      "name" text,
      "password_hash" text NOT NULL,
      "email_verified" boolean NOT NULL DEFAULT false,
      "created_at" timestamp NOT NULL DEFAULT now(),
      "updated_at" timestamp NOT NULL DEFAULT now()
    )
  `);
  await sql.query(`
    CREATE TABLE IF NOT EXISTS ${quoteIdent(schema)}."auth_sessions" (
      "id" text PRIMARY KEY,
      "user_id" text NOT NULL REFERENCES ${quoteIdent(schema)}."auth_users"("id") ON DELETE cascade,
      "token" text NOT NULL UNIQUE,
      "expires_at" timestamp NOT NULL,
      "created_at" timestamp NOT NULL DEFAULT now()
    )
  `);
}

export async function listProjectTables(projectId: string, dbUrl?: string | null) {
  await ensureProjectDatabase(projectId, dbUrl);
  const sql = getProjectSql(dbUrl);
  const schema = getProjectSchemaName(projectId);

  const rows = await sql.query(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = $1 AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `,
    [schema]
  );
  return rows as { table_name: string }[];
}

export async function listProjectColumns(projectId: string, table: string, dbUrl?: string | null) {
  await ensureProjectDatabase(projectId, dbUrl);
  const sql = getProjectSql(dbUrl);
  const schema = getProjectSchemaName(projectId);

  const rows = await sql.query(
    `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = $1 AND table_name = $2
      ORDER BY ordinal_position
    `,
    [schema, table]
  );
  return rows as {
    column_name: string;
    data_type: string;
    is_nullable: "YES" | "NO";
    column_default: string | null;
  }[];
}

export async function listProjectSchema(projectId: string, dbUrl?: string | null) {
  const tables = await listProjectTables(projectId, dbUrl);
  const columns = await Promise.all(tables.map(async (table) => ({
    name: table.table_name,
    columns: await listProjectColumns(projectId, table.table_name, dbUrl),
  })));
  return columns;
}
