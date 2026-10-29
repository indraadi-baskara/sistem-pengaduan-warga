import { d as defineEventHandler, i as requireAdmin, g as getRouterParam, c as createError, a as readBody, b as getDb, k as kategori } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
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

const Body = z.object({ nama: z.string().min(2).max(80) });
const _id__put = defineEventHandler(async (event) => {
  requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const { nama } = Body.parse(await readBody(event));
  const db = getDb();
  const [dup] = await db.select().from(kategori).where(eq(kategori.nama, nama.trim()));
  if (dup && dup.id !== id) throw createError({ statusCode: 409, message: "Kategori name already exists" });
  const [updated] = await db.update(kategori).set({ nama: nama.trim() }).where(eq(kategori.id, id)).returning();
  if (!updated) throw createError({ statusCode: 404, message: "Kategori not found" });
  return updated;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
