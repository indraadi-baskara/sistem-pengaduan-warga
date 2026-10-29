import { d as defineEventHandler, i as requireAdmin, a as readBody, b as getDb, h as pengguna, c as createError } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { h as hashPassword } from '../../../_/auth.mjs';
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
import 'bcryptjs';

const Body = z.object({
  nama: z.string().min(2).max(100),
  email: z.string().email(),
  peran: z.enum(["pengurus", "admin"]),
  password: z.string().min(8).max(128)
});
const index_post = defineEventHandler(async (event) => {
  requireAdmin(event);
  const body = Body.parse(await readBody(event));
  const db = getDb();
  const normalized = body.email.trim().toLowerCase();
  const [existing] = await db.select().from(pengguna).where(eq(pengguna.email, normalized));
  if (existing) throw createError({ statusCode: 409, message: "Email already registered" });
  const pwHash = await hashPassword(body.password);
  const [created] = await db.insert(pengguna).values({
    nama: body.nama.trim(),
    email: normalized,
    password: pwHash,
    peran: body.peran,
    aktif: true
  }).returning();
  return { id: created.id, nama: created.nama, email: created.email, peran: created.peran, aktif: created.aktif };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
