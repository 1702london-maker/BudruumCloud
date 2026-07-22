import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { ensureProjectDatabase, getProjectSchemaName, getProjectSql, quoteIdent } from "@/lib/project-db";

function splitSqlStatements(input: string) {
  const statements: string[] = [];
  let current = "";
  let quote: "'" | "\"" | null = null;
  let dollarTag: string | null = null;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const next = input[i + 1];

    if (!quote && !dollarTag && char === "-" && next === "-") {
      while (i < input.length && input[i] !== "\n") i++;
      current += "\n";
      continue;
    }

    if (!quote && char === "$") {
      const rest = input.slice(i);
      const match = rest.match(/^\$[a-zA-Z_][a-zA-Z0-9_]*\$|^\$\$/);
      if (match) {
        const tag = match[0];
        current += tag;
        i += tag.length - 1;
        dollarTag = dollarTag === tag ? null : tag;
        continue;
      }
    }

    if (!dollarTag && (char === "'" || char === "\"")) {
      current += char;
      if (quote === char && next === char) {
        current += next;
        i++;
        continue;
      }
      quote = quote === char ? null : quote ? quote : char;
      continue;
    }

    if (!quote && !dollarTag && char === ";") {
      if (current.trim()) statements.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) statements.push(current.trim());
  return statements;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [proj] = await db.select().from(project)
    .where(and(eq(project.id, id), eq(project.ownerId, session.user.id)));
  if (!proj) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { sql } = await req.json();
  if (!sql?.trim()) return NextResponse.json({ error: "SQL is required" }, { status: 400 });

  const forbidden = /^\s*(drop|delete|truncate|alter)\s/i;
  const statements = splitSqlStatements(sql);
  if (statements.some((statement) => forbidden.test(statement))) {
    return NextResponse.json({ error: "Destructive queries are disabled in the editor." }, { status: 403 });
  }

  try {
    await ensureProjectDatabase(id, proj.dbUrl);
    const neonSql = getProjectSql(proj.dbUrl);
    const schema = quoteIdent(getProjectSchemaName(id));
    const results = await neonSql.transaction((txn) => [
      txn`SET LOCAL search_path TO ${txn.unsafe(`${schema}, public`)}`,
      ...statements.map((statement) => txn`${txn.unsafe(statement)}`),
    ]);
    const rows = results.at(-1) || [];
    return NextResponse.json({ rows, results: results.slice(1) });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Query failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
