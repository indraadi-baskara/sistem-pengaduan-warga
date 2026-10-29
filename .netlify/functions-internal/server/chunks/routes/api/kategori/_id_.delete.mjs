import { d as defineEventHandler, i as requireAdmin, g as getRouterParam, c as createError, b as getDb, p as pengaduan, k as kategori } from '../../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const _id__delete = defineEventHandler(async (event) => {
  requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const db = getDb();
  const [inUse] = await db.select().from(pengaduan).where(eq(pengaduan.idKategori, id)).limit(1);
  if (inUse) throw createError({ statusCode: 409, message: "Cannot delete kategori in use by pengaduan" });
  const [deleted] = await db.delete(kategori).where(eq(kategori.id, id)).returning();
  if (!deleted) throw createError({ statusCode: 404, message: "Kategori not found" });
  return { ok: true, id: deleted.id };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
