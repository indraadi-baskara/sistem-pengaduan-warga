import { d as defineEventHandler, r as requirePengurusOrAdmin, g as getRouterParam, c as createError, a as readBody, b as getDb, p as pengaduan } from '../../../../../nitro/nitro.mjs';
import { z } from 'zod';
import { sql, eq } from 'drizzle-orm';
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

const Body = z.object({ tampilPublik: z.boolean() });
const visibility_patch = defineEventHandler(async (event) => {
  requirePengurusOrAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const { tampilPublik } = Body.parse(await readBody(event));
  const db = getDb();
  const [updated] = await db.update(pengaduan).set({ tampilPublik, updatedAt: sql`extract(epoch from now())::int` }).where(eq(pengaduan.id, id)).returning();
  if (!updated) throw createError({ statusCode: 404, message: "Pengaduan not found" });
  return updated;
});

export { visibility_patch as default };
//# sourceMappingURL=visibility.patch.mjs.map
