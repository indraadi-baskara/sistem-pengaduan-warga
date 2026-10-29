import { d as defineEventHandler, l as enforceRateLimit, m as ensureMigrated, a as readBody, b as getDb, h as pengguna, c as createError, s as setUserSession } from '../../../nitro/nitro.mjs';
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
  password: z.string().min(8).max(128)
});
const register_post = defineEventHandler(async (event) => {
  var _a, _b;
  enforceRateLimit(event, { windowMs: 6e4, max: 5, key: "auth:register" });
  await ensureMigrated();
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
    peran: "pelapor",
    aktif: true
  }).returning();
  const safeUser = { id: created.id, nama: created.nama, email: created.email, peran: created.peran };
  try {
    await setUserSession(event, { user: safeUser });
  } catch (e) {
    console.error("[auth/register] setUserSession failed:", (_a = e == null ? void 0 : e.message) == null ? void 0 : _a.slice(0, 300));
    throw createError({
      statusCode: 500,
      message: ((_b = e == null ? void 0 : e.message) == null ? void 0 : _b.includes("Password string too short")) ? "Server misconfigured: NUXT_SESSION_PASSWORD must be >=32 chars (check Netlify env)" : `Session error: ${(e == null ? void 0 : e.message) || "unknown"}`
    });
  }
  return { user: safeUser };
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
