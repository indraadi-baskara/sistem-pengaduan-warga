import { d as defineEventHandler, b as getDb } from '../../nitro/nitro.mjs';
import { sql } from 'drizzle-orm';
import 'unhead/server';
import 'vue';
import 'unhead/legacy';
import 'unhead/plugins';
import 'drizzle-orm/neon-http';
import '@neondatabase/serverless';
import 'drizzle-orm/pg-core';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:fs/promises';
import '@iconify/utils';
import 'consola';

const health_get = defineEventHandler(async () => {
  var _a;
  try {
    const db = getDb();
    if (db.execute) await db.execute(sql`SELECT 1`);
    else if (db.run) await db.run(sql`SELECT 1`);
    return { ok: true, db: "up" };
  } catch (e) {
    return { ok: false, db: (_a = e.message) == null ? void 0 : _a.slice(0, 200) };
  }
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
