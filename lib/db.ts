import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

type Database = ReturnType<typeof drizzle>;

let cachedDb: Database | null = null;

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required. Add it to .env.local and your Vercel environment variables.");
  }

  if (!cachedDb) {
    cachedDb = drizzle(neon(databaseUrl));
  }

  return cachedDb;
}

export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});
