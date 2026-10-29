import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { useStorage } from "#internal/nitro";

let migrated = false;
let migrating: Promise<void> | null = null;

export async function ensureMigrated(): Promise<void> {
  if (migrated) return;
  if (migrating) return migrating;
  migrating = (async () => {
    const url = process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL;
    if (!url) {
      console.warn("[migrate] skip: no DATABASE_URL");
      return;
    }
    const { neon } = await import("@neondatabase/serverless");
    const sql_client = neon(url);
    try {
      const check = await sql_client`SELECT to_regclass('public.pengguna') as exists_col`;
      const loadSql = async (name: string) => {
        for (const key of ["assets:migrations", "assets:server", "raw"] as const) {
          try {
            const storage = useStorage(key as any);
            const v = (await storage.getItem(name)) as string | null;
            if (v) return v;
          } catch {}
        }
        return await readFile(join(process.cwd(), `server/db/migrations/${name}`), "utf8");
      };
      const runChunks = async (sql: string) => {
        const chunks = sql.split("--> statement-breakpoint").map((s) => s.trim()).filter(Boolean);
        for (const chunk of chunks) {
          if (!chunk) continue;
          try {
            await (sql_client as any).query(chunk, []);
          } catch (e: any) {
            if (!/already exists/i.test(e.message)) throw e;
          }
        }
      };
      if (!(check as any[])[0]?.exists_col) {
        console.log("[migrate] pengguna table missing — running initial migration");
        const sql = await loadSql("0000_neon_init.sql");
        await runChunks(sql);
        console.log("[migrate] 0000 done");
      }
      migrated = true;
    } catch (e: any) {
      console.error("[migrate] failed:", e.message?.slice(0, 500));
      throw e;
    }
  })();
  return migrating;
}
