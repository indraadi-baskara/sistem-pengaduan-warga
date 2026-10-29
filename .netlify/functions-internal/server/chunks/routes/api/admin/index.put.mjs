import { d as defineEventHandler, i as requireAdmin, a as readBody, T as TOGGLEABLE_PROPS, c as createError, b as getDb, j as pengaturanPublik } from '../../../nitro/nitro.mjs';
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

const Body = z.object({
  namaProperti: z.string().min(1),
  tampilPublik: z.boolean()
});
const index_put = defineEventHandler(async (event) => {
  requireAdmin(event);
  const { namaProperti, tampilPublik } = Body.parse(await readBody(event));
  if (!TOGGLEABLE_PROPS.includes(namaProperti)) {
    throw createError({ statusCode: 400, message: `Property '${namaProperti}' is not configurable. Allowed: ${TOGGLEABLE_PROPS.join(", ")}` });
  }
  const db = getDb();
  const [updated] = await db.update(pengaturanPublik).set({ namaProperti, tampilPublik }).where(eq(pengaturanPublik.namaProperti, namaProperti)).returning();
  if (!updated) throw createError({ statusCode: 404, message: "Property not found" });
  return updated;
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
