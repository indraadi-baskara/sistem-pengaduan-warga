import { d as defineEventHandler, i as requireAdmin, b as getDb, j as pengaturanPublik } from '../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  requireAdmin(event);
  const db = getDb();
  const rows = await db.select().from(pengaturanPublik).orderBy(pengaturanPublik.namaProperti);
  return rows;
});

export { index_get as default };
//# sourceMappingURL=index2.get.mjs.map
