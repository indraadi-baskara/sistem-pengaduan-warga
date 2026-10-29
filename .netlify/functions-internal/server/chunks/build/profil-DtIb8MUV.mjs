import { u as useAuth } from './useAuth-DE_CnqO1.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import '../virtual/entry.mjs';
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

// pages/profil.vue?vue&type=script&setup=true&lang.ts
var profil_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "profil",
	__ssrInlineRender: true,
	setup(__props) {
		const { user} = useAuth();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-xl font-extrabold">Profil</h1><div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card max-w-[520px]">`);
			if (!unref(user)) _push(`<div class="text-sm text-muted">Memuat...</div>`);
			else _push(`<div class="space-y-3 text-sm"><div><p class="text-xs text-muted">Nama</p><p class="font-semibold">${ssrInterpolate(unref(user).nama)}</p></div><div><p class="text-xs text-muted">Email</p><p class="font-semibold">${ssrInterpolate(unref(user).email)}</p></div><div><p class="text-xs text-muted">Peran</p><p class="font-semibold capitalize">${ssrInterpolate(unref(user).peran)}</p></div><div><p class="text-xs text-muted">Sejak</p><p class="font-semibold">${ssrInterpolate(unref(user).dibuatPada ? new Date(unref(user).dibuatPada).toLocaleDateString("id-ID") : "-")}</p></div></div>`);
			_push(`</div></div>`);
		};
	}
});
// pages/profil.vue
var _sfc_setup = profil_vue_vue_type_script_setup_true_lang_default.setup;
profil_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profil.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var profil_default = profil_vue_vue_type_script_setup_true_lang_default;

export { profil_default as default };
//# sourceMappingURL=profil-DtIb8MUV.mjs.map
