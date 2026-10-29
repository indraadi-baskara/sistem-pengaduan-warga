import { d as defineEventHandler, i as requireAdmin, g as getRouterParam, c as createError, a as readBody, b as getDb, h as pengguna } from '../../../../nitro/nitro.mjs';
import { z } from 'zod';
import { h as hashPassword } from '../../../../_/auth.mjs';
import { eq, sql } from 'drizzle-orm';
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
  nama: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  peran: z.enum(["pelapor", "pengurus", "admin"]).optional(),
  aktif: z.boolean().optional(),
  password: z.string().min(8).max(128).optional()
  // admin reset
});
const _id__patch = defineEventHandler(async (event) => {
  const admin = requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const body = Body.parse(await readBody(event));
  if (admin.id === id && body.aktif === false) throw createError({ statusCode: 400, message: "Cannot deactivate own account" });
  if (admin.id === id && body.peran && body.peran !== admin.peran) throw createError({ statusCode: 400, message: "Cannot change own role" });
  const db = getDb();
  const [existing] = await db.select().from(pengguna).where(eq(pengguna.id, id));
  if (!existing) throw createError({ statusCode: 404, message: "User not found" });
  if (body.email) {
    const normalized = body.email.trim().toLowerCase();
    if (normalized !== existing.email) {
      const [dup] = await db.select().from(pengguna).where(eq(pengguna.email, normalized));
      if (dup) throw createError({ statusCode: 409, message: "Email already taken" });
      body.email = normalized;
    }
  }
  const patch = { updatedAt: sql`extract(epoch from now())::int` };
  if (body.nama !== void 0) patch.nama = body.nama.trim();
  if (body.email !== void 0) patch.email = body.email;
  if (body.peran !== void 0) patch.peran = body.peran;
  if (body.aktif !== void 0) patch.aktif = body.aktif;
  if (body.password !== void 0) patch.password = await hashPassword(body.password);
  const [updated] = await db.update(pengguna).set(patch).where(eq(pengguna.id, id)).returning();
  return { id: updated.id, nama: updated.nama, email: updated.email, peran: updated.peran, aktif: updated.aktif };
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
