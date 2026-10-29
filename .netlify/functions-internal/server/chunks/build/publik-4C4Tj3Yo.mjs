import { a as useHead, $ as $fetch } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { A as AppButton_default } from './AppButton-Bs21ZYWr.mjs';
import { S as StatusBadge_default } from './StatusBadge-Bk82bS9D.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

// pages/publik.vue?vue&type=script&setup=true&lang.ts
var limit = 12;
var publik_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "publik",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Pengaduan Publik — Pendrikan Kidul" });
		const kategoriList = ref([]);
		const items = ref([]);
		const total = ref(0);
		const loading = ref(true);
		const status = ref("");
		const kategori = ref("");
		const q = ref("");
		const offset = ref(0);
		function epochToDate(v) {
			if (v == null) return null;
			const n = Number(v);
			if (Number.isNaN(n)) return new Date(v);
			return new Date(n < 0xe8d4a51000 ? n * 1e3 : n);
		}
		function fmtDate(v) {
			const d = epochToDate(v);
			return d ? d.toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "short",
				year: "numeric"
			}) : "-";
		}
		async function load(reset = false) {
			if (reset) offset.value = 0;
			loading.value = true;
			try {
				const res = await $fetch("/api/pengaduan", { query: {
					status: status.value || void 0,
					kategori: kategori.value || void 0,
					q: q.value || void 0,
					limit,
					offset: offset.value
				} });
				const incoming = res.data ?? [];
				items.value = offset.value === 0 ? incoming : [...items.value, ...incoming];
				total.value = res.total ?? incoming.length;
			} catch {
				if (offset.value === 0) items.value = [];
			} finally {
				loading.value = false;
			}
		}
		function nextPage() {
			if (items.value.length >= total.value) return;
			offset.value += limit;
			load();
		}
		watch([status, kategori], () => load(true));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			const _component_AppButton = AppButton_default;
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1100px] mx-auto" }, _attrs))}><h1 class="text-xl font-extrabold">Pengaduan Publik</h1><p class="text-sm text-muted">Daftar laporan warga yang ditampilkan untuk transparansi (FR-04). Gunakan filter status/kategori.</p><div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-4 shadow-card flex flex-col lg:flex-row gap-3"><div class="relative flex-1">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:search",
				size: "16",
				class: "absolute left-3 top-1/2 -translate-y-1/2 text-muted"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(q))} placeholder="Cari kode / lokasi / deskripsi..." class="w-full h-10 rounded-xl border border-[#DCE8F1] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE]"></div><select class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "") : ssrLooseEqual(unref(status), "")) ? " selected" : ""}>Semua status</option><option value="diterima"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "diterima") : ssrLooseEqual(unref(status), "diterima")) ? " selected" : ""}>Diterima</option><option value="diproses"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "diproses") : ssrLooseEqual(unref(status), "diproses")) ? " selected" : ""}>Diproses</option><option value="selesai"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "selesai") : ssrLooseEqual(unref(status), "selesai")) ? " selected" : ""}>Selesai</option></select><select class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(kategori)) ? ssrLooseContain(unref(kategori), "") : ssrLooseEqual(unref(kategori), "")) ? " selected" : ""}>Semua kategori</option><!--[-->`);
			ssrRenderList(unref(kategoriList), (k) => {
				_push(`<option${ssrRenderAttr("value", k.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(kategori)) ? ssrLooseContain(unref(kategori), k.id) : ssrLooseEqual(unref(kategori), k.id)) ? " selected" : ""}>${ssrInterpolate(k.nama)}</option>`);
			});
			_push(`<!--]--></select>`);
			_push(ssrRenderComponent(_component_AppButton, {
				size: "sm",
				onClick: ($event) => load(true)
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Cari`);
					else return [createTextVNode("Cari")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] shadow-card overflow-hidden">`);
			if (unref(loading) && !unref(items).length) _push(`<div class="p-10 text-center text-sm text-muted">Memuat...</div>`);
			else if (!unref(items).length) {
				_push(`<div class="p-10 text-center"><p class="text-sm text-muted">Belum ada pengaduan publik sesuai filter.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/pengaduan/create",
					class: "mt-3 inline-flex text-sm text-[#1976F3]"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Buat pengaduan →`);
						else return [createTextVNode("Buat pengaduan →")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div><div class="divide-y divide-[#E5EDF5]"><!--[-->`);
				ssrRenderList(unref(items), (it) => {
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
								_push(`</div><div class="min-w-0"${_scopeId}><p class="text-sm font-bold truncate max-w-[520px]"${_scopeId}>${ssrInterpolate(it.deskripsi?.split("\n")[0] || it.kode)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(it.kode)} · ${ssrInterpolate(it.kategori?.nama || "-")} · ${ssrInterpolate(it.lokasi)}</p><p class="text-[11px] text-muted"${_scopeId}>${ssrInterpolate(fmtDate(it.createdAt))}</p></div></div>`);
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
								createVNode("p", { class: "text-sm font-bold truncate max-w-[520px]" }, toDisplayString(it.deskripsi?.split("\n")[0] || it.kode), 1),
								createVNode("p", { class: "text-xs text-muted" }, toDisplayString(it.kode) + " · " + toDisplayString(it.kategori?.nama || "-") + " · " + toDisplayString(it.lokasi), 1),
								createVNode("p", { class: "text-[11px] text-muted" }, toDisplayString(fmtDate(it.createdAt)), 1)
							])]), createVNode(_component_StatusBadge, { status: it.status }, null, 8, ["status"])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div><div class="p-4 flex items-center justify-between border-t border-[#E5EDF5] text-xs text-muted"><span>${ssrInterpolate(unref(items).length)} / ${ssrInterpolate(unref(total))} ditampilkan</span>`);
				if (unref(items).length < unref(total)) _push(ssrRenderComponent(_component_AppButton, {
					size: "sm",
					variant: "secondary",
					onClick: nextPage
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Muat lagi`);
						else return [createTextVNode("Muat lagi")];
					}),
					_: 1
				}, _parent));
				else _push(`<span>Semua data termuat</span>`);
				_push(`</div></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
// pages/publik.vue
var _sfc_setup = publik_vue_vue_type_script_setup_true_lang_default.setup;
publik_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/publik.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var publik_default = publik_vue_vue_type_script_setup_true_lang_default;

export { publik_default as default };
//# sourceMappingURL=publik-4C4Tj3Yo.mjs.map
