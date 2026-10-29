import { C as useRoute, a as useHead } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { S as StatusBadge_default } from './StatusBadge-Bk82bS9D.mjs';
import { A as AppAlert_default } from './AppAlert-gLt8pBzn.mjs';
import { defineComponent, ref, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

// pages/pengaduan/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		useRoute();
		const item = ref(null);
		const loading = ref(true);
		const err = ref("");
		function toDate(v) {
			if (v == null) return null;
			const n = Number(v);
			if (Number.isNaN(n)) return new Date(v);
			return new Date(n < 0xe8d4a51000 ? n * 1e3 : n);
		}
		function fmtDate(v) {
			const d = toDate(v);
			return d ? d.toLocaleString("id-ID") : "-";
		}
		useHead({ title: () => item.value ? `${item.value.kode} — Detail` : "Detail Pengaduan" });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			const _component_AppAlert = AppAlert_default;
			const _component_StatusBadge = StatusBadge_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/pengaduan/riwayat",
				class: "text-sm text-[#1976F3] inline-flex items-center gap-1"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_Icon, {
							name: "lucide:arrow-left",
							size: "14"
						}, null, _parent, _scopeId));
						_push(` Kembali`);
					} else return [createVNode(_component_Icon, {
						name: "lucide:arrow-left",
						size: "14"
					}), createTextVNode(" Kembali")];
				}),
				_: 1
			}, _parent));
			if (unref(loading)) _push(`<div class="mt-4 p-10 text-center text-sm text-muted">Memuat...</div>`);
			else if (unref(err)) _push(ssrRenderComponent(_component_AppAlert, {
				type: "error",
				message: unref(err),
				class: "mt-4"
			}, null, _parent));
			else {
				_push(`<div class="mt-4 space-y-4"><div class="bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-xs text-muted">${ssrInterpolate(unref(item).kode)}</p><h1 class="text-lg font-extrabold">${ssrInterpolate(unref(item).deskripsi?.split("\n")[0])}</h1><p class="text-sm text-muted flex items-center gap-1 mt-1">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "lucide:map-pin",
					size: "14"
				}, null, _parent));
				_push(`${ssrInterpolate(unref(item).lokasi)}</p></div>`);
				_push(ssrRenderComponent(_component_StatusBadge, { status: unref(item).status }, null, _parent));
				_push(`</div><div class="mt-4 grid sm:grid-cols-2 gap-3 text-sm"><div class="rounded-xl bg-[#F8FAFF] border border-[#E5EDF5] p-3"><p class="text-xs text-muted">Kategori</p><p class="font-semibold">${ssrInterpolate(unref(item).kategori?.nama || "-")}</p></div><div class="rounded-xl bg-[#F8FAFF] border border-[#E5EDF5] p-3"><p class="text-xs text-muted">Tanggal</p><p class="font-semibold">${ssrInterpolate(fmtDate(unref(item).createdAt))}</p></div></div><div class="mt-4"><p class="text-sm font-semibold">Deskripsi</p><p class="text-sm text-muted whitespace-pre-wrap mt-1">${ssrInterpolate(unref(item).deskripsi)}</p></div>`);
				if (unref(item).lampiran?.length) {
					_push(`<div class="mt-4"><p class="text-sm font-semibold">Lampiran</p><div class="mt-2 flex flex-wrap gap-2"><!--[-->`);
					ssrRenderList(unref(item).lampiran, (l) => {
						_push(`<span class="px-3 py-1 rounded-full bg-[#EAF6FF] text-xs">${ssrInterpolate(l.namaFile)}</span>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`</div><div class="bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card"><h2 class="font-extrabold">Riwayat Status</h2>`);
				if (!unref(item).riwayat?.length) _push(`<div class="mt-3 text-sm text-muted">Belum ada pembaruan</div>`);
				else {
					_push(`<ol class="mt-3 space-y-3"><!--[-->`);
					ssrRenderList(unref(item).riwayat, (r) => {
						_push(`<li class="flex gap-3"><span class="w-2 h-2 rounded-full bg-[#1976F3] mt-2 shrink-0"></span><div class="rounded-xl border border-[#E5EDF5] bg-[#F8FAFF] px-3 py-2 flex-1"><p class="text-sm font-semibold capitalize">${ssrInterpolate(r.status)} <span class="text-muted font-normal">· ${ssrInterpolate(fmtDate(r.createdAt))}</span></p>`);
						if (r.catatan) _push(`<p class="text-xs text-muted mt-1">${ssrInterpolate(r.catatan)}</p>`);
						else _push(`<!---->`);
						_push(`</div></li>`);
					});
					_push(`<!--]--></ol>`);
				}
				_push(`</div></div>`);
			}
			_push(`</div>`);
		};
	}
});
// pages/pengaduan/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pengaduan/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-CBhiuL41.mjs.map
