import { d as defineEventHandler, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
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

const env_get = defineEventHandler(() => {
  var _a, _b, _c;
  const cfg = (() => {
    try {
      return useRuntimeConfig();
    } catch {
      return {};
    }
  })();
  const dbUrl = cfg.databaseUrl || process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL || "";
  const sessPw = ((_a = cfg.session) == null ? void 0 : _a.password) || cfg.sessionPassword || process.env.NUXT_SESSION_PASSWORD || process.env.BETTER_AUTH_SECRET || "";
  return {
    runtimeConfig: {
      databaseUrlPresent: !!cfg.databaseUrl,
      sessionPasswordPresent: !!(((_b = cfg.session) == null ? void 0 : _b.password) || cfg.sessionPassword),
      sessionPasswordLen: String(((_c = cfg.session) == null ? void 0 : _c.password) || cfg.sessionPassword || "").length
    },
    processEnv: {
      NUXT_DATABASE_URL_present: !!process.env.NUXT_DATABASE_URL,
      NUXT_DATABASE_URL_len: String(process.env.NUXT_DATABASE_URL || "").length,
      NUXT_SESSION_PASSWORD_present: !!process.env.NUXT_SESSION_PASSWORD,
      NUXT_SESSION_PASSWORD_len: String(process.env.NUXT_SESSION_PASSWORD || "").length,
      DATABASE_URL_present: !!process.env.DATABASE_URL
    },
    derived: {
      dbUrlLen: String(dbUrl).length,
      sessionPasswordLen: String(sessPw).length,
      sessionPasswordOk: String(sessPw).length >= 32
    }
  };
});

export { env_get as default };
//# sourceMappingURL=env.get.mjs.map
