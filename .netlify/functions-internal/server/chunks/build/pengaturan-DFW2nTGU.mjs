import { a as useHead } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { A as AppAlert_default } from './AppAlert-gLt8pBzn.mjs';
import { defineComponent, ref, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// pages/admin/pengaturan.vue?vue&type=script&setup=true&lang.ts
var pengaturan_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "pengaturan",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Pengaturan Publik — Admin" });
		const rows = ref([]);
		const saving = ref(null);
		const msg = ref("");
		const err = ref("");
		const labels = {
			kategori: "Kategori",
			lokasi: "Lokasi",
			deskripsi: "Deskripsi",
			lampiran: "Lampiran",
			riwayat: "Riwayat Status"
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_AppAlert = AppAlert_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin",
				class: "text-sm text-[#1976F3]"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`← Kembali`);
					else return [createTextVNode("← Kembali")];
				}),
				_: 1
			}, _parent));
			_push(`<h1 class="text-xl font-extrabold mt-2">Pengaturan Tampil Publik</h1><p class="text-sm text-muted">Atur field apa yang terlihat di daftar/detail publik. Perubahan langsung aktif tanpa deploy (FR-07).</p>`);
			if (unref(err)) _push(ssrRenderComponent(_component_AppAlert, {
				type: "error",
				message: unref(err),
				class: "mt-4"
			}, null, _parent));
			else _push(`<!---->`);
			if (unref(msg)) _push(ssrRenderComponent(_component_AppAlert, {
				type: "success",
				message: unref(msg),
				class: "mt-4"
			}, null, _parent));
			else _push(`<!---->`);
			_push(`<div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card max-w-[600px]">`);
			if (!unref(rows).length) _push(`<p class="text-sm text-muted">Memuat...</p>`);
			else {
				_push(`<div class="space-y-3"><!--[-->`);
				ssrRenderList(unref(rows), (row) => {
					_push(`<label class="flex items-center justify-between p-3 rounded-xl border border-[#E5EDF5] bg-[#F8FAFF]"><span class="text-sm font-semibold">${ssrInterpolate(labels[row.namaProperti] ?? row.namaProperti)}</span><span class="flex items-center gap-2"><span class="text-xs text-muted">${ssrInterpolate(row.tampilPublik ? "Tampil" : "Hidden")}</span><input type="checkbox"${ssrIncludeBooleanAttr(row.tampilPublik) ? " checked" : ""}${ssrIncludeBooleanAttr(unref(saving) === row.namaProperti) ? " disabled" : ""} class="w-5 h-5 rounded border-[#DCE8F1] text-[#1976F3] disabled:opacity-50"></span></label>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`<p class="mt-4 text-xs text-muted">\`kode\` dan \`status\` selalu tampil dan tidak dapat disembunyikan. Identitas pelapor tidak pernah diekspos.</p></div></div>`);
		};
	}
});
// pages/admin/pengaturan.vue
var _sfc_setup = pengaturan_vue_vue_type_script_setup_true_lang_default.setup;
pengaturan_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/pengaturan.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pengaturan_default = pengaturan_vue_vue_type_script_setup_true_lang_default;

export { pengaturan_default as default };
//# sourceMappingURL=pengaturan-DFW2nTGU.mjs.map
