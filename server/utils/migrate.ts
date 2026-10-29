import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { useStorage } from "#internal/nitro";

let migrated = false;
let migrating: Promise<void> | null = null;

export async function ensureMigrated(): Promise<void> {
  if (migrated) return;
  if (migrating) return migrating;
  migrating = (async () => {
    // Lazy import to avoid pulling libsql when not needed (e.g. non-DB routes)
    const { getDb } = await import("../db");
    const db: any = getDb();
    const client = (db as any).$client ?? (globalThis as any).__libsqlClient;
    // Use raw libsql client for DDL
    let sqlClient: any = null;
    try {
      // drizzle-libsql exposes the underlying client via db.$client in newer versions
      // Fallback: create a fresh client from same URL
      const { createClient } = await import("@libsql/client");
      const url =
        (useRuntimeConfig() as any).databaseUrl ||
        process.env.NUXT_DATABASE_URL ||
        process.env.DATABASE_URL ||
        "file:./data/lapor.db";
      const authToken = process.env.TURSO_AUTH_TOKEN || process.env.NUXT_TURSO_AUTH_TOKEN || undefined;
      sqlClient = createClient({ url, authToken });
    } catch {}

    const loadSql = async (name: string): Promise<string> => {
      for (const key of ["assets:migrations", "assets:server", "raw"] as const) {
        try {
          const storage = useStorage(key as any);
          const v = (await storage.getItem(name)) as string | null;
          if (v) return v;
        } catch {}
      }
      return await readFile(join(process.cwd(), `server/db/migrations/${name}`), "utf8");
    };

    const runSqlFile = async (name: string) => {
      const sql = await loadSql(name);
      // drizzle-kit generates statements separated by --> statement-breakpoint
      const chunks = sql.split("--> statement-breakpoint").map((s) => s.trim()).filter(Boolean);
      for (const chunk of chunks) {
        if (!chunk) continue;
        try {
          if (sqlClient) await sqlClient.execute(chunk);
          else await db.run ? db.run(chunk) : db.execute(chunk);
        } catch (e: any) {
          if (/already exists/i.test(e.message)) continue;
          throw e;
        }
      }
    };

    try {
      // Check if core table exists (sqlite_master)
      let tableExists = false;
      try {
        if (sqlClient) {
          const r = await sqlClient.execute(`SELECT name FROM sqlite_master WHERE type='table' AND name='pengguna'`);
          tableExists = (r.rows?.length ?? 0) > 0;
        } else {
          const r = await db.all ? db.all(sql`SELECT name FROM sqlite_master WHERE type='table' AND name='pengguna'`) : null;
          tableExists = Array.isArray(r) && r.length > 0;
        }
      } catch {}

      if (!tableExists) {
        console.log("[migrate] pengguna table missing — running initial migration");
        // Find the initial migration file (drizzle-kit names it 0000_*.sql)
        const { readdir } = await import("node:fs/promises");
        let files: string[] = [];
        try {
          files = await readdir(join(process.cwd(), "server/db/migrations"));
        } catch {
          // Nitro asset path
          files = ["0000_init.sql"];
        }
        const initial = files.filter((f) => f.endsWith(".sql")).sort()[0];
        if (initial) {
          await runSqlFile(initial);
          console.log(`[migrate] ${initial} done`);
        }
      }

      migrated = true;
    } catch (e: any) {
      console.error("[migrate] failed:", e.message?.slice(0, 500));
      throw e;
    }
  })();
  return migrating;
}
