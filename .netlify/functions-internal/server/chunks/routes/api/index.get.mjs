import { d as defineEventHandler, b as getDb, k as kategori } from '../../nitro/nitro.mjs';
import 'unhead/server';
import 'vue';
import 'unhead/legacy';
import 'unhead/plugins';
import 'drizzle-orm/neon-http';
import '@neondatabase/serverless';
import 'drizzle-orm/pg-core';
import 'drizzle-orm';
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

const index_get = defineEventHandler(async () => {
  const db = getDb();
  const rows = await db.select().from(kategori).orderBy(kategori.nama);
  return rows;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
