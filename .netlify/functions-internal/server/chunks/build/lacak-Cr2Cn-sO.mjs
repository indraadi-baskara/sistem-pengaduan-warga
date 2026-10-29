import { a as useHead, $ as $fetch } from '../virtual/entry.mjs';
import { A as AppButton_default } from './AppButton-Bs21ZYWr.mjs';
import { S as StatusBadge_default } from './StatusBadge-Bk82bS9D.mjs';
import { A as AppAlert_default } from './AppAlert-gLt8pBzn.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

// pages/lacak.vue?vue&type=script&setup=true&lang.ts
var lacak_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "lacak",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Lacak Pengaduan — Pengaduan Masyarakat" });
		const kode = ref("");
		const result = ref(null);
		const err = ref("");
		const loading = ref(false);
		function toDate(v) {
			if (v == null) return null;
			const n = Number(v);
			if (Number.isNaN(n)) return new Date(v);
			return new Date(n < 0xe8d4a51000 ? n * 1e3 : n);
		}
		function fmtDT(v) {
			const d = toDate(v);
			return d ? d.toLocaleString("id-ID") : "-";
		}
		async function doLacak() {
			err.value = "";
			result.value = null;
			if (!kode.value.trim()) {
				err.value = "Masukkan kode pelacakan";
				return;
			}
			loading.value = true;
			try {
				result.value = await $fetch(`/api/pengaduan/kode/${kode.value.trim()}`);
			} catch (e) {
				err.value = e?.data?.statusMessage || e?.data?.message || "Kode tidak ditemukan";
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppButton = AppButton_default;
			const _component_AppAlert = AppAlert_default;
			const _component_StatusBadge = StatusBadge_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[720px] mx-auto" }, _attrs))}><h1 class="text-xl font-extrabold">Lacak Pengaduan</h1><p class="text-sm text-muted">Masukkan kode pelacakan (contoh: LW-2026-0001) untuk melihat status laporan.</p><div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card"><div class="flex gap-2"><input${ssrRenderAttr("value", unref(kode))} placeholder="LW-2026-0001" class="flex-1 h-11 rounded-xl border border-[#DCE8F1] px-4 text-sm outline-none focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE]">`);
			_push(ssrRenderComponent(_component_AppButton, {
				loading: unref(loading),
				onClick: doLacak
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Lacak`);
					else return [createTextVNode("Lacak")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (unref(err)) _push(ssrRenderComponent(_component_AppAlert, {
				type: "error",
				message: unref(err),
				class: "mt-4"
			}, null, _parent));
			else _push(`<!---->`);
			if (unref(result)) {
				_push(`<div class="mt-6 space-y-3"><div class="flex items-center justify-between"><p class="font-bold">${ssrInterpolate(unref(result).kode)}</p>`);
				_push(ssrRenderComponent(_component_StatusBadge, { status: unref(result).status }, null, _parent));
				_push(`</div><p class="text-sm whitespace-pre-wrap">${ssrInterpolate(unref(result).deskripsi)}</p><p class="text-xs text-muted">${ssrInterpolate(unref(result).lokasi)} · ${ssrInterpolate(fmtDT(unref(result).createdAt))}</p>`);
				if (unref(result).riwayat?.length) {
					_push(`<div class="pt-3 border-t border-[#E5EDF5]"><p class="text-sm font-semibold">Riwayat</p><ul class="mt-2 space-y-2"><!--[-->`);
					ssrRenderList(unref(result).riwayat, (r) => {
						_push(`<li class="text-xs bg-[#F8FAFF] border border-[#E5EDF5] rounded-lg px-3 py-2"><b class="capitalize">${ssrInterpolate(r.status)}</b> — ${ssrInterpolate(r.catatan || "-")} <span class="text-muted">(${ssrInterpolate(fmtDT(r.createdAt))})</span></li>`);
					});
					_push(`<!--]--></ul></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
// pages/lacak.vue
var _sfc_setup = lacak_vue_vue_type_script_setup_true_lang_default.setup;
lacak_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/lacak.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var lacak_default = lacak_vue_vue_type_script_setup_true_lang_default;

export { lacak_default as default };
//# sourceMappingURL=lacak-Cr2Cn-sO.mjs.map
