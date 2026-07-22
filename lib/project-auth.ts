import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import { nanoid } from "nanoid";
import { getProjectSql, qualifyTable } from "@/lib/project-db";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("hex");
  return `pbkdf2_sha256$100000$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [algo, roundsRaw, salt, expected] = stored.split("$");
  if (algo !== "pbkdf2_sha256" || !roundsRaw || !salt || !expected) return false;
  const rounds = Number(roundsRaw);
  const actual = pbkdf2Sync(password, salt, rounds, 32, "sha256");
  const expectedBuffer = Buffer.from(expected, "hex");
  return expectedBuffer.length === actual.length && timingSafeEqual(expectedBuffer, actual);
}

export function newSessionToken() {
  return `bud_session_${nanoid(48)}`;
}

export async function createProjectSession(projectId: string, dbUrl: string | null | undefined, userId: string) {
  const sql = getProjectSql(dbUrl);
  const token = newSessionToken();
  const sessionId = `sess_${nanoid(24)}`;
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await sql.query(
    `INSERT INTO ${qualifyTable(projectId, "auth_sessions")} ("id", "user_id", "token", "expires_at") VALUES ($1, $2, $3, $4)`,
    [sessionId, userId, token, expiresAt]
  );
  return { token, expiresAt };
}
