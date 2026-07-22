import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { initialSchemaSql } from "@/lib/migrations";

export async function POST(req: NextRequest) {
  const confirm = req.nextUrl.searchParams.get("confirm");
  if (confirm !== "create-budruum-schema") {
    return NextResponse.json({ error: "Missing setup confirmation." }, { status: 403 });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  const sql = neon(databaseUrl) as unknown as (query: string) => Promise<unknown>;
  const applied: string[] = [];

  for (const statement of initialSchemaSql) {
    await sql(statement);
    const match = statement.match(/CREATE TABLE IF NOT EXISTS "([^"]+)"/);
    applied.push(match?.[1] || "statement");
  }

  return NextResponse.json({ ok: true, applied });
}
