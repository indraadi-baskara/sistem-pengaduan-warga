import { d as defineNuxtRouteMiddleware, e as executeAsync, n as navigateTo } from '../virtual/entry.mjs';
import { u as useAuth } from './useAuth-DE_CnqO1.mjs';
import 'node:module';
import 'node:buffer';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'vue';
import 'vue-router';
import '../nitro/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'drizzle-orm/neon-http';
import '@neondatabase/serverless';
import 'drizzle-orm/pg-core';
import 'drizzle-orm';
import 'node:crypto';
import 'node:events';
import 'node:fs/promises';
import '@iconify/utils';
import 'consola';
import 'vue/server-renderer';

// middleware/auth.ts
var auth_default = defineNuxtRouteMiddleware(async () => {
	let __temp, __restore;
	const { user, fetchMe } = useAuth();
	if (!user.value) [__temp, __restore] = executeAsync(() => fetchMe()), __temp = await __temp, __restore();
	if (!user.value) return navigateTo("/login");
});

export { auth_default as default };
//# sourceMappingURL=auth-opVItwiI.mjs.map
