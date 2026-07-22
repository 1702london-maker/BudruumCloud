import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";

export async function POST() {
  const id = `debug_${nanoid()}`;
  const now = new Date();

  try {
    await db.insert(user).values({
      id,
      name: "Debug User",
      email: `${id}@budruum.invalid`,
      emailVerified: false,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ ok: true, inserted: "user" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Debug insert failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
