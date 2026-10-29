import { d as defineEventHandler, n as clearUserSession } from '../../../nitro/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  await clearUserSession(event);
  return { ok: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
