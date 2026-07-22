import { neon } from "@neondatabase/serverless";

let ensured = false;

export async function ensurePlatformTables() {
  if (ensured) return;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return;
  const sql = neon(databaseUrl);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS "project_function" (
      "id" text PRIMARY KEY NOT NULL,
      "project_id" text NOT NULL REFERENCES "project"("id") ON DELETE cascade,
      "name" text NOT NULL,
      "status" text DEFAULT 'active' NOT NULL,
      "response_body" text NOT NULL,
      "created_at" timestamp NOT NULL,
      "updated_at" timestamp NOT NULL
    )
  `);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS "project_policy" (
      "id" text PRIMARY KEY NOT NULL,
      "project_id" text NOT NULL REFERENCES "project"("id") ON DELETE cascade,
      "table_name" text NOT NULL,
      "read_mode" text DEFAULT 'public' NOT NULL,
      "write_mode" text DEFAULT 'public' NOT NULL,
      "created_at" timestamp NOT NULL,
      "updated_at" timestamp NOT NULL
    )
  `);

  ensured = true;
}
