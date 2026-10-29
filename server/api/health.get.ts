import { getDb } from "../db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async () => {
  try {
    const db = getDb();
    // Neon http driver uses .execute, pg uses .execute as well
    if ((db as any).execute) await (db as any).execute(sql`SELECT 1`);
    else if ((db as any).run) await (db as any).run(sql`SELECT 1`);
    return { ok: true, db: "up" };
  } catch (e: any) {
    return { ok: false, db: e.message?.slice(0, 200) };
  }
});
