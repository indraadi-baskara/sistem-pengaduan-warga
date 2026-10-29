import { getDb } from "../db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async () => {
  try {
    const db = getDb();
    // simple ping
    await db.run(sql`SELECT 1`);
    return { ok: true, db: "up" };
  } catch (e: any) {
    return { ok: false, db: e.message?.slice(0, 200) };
  }
});
