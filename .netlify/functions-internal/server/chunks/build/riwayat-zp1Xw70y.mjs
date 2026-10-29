import { a as useHead } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { S as StatusBadge_default } from './StatusBadge-Bk82bS9D.mjs';
import { defineComponent, ref, computed, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

// pages/pengaduan/riwayat.vue?vue&type=script&setup=true&lang.ts
var riwayat_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "riwayat",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Riwayat — Pengaduan Masyarakat" });
		const items = ref([]);
		const q = ref("");
		const statusFilter = ref("");
		const loading = ref(true);
		function toDate(v) {
			if (v == null) return null;
			const n = Number(v);
			if (Number.isNaN(n)) return new Date(v);
			return new Date(n < 0xe8d4a51000 ? n * 1e3 : n);
		}
		function fmtDate(v) {
			const d = toDate(v);
			return d ? d.toLocaleDateString("id-ID") : "-";
		}
		const filtered = computed(() => {
			let r = items.value;
			if (statusFilter.value) r = r.filter((x) => x.status === statusFilter.value);
			if (q.value) r = r.filter((x) => `${x.kode} ${x.deskripsi} ${x.lokasi}`.toLowerCase().includes(q.value.toLowerCase()));
			return r;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			_push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-xl font-extrabold">Riwayat Pengaduan</h1><p class="text-sm text-muted">Pantau perkembangan laporan Anda.</p><div class="mt-4 flex flex-col sm:flex-row gap-3"><div class="relative flex-1">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:search",
				size: "16",
				class: "absolute left-3 top-1/2 -translate-y-1/2 text-muted"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(q))} placeholder="Cari kode atau judul..." class="w-full h-10 rounded-xl border border-[#DCE8F1] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE]"></div><select class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>Semua status</option><option value="diterima"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "diterima") : ssrLooseEqual(unref(statusFilter), "diterima")) ? " selected" : ""}>Diterima</option><option value="diproses"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "diproses") : ssrLooseEqual(unref(statusFilter), "diproses")) ? " selected" : ""}>Dalam Proses</option><option value="selesai"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "selesai") : ssrLooseEqual(unref(statusFilter), "selesai")) ? " selected" : ""}>Selesai</option></select></div><div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] shadow-card overflow-hidden">`);
			if (unref(loading)) _push(`<div class="p-10 text-center text-sm text-muted">Memuat...</div>`);
			else if (!unref(filtered).length) {
				_push(`<div class="p-10 text-center"><p class="text-sm text-muted">Tidak ada pengaduan${ssrInterpolate(unref(q) || unref(statusFilter) ? " sesuai filter" : "")}</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/pengaduan/create",
					class: "mt-3 inline-flex h-9 px-4 items-center rounded-full bg-[#1976F3] text-white text-sm font-semibold"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Buat Pengaduan`);
						else return [createTextVNode("Buat Pengaduan")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="divide-y divide-[#E5EDF5]"><!--[-->`);
				ssrRenderList(unref(filtered), (it) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: it.id,
						to: `/pengaduan/${it.id}`,
						class: "flex items-center justify-between gap-4 p-4 hover:bg-[#F8FAFF] transition"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="flex gap-3 min-w-0"${_scopeId}><div class="w-14 h-14 rounded-xl bg-[#EAF6FF] overflow-hidden shrink-0 grid place-items-center"${_scopeId}>`);
								if (it.lampiran?.[0]?.kunciStorage) _push(`<img${ssrRenderAttr("src", `/api/lampiran/${it.lampiran[0].kunciStorage}`)} class="w-full h-full object-cover" alt=""${_scopeId}>`);
								else _push(ssrRenderComponent(_component_Icon, {
									name: "lucide:image",
									size: "18",
									class: "text-muted"
								}, null, _parent, _scopeId));
								_push(`</div><div class="min-w-0"${_scopeId}><p class="text-sm font-bold truncate max-w-[360px]"${_scopeId}>${ssrInterpolate(it.deskripsi?.split("\n")[0] || it.kode)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(it.kode)} · ${ssrInterpolate(it.lokasi)}</p><p class="text-[11px] text-muted"${_scopeId}>${ssrInterpolate(fmtDate(it.createdAt))}</p></div></div>`);
								_push(ssrRenderComponent(_component_StatusBadge, { status: it.status }, null, _parent, _scopeId));
							} else return [createVNode("div", { class: "flex gap-3 min-w-0" }, [createVNode("div", { class: "w-14 h-14 rounded-xl bg-[#EAF6FF] overflow-hidden shrink-0 grid place-items-center" }, [it.lampiran?.[0]?.kunciStorage ? (openBlock(), createBlock("img", {
								key: 0,
								src: `/api/lampiran/${it.lampiran[0].kunciStorage}`,
								class: "w-full h-full object-cover",
								alt: ""
							}, null, 8, ["src"])) : (openBlock(), createBlock(_component_Icon, {
								key: 1,
								name: "lucide:image",
								size: "18",
								class: "text-muted"
							}))]), createVNode("div", { class: "min-w-0" }, [
								createVNode("p", { class: "text-sm font-bold truncate max-w-[360px]" }, toDisplayString(it.deskripsi?.split("\n")[0] || it.kode), 1),
								createVNode("p", { class: "text-xs text-muted" }, toDisplayString(it.kode) + " · " + toDisplayString(it.lokasi), 1),
								createVNode("p", { class: "text-[11px] text-muted" }, toDisplayString(fmtDate(it.createdAt)), 1)
							])]), createVNode(_component_StatusBadge, { status: it.status }, null, 8, ["status"])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
// pages/pengaduan/riwayat.vue
var _sfc_setup = riwayat_vue_vue_type_script_setup_true_lang_default.setup;
riwayat_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pengaduan/riwayat.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var riwayat_default = riwayat_vue_vue_type_script_setup_true_lang_default;

export { riwayat_default as default };
//# sourceMappingURL=riwayat-zp1Xw70y.mjs.map
