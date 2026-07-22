import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { apiKey, project } from "@/lib/schema";

export async function requireProjectApiKey(request: Request, projectId: string) {
  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";

  if (!token) {
    return { error: "Missing bearer token", status: 401 as const };
  }

  const [record] = await db
    .select({
      keyId: apiKey.id,
      keyType: apiKey.type,
      projectId: project.id,
      dbUrl: project.dbUrl,
      ownerId: project.ownerId,
    })
    .from(apiKey)
    .innerJoin(project, eq(project.id, apiKey.projectId))
    .where(and(eq(apiKey.key, token), eq(project.id, projectId)));

  if (!record) {
    return { error: "Invalid API key", status: 401 as const };
  }

  return { project: record };
}

export function isSafeIdentifier(value: string) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
}
