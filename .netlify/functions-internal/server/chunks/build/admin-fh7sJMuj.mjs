import { a as useHead, $ as $fetch } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { A as AppButton_default } from './AppButton-Bs21ZYWr.mjs';
import { S as StatusBadge_default } from './StatusBadge-Bk82bS9D.mjs';
import { defineComponent, ref, watch, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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

// pages/admin/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Admin — Pengaduan Masuk" });
		const items = ref([]);
		const status = ref("");
		const q = ref("");
		const loading = ref(true);
		async function load() {
			loading.value = true;
			try {
				const r = await $fetch("/api/admin/pengaduan", { query: {
					status: status.value || void 0,
					q: q.value || void 0
				} });
				items.value = r.data ?? r ?? [];
			} catch {
				items.value = [];
			} finally {
				loading.value = false;
			}
		}
		watch(status, load);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppButton = AppButton_default;
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			_push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-xl font-extrabold">Kelola Pengaduan</h1><p class="text-sm text-muted">Hanya untuk pengurus &amp; admin</p><div class="mt-4 flex flex-wrap gap-2"><input${ssrRenderAttr("value", unref(q))} placeholder="Cari kode / lokasi" class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm flex-1 min-w-[200px]"><select class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "") : ssrLooseEqual(unref(status), "")) ? " selected" : ""}>Semua</option><option value="diterima"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "diterima") : ssrLooseEqual(unref(status), "diterima")) ? " selected" : ""}>Diterima</option><option value="diproses"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "diproses") : ssrLooseEqual(unref(status), "diproses")) ? " selected" : ""}>Diproses</option><option value="selesai"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "selesai") : ssrLooseEqual(unref(status), "selesai")) ? " selected" : ""}>Selesai</option></select>`);
			_push(ssrRenderComponent(_component_AppButton, {
				size: "sm",
				onClick: load
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Cari`);
					else return [createTextVNode("Cari")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/users",
				class: "h-10 px-4 rounded-xl border border-[#DCE8F1] bg-white text-sm font-semibold inline-flex items-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Kelola User`);
					else return [createTextVNode("Kelola User")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/pengaturan",
				class: "h-10 px-4 rounded-xl border border-[#DCE8F1] bg-white text-sm font-semibold inline-flex items-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Pengaturan Publik`);
					else return [createTextVNode("Pengaturan Publik")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] shadow-card overflow-hidden">`);
			if (unref(loading)) _push(`<div class="p-8 text-center text-sm text-muted">Memuat...</div>`);
			else if (!unref(items).length) _push(`<div class="p-8 text-center text-sm text-muted">Tidak ada data</div>`);
			else {
				_push(`<div class="divide-y divide-[#E5EDF5]"><!--[-->`);
				ssrRenderList(unref(items), (it) => {
					_push(`<div class="p-4 flex flex-wrap items-center justify-between gap-3"><div class="min-w-0"><p class="text-sm font-bold">${ssrInterpolate(it.kode)} · <span class="text-muted font-normal">${ssrInterpolate(it.lokasi)}</span></p><p class="text-xs text-muted truncate max-w-[520px]">${ssrInterpolate(it.deskripsi?.split("\n")[0])}</p></div><div class="flex items-center gap-2">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: it.status }, null, _parent));
					_push(`<select${ssrRenderAttr("value", it.status)} class="h-8 rounded-full border border-[#DCE8F1] bg-white px-2 text-xs"><option value="diterima">Diterima</option><option value="diproses">Diproses</option><option value="selesai">Selesai</option></select><button class="${ssrRenderClass(["h-8 px-3 rounded-full text-xs font-semibold border", it.tampilPublik ? "bg-white border-[#DCE8F1]" : "bg-[#FEE2E2] border-[#FECACA] text-[#991B1B]"])}">${ssrInterpolate(it.tampilPublik ? "Publik" : "Hidden")}</button></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
// pages/admin/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = index_vue_vue_type_script_setup_true_lang_default;

export { admin_default as default };
//# sourceMappingURL=admin-fh7sJMuj.mjs.map
