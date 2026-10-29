import { d as defineEventHandler, i as requireAdmin, b as getDb, h as pengguna } from '../../../nitro/nitro.mjs';
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
  const rows = await db.select().from(pengguna);
  return rows.map((u) => ({
    id: u.id,
    nama: u.nama,
    email: u.email,
    peran: u.peran,
    aktif: u.aktif,
    createdAt: u.createdAt
  }));
});

export { index_get as default };
//# sourceMappingURL=index3.get.mjs.map
