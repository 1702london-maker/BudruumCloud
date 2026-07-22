import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { projectPolicy } from "@/lib/schema";
import { ensurePlatformTables } from "@/lib/platform-tables";

export type PolicyMode = "public" | "service";

export async function getTablePolicy(projectId: string, tableName: string) {
  await ensurePlatformTables();
  const [policy] = await db.select().from(projectPolicy)
    .where(and(eq(projectPolicy.projectId, projectId), eq(projectPolicy.tableName, tableName)));
  return policy || null;
}

export async function ensureTablePolicy(projectId: string, tableName: string) {
  await ensurePlatformTables();
  const existing = await getTablePolicy(projectId, tableName);
  if (existing) return existing;
  const now = new Date();
  const [created] = await db.insert(projectPolicy).values({
    id: `pol_${nanoid(18)}`,
    projectId,
    tableName,
    readMode: "public",
    writeMode: "public",
    createdAt: now,
    updatedAt: now,
  }).returning();
  return created;
}

export async function listPolicies(projectId: string, tableNames: string[]) {
  const policies = await Promise.all(tableNames.map((table) => ensureTablePolicy(projectId, table)));
  return policies;
}

export function canRead(policy: { readMode: string } | null, keyType: string) {
  return (policy?.readMode || "public") === "public" || keyType === "service";
}

export function canWrite(policy: { writeMode: string } | null, keyType: string) {
  return (policy?.writeMode || "public") === "public" || keyType === "service";
}
