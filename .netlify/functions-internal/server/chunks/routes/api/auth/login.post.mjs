import { d as defineEventHandler, l as enforceRateLimit, m as ensureMigrated, a as readBody, b as getDb, h as pengguna, c as createError, s as setUserSession } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import { v as verifyPassword } from '../../../_/auth.mjs';
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
  email: z.string().email(),
  password: z.string().min(1)
});
const login_post = defineEventHandler(async (event) => {
  var _a, _b;
  enforceRateLimit(event, { windowMs: 6e4, max: 10, key: "auth:login" });
  await ensureMigrated();
  const body = Body.parse(await readBody(event));
  const db = getDb();
  const normalized = body.email.trim().toLowerCase();
  const [u] = await db.select().from(pengguna).where(eq(pengguna.email, normalized));
  if (!u) throw createError({ statusCode: 401, message: "Invalid email or password" });
  if (!u.aktif) throw createError({ statusCode: 403, message: "Account deactivated \u2014 contact admin" });
  const ok = await verifyPassword(body.password, u.password);
  if (!ok) throw createError({ statusCode: 401, message: "Invalid email or password" });
  const safeUser = { id: u.id, nama: u.nama, email: u.email, peran: u.peran };
  try {
    await setUserSession(event, { user: safeUser });
  } catch (e) {
    console.error("[auth/login] setUserSession failed:", (_a = e == null ? void 0 : e.message) == null ? void 0 : _a.slice(0, 300));
    throw createError({
      statusCode: 500,
      message: ((_b = e == null ? void 0 : e.message) == null ? void 0 : _b.includes("Password string too short")) ? "Server misconfigured: NUXT_SESSION_PASSWORD must be >=32 chars (check Netlify env)" : `Session error: ${(e == null ? void 0 : e.message) || "unknown"}`
    });
  }
  return { user: safeUser };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
