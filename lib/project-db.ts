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
