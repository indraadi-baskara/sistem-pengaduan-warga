import { d as defineEventHandler, i as requireAdmin, g as getRouterParam, c as createError, a as readBody, b as getDb, h as pengguna } from '../../../../../nitro/nitro.mjs';
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

const Body = z.object({ aktif: z.boolean() });
const deactivate_patch = defineEventHandler(async (event) => {
  const admin = requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const { aktif } = Body.parse(await readBody(event));
  if (admin.id === id && !aktif) throw createError({ statusCode: 400, message: "Cannot deactivate own account" });
  const db = getDb();
  const [updated] = await db.update(pengguna).set({ aktif, updatedAt: sql`extract(epoch from now())::int` }).where(eq(pengguna.id, id)).returning();
  if (!updated) throw createError({ statusCode: 404, message: "User not found" });
  return { id: updated.id, aktif: updated.aktif };
});

export { deactivate_patch as default };
//# sourceMappingURL=deactivate.patch.mjs.map
