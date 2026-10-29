import { d as defineEventHandler, w as requireAuth } from '../../nitro/nitro.mjs';
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

const me_get = defineEventHandler(async (event) => {
  const user = requireAuth(event);
  return { user };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
