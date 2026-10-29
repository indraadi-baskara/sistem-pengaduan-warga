import { C as useRoute } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { u as useAuth } from './useAuth-DE_CnqO1.mjs';
import { A as AppTopbar_default } from './AppTopbar-DwGHk3aT.mjs';
import { mergeProps, defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

// components/AppSidebar.vue?vue&type=script&setup=true&lang.ts
var AppSidebar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppSidebar",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const items = [
			{
				label: "Beranda",
				to: "/dashboard",
				icon: "lucide:house"
			},
			{
				label: "Buat Pengaduan",
				to: "/pengaduan/create",
				icon: "lucide:square-pen"
			},
			{
				label: "Riwayat Pengaduan",
				to: "/pengaduan/riwayat",
				icon: "lucide:file-text"
			},
			{
				label: "Informasi",
				to: "/informasi",
				icon: "lucide:info"
			},
			{
				label: "Profil",
				to: "/profil",
				icon: "lucide:user"
			},
			{
				label: "FAQ",
				to: "/faq",
				icon: "lucide:help-circle"
			}
		];
		useAuth();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-full lg:w-[240px] shrink-0" }, _attrs))}><nav class="bg-white rounded-2xl border border-[#DCE8F1] p-2 space-y-1"><!--[-->`);
			ssrRenderList(items, (it) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: it.to,
					to: it.to,
					class: ["flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition", unref(route).path === it.to ? "bg-[#EAF6FF] text-[#1976F3] font-semibold" : "text-ink hover:bg-[#F1F6FB]"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Icon, {
								name: it.icon,
								size: "18"
							}, null, _parent, _scopeId));
							_push(` ${ssrInterpolate(it.label)}`);
						} else return [createVNode(_component_Icon, {
							name: it.icon,
							size: "18"
						}, null, 8, ["name"]), createTextVNode(" " + toDisplayString(it.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--><div class="pt-2 mt-2 border-t border-[#E5EDF5]"><button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink hover:bg-[#FEE2E2] hover:text-[#991B1B]">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:log-out",
				size: "18"
			}, null, _parent));
			_push(` Keluar</button></div></nav><div class="hidden lg:block mt-3 rounded-2xl overflow-hidden border border-[#DCE8F1] bg-white"><div class="h-40 bg-gradient-to-b from-[#EAF6FF] to-[#D6EAF5] grid place-items-center text-[#9CA3AF] text-xs">Ilustrasi Kota</div></div></aside>`);
		};
	}
});
// components/AppSidebar.vue
var _sfc_setup$1 = AppSidebar_vue_vue_type_script_setup_true_lang_default.setup;
AppSidebar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppSidebar.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AppSidebar_default = Object.assign(AppSidebar_vue_vue_type_script_setup_true_lang_default, { __name: "AppSidebar" });
// layouts/dashboard.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_AppTopbar = AppTopbar_default;
	const _component_AppSidebar = AppSidebar_default;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F1F6FB]" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_AppTopbar, null, null, _parent));
	_push(`<div class="mx-auto max-w-[1440px] px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6">`);
	_push(ssrRenderComponent(_component_AppSidebar, null, null, _parent));
	_push(`<main class="flex-1 min-w-0">`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</main></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dashboard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { dashboard_default as default };
//# sourceMappingURL=dashboard--LRD135Q.mjs.map
