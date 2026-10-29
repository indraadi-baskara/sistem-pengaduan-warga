import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

let client: ReturnType<typeof createClient> | null = null;
let db: ReturnType<typeof drizzleLibsql> | null = null;

function getDatabaseUrl(): string {
  try {
    const cfg = useRuntimeConfig() as any;
    if (cfg.databaseUrl) return cfg.databaseUrl;
  } catch {}
  return process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL || "file:./data/lapor.db";
}

function getAuthToken(): string | undefined {
  try {
    const cfg = useRuntimeConfig() as any;
    // Nitro runtime may expose TURSO_AUTH_TOKEN via env
    if ((cfg as any).tursoAuthToken) return (cfg as any).tursoAuthToken;
  } catch {}
  return process.env.TURSO_AUTH_TOKEN || process.env.NUXT_TURSO_AUTH_TOKEN || undefined;
}

export async function getDbAsync() {
  const { ensureMigrated } = await import("../utils/migrate");
  await ensureMigrated();
  return getDb();
}

export function getDb() {
  if (db) return db as any;
  const url = getDatabaseUrl();
  const authToken = getAuthToken();
  // libSQL client handles both file: and libsql:// URLs; authToken only needed for Turso remote.
  client = createClient({ url, authToken });
  db = drizzleLibsql(client as any, { schema }) as any;
  return db as any;
}

export type Db = ReturnType<typeof getDb>;
