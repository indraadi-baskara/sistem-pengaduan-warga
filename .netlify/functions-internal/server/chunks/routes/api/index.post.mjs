import { d as defineEventHandler, i as requireAdmin, a as readBody, b as getDb, k as kategori } from '../../nitro/nitro.mjs';
import { z } from 'zod';
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

const Body = z.object({ nama: z.string().min(2).max(80) });
const index_post = defineEventHandler(async (event) => {
  requireAdmin(event);
  const { nama } = Body.parse(await readBody(event));
  const db = getDb();
  const [created] = await db.insert(kategori).values({ nama: nama.trim() }).returning();
  return created;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
