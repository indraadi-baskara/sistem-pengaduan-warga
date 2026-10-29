import { a as useHead } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { u as useAuth } from './useAuth-DE_CnqO1.mjs';
import { S as StatusBadge_default } from './StatusBadge-Bk82bS9D.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
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

// components/StatCard.vue?vue&type=script&setup=true&lang.ts
var StatCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StatCard",
	__ssrInlineRender: true,
	props: {
		label: {},
		value: {},
		tone: {},
		icon: {}
	},
	setup(__props) {
		const toneMap = {
			blue: "bg-[#EAF6FF] text-[#1976F3]",
			yellow: "bg-[#FEF9C3] text-[#B45309]",
			green: "bg-[#DCFCE7] text-[#16A34A]",
			red: "bg-[#FEE2E2] text-[#EF4444]"
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl border border-[#DCE8F1] p-4" }, _attrs))}><div class="flex items-center justify-between"><div class="${ssrRenderClass(["w-10 h-10 rounded-lg grid place-items-center", toneMap[__props.tone || "blue"]])}">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: __props.icon || "lucide:file-text",
				size: "20"
			}, null, _parent));
			_push(`</div><span class="text-[28px] font-extrabold leading-none">${ssrInterpolate(__props.value)}</span></div><p class="mt-3 text-sm text-muted">${ssrInterpolate(__props.label)}</p>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/pengaduan/riwayat",
				class: "mt-2 inline-flex w-6 h-6 items-center justify-center rounded-full bg-[#EAF6FF] text-[#1976F3] text-xs"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`›`);
					else return [createTextVNode("›")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// components/StatCard.vue
var _sfc_setup$2 = StatCard_vue_vue_type_script_setup_true_lang_default.setup;
StatCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatCard.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var StatCard_default = Object.assign(StatCard_vue_vue_type_script_setup_true_lang_default, { __name: "StatCard" });
// components/PengaduanCard.vue?vue&type=script&setup=true&lang.ts
var PengaduanCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PengaduanCard",
	__ssrInlineRender: true,
	props: { item: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			const _component_StatusBadge = StatusBadge_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between gap-3 py-3 border-b border-[#E5EDF5] last:border-0" }, _attrs))}><div class="flex gap-3 min-w-0"><div class="w-12 h-12 rounded-lg bg-[#EAF6FF] overflow-hidden shrink-0 grid place-items-center">`);
			if (__props.item.image) _push(`<img${ssrRenderAttr("src", __props.item.image)} class="w-full h-full object-cover" alt="">`);
			else _push(ssrRenderComponent(_component_Icon, {
				name: "lucide:image",
				size: "18",
				class: "text-muted"
			}, null, _parent));
			_push(`</div><div class="min-w-0"><p class="text-sm font-semibold truncate">${ssrInterpolate(__props.item.title || __props.item.kode || __props.item.deskripsi)}</p><p class="text-xs text-muted flex items-center gap-1">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:map-pin",
				size: "12"
			}, null, _parent));
			_push(`${ssrInterpolate(__props.item.lokasi || __props.item.kategori?.nama || "-")}</p></div></div>`);
			_push(ssrRenderComponent(_component_StatusBadge, { status: (__props.item.status || "diterima").toLowerCase() }, null, _parent));
			_push(`</div>`);
		};
	}
});
// components/PengaduanCard.vue
var _sfc_setup$1 = PengaduanCard_vue_vue_type_script_setup_true_lang_default.setup;
PengaduanCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PengaduanCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var PengaduanCard_default = Object.assign(PengaduanCard_vue_vue_type_script_setup_true_lang_default, { __name: "PengaduanCard" });
// pages/dashboard.vue?vue&type=script&setup=true&lang.ts
var dashboard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "dashboard",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Beranda — Pengaduan Masyarakat" });
		const { user } = useAuth();
		const stats = ref({
			diterima: 0,
			diproses: 0,
			selesai: 0,
			total: 0
		});
		const recent = ref([]);
		const loading = ref(true);
		const monthName = (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
			month: "long",
			year: "numeric"
		});
		const calDays = [
			"M",
			"S",
			"S",
			"R",
			"K",
			"J",
			"S"
		];
		const calDates = [
			[
				null,
				null,
				null,
				1,
				2,
				3,
				4
			],
			[
				5,
				6,
				7,
				8,
				9,
				10,
				11
			],
			[
				12,
				13,
				14,
				15,
				16,
				17,
				18
			],
			[
				19,
				20,
				21,
				22,
				23,
				24,
				25
			],
			[
				26,
				27,
				28,
				29,
				30,
				31,
				null
			]
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_StatCard = StatCard_default;
			const _component_NuxtLink = NuxtLink;
			const _component_PengaduanCard = PengaduanCard_default;
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="bg-white rounded-2xl border border-[#DCE8F1] p-5 flex items-center gap-4 shadow-card"><div class="w-12 h-12 rounded-full bg-[#1976F3] text-white grid place-items-center font-bold text-lg shrink-0">${ssrInterpolate((unref(user)?.nama || "U").slice(0, 1).toUpperCase())}</div><div><h1 class="text-[18px] font-extrabold">Selamat Datang, ${ssrInterpolate(unref(user)?.nama || "Warga")}!</h1><p class="text-sm text-muted">Di halaman beranda pengaduan, Anda bisa melihat berapa banyak laporan yang telah Anda buat dan memantau perkembangan pengaduan Anda untuk mewujudkan Pendrikan Kidul yang lebih baik.</p></div></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-3">`);
			_push(ssrRenderComponent(_component_StatCard, {
				label: "Total Pengaduan",
				value: unref(stats).total,
				tone: "blue",
				icon: "lucide:file-text"
			}, null, _parent));
			_push(ssrRenderComponent(_component_StatCard, {
				label: "Pengaduan Baru",
				value: unref(stats).diterima,
				tone: "yellow",
				icon: "lucide:file-clock"
			}, null, _parent));
			_push(ssrRenderComponent(_component_StatCard, {
				label: "Dalam Proses",
				value: unref(stats).diproses,
				tone: "yellow",
				icon: "lucide:loader-circle"
			}, null, _parent));
			_push(ssrRenderComponent(_component_StatCard, {
				label: "Pengaduan Selesai",
				value: unref(stats).selesai,
				tone: "green",
				icon: "lucide:badge-check"
			}, null, _parent));
			_push(`</div><div class="grid lg:grid-cols-[1.7fr_340px] gap-4"><div class="bg-white rounded-2xl border border-[#DCE8F1] p-5 shadow-card"><div class="flex items-center justify-between"><h2 class="font-extrabold">Pengaduan Terbaru</h2>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/pengaduan/riwayat",
				class: "text-xs text-[#1976F3]"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Lihat semua`);
					else return [createTextVNode("Lihat semua")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (unref(loading)) _push(`<div class="py-10 text-center text-sm text-muted">Memuat...</div>`);
			else if (!unref(recent).length) {
				_push(`<div class="py-10 text-center"><p class="text-sm text-muted">Belum ada pengaduan</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/pengaduan/create",
					class: "mt-3 inline-flex h-9 px-4 items-center rounded-full bg-[#1976F3] text-white text-sm font-semibold"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Buat pengaduan pertama`);
						else return [createTextVNode("Buat pengaduan pertama")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="mt-2"><!--[-->`);
				ssrRenderList(unref(recent), (it) => {
					_push(ssrRenderComponent(_component_PengaduanCard, {
						key: it.id,
						item: it
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div><div class="space-y-4"><div class="bg-white rounded-2xl border border-[#DCE8F1] p-4 shadow-card"><div class="flex items-center gap-2"><span class="w-9 h-9 rounded-full bg-[#1976F3] text-white grid place-items-center">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:calendar",
				size: "18"
			}, null, _parent));
			_push(`</span><div><p class="text-sm font-extrabold">Jadwal</p><p class="text-xs text-muted">Oktober 2025</p></div><span class="ml-auto text-xs font-bold">${ssrInterpolate(unref(monthName))}</span></div><div class="mt-3 grid grid-cols-7 text-center text-[11px] font-semibold text-muted"><!--[-->`);
			ssrRenderList(calDays, (d) => {
				_push(`<span>${ssrInterpolate(d)}</span>`);
			});
			_push(`<!--]--></div><div class="mt-1 grid grid-cols-7 gap-1 text-center text-xs"><!--[-->`);
			ssrRenderList(calDates, (week, wi) => {
				_push(`<!--[--><!--[-->`);
				ssrRenderList(week, (d, di) => {
					_push(`<span class="${ssrRenderClass(["h-7 grid place-items-center rounded-full", d === 15 ? "bg-[#1976F3] text-white font-bold" : d ? "hover:bg-[#EAF6FF]" : ""])}">${ssrInterpolate(d || "")}</span>`);
				});
				_push(`<!--]--><!--]-->`);
			});
			_push(`<!--]--></div></div><div class="bg-white rounded-2xl border border-[#DCE8F1] p-4 shadow-card"><div class="flex items-center justify-between"><p class="text-sm text-muted">Bulan : Jan–Okt</p><span class="px-3 py-1 rounded-lg border border-[#DCE8F1] text-sm font-bold bg-white">2026 `);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:chevron-down",
				size: "12",
				class: "inline"
			}, null, _parent));
			_push(`</span></div><div class="mt-3 rounded-xl bg-[#F8FAFF] border border-[#E5EDF5] p-3"><p class="text-xs font-bold flex items-center gap-2"><span class="w-5 h-5 rounded bg-[#EAF6FF] grid place-items-center">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:bar-chart-3",
				size: "12",
				class: "text-[#1976F3]"
			}, null, _parent));
			_push(`</span> Statistik Pengaduan Bulanan</p><div class="mt-3 flex items-end gap-1 h-[88px]"><!--[-->`);
			ssrRenderList([
				4,
				6,
				3,
				5,
				7,
				4,
				6,
				5,
				8,
				3
			], (v, i) => {
				_push(`<div class="flex-1 flex flex-col items-center gap-1"><span class="text-[10px] font-bold text-[#1976F3]">${ssrInterpolate(v)}</span><div style="${ssrRenderStyle({ height: `${v * 10}px` })}" class="w-full rounded-t bg-[#1976F3]"></div></div>`);
			});
			_push(`<!--]--></div><div class="flex justify-between text-[10px] text-muted mt-1"><span>Jan</span><span>Des</span></div></div></div></div></div></div>`);
		};
	}
});
// pages/dashboard.vue
var _sfc_setup = dashboard_vue_vue_type_script_setup_true_lang_default.setup;
dashboard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dashboard_default = dashboard_vue_vue_type_script_setup_true_lang_default;

export { dashboard_default as default };
//# sourceMappingURL=dashboard-CDhSzsDt.mjs.map
