import { a as useHead } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { u as useAuth } from './useAuth-DE_CnqO1.mjs';
import { A as AppButton_default } from './AppButton-Bs21ZYWr.mjs';
import { A as AppAlert_default } from './AppAlert-gLt8pBzn.mjs';
import { A as AppInput_default } from './AppInput-DIEvGQ1m.mjs';
import { defineComponent, reactive, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

// pages/register.vue?vue&type=script&setup=true&lang.ts
var register_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "register",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Daftar — Pengaduan Masyarakat" });
		const { loading } = useAuth();
		const form = reactive({
			email: "",
			nama: "",
			phone: "",
			password: "",
			confirm: ""
		});
		const err = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			const _component_AppAlert = AppAlert_default;
			const _component_AppInput = AppInput_default;
			const _component_AppButton = AppButton_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex w-full" }, _attrs))}><div class="hidden lg:flex flex-1 flex-col items-center justify-center px-10 py-12 text-center relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-b from-[#EAF6FF] via-[#D6EAF5] to-[#9CC6E8] opacity-60" aria-hidden="true"></div><div class="relative z-10 max-w-[420px]"><div class="mx-auto w-[84px] h-[84px] rounded-2xl bg-white border-4 border-[#1A2A52] grid place-items-center shadow-card"><div class="text-center leading-none"><p class="text-[10px] font-bold tracking-widest text-[#C41E1A]">KOTA</p><p class="text-lg font-black text-[#1A2A52] -mt-1">SEMARANG</p><p class="text-[7px] text-[#1A2A52]">HEBAT</p></div></div><h1 class="mt-6 text-[32px] font-black leading-tight text-[#0F172A]">Pengaduan Masyarakat</h1><p class="text-lg font-semibold text-[#1E293B]">Kelurahan Pendrikan Kidul</p><p class="text-lg font-semibold text-[#1E293B] -mt-1">Kota Semarang</p><div class="mx-auto mt-3 w-12 h-1 rounded-full bg-[#1976F3]"></div><p class="mt-4 text-sm text-[#475569] leading-relaxed">Bersama wujudkan lingkungan<br>Pendrikan Kidul yang lebih nyaman</p><div class="mt-8 mx-auto w-full max-w-[360px] h-[160px] rounded-2xl bg-white/60 border border-white/70 grid place-items-center"><div class="text-center">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:house",
				size: "48",
				class: "mx-auto text-[#1976F3] opacity-60"
			}, null, _parent));
			_push(`<p class="text-xs text-muted mt-1">Ilustrasi lingkungan</p></div></div></div><div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#7FB6DD] to-transparent opacity-40" aria-hidden="true"></div></div><div class="flex-1 lg:max-w-[480px] flex items-center justify-center p-4 md:p-8"><div class="w-full max-w-[420px] bg-white rounded-[20px] shadow-panel border border-white p-6 md:p-8"><div class="lg:hidden flex flex-col items-center text-center mb-6"><div class="w-12 h-12 rounded-xl bg-white border-2 border-[#1A2A52] grid place-items-center">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:shield",
				size: "20"
			}, null, _parent));
			_push(`</div><p class="mt-2 text-sm font-black">Pengaduan Masyarakat</p><p class="text-xs text-muted">Kelurahan Pendrikan Kidul</p></div><h2 class="text-2xl font-extrabold">Daftar Akun</h2><p class="text-xs text-muted mt-1">Silahkan Daftar untuk membuat Akun</p>`);
			if (unref(err)) _push(ssrRenderComponent(_component_AppAlert, {
				type: "error",
				message: unref(err),
				class: "mt-4"
			}, null, _parent));
			else _push(`<!---->`);
			_push(`<form class="mt-5 space-y-3">`);
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).email,
				"onUpdate:modelValue": ($event) => unref(form).email = $event,
				placeholder: "Email atau NIK",
				icon: "lucide:mail"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).nama,
				"onUpdate:modelValue": ($event) => unref(form).nama = $event,
				placeholder: "Nama Lengkap",
				icon: "lucide:user"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).phone,
				"onUpdate:modelValue": ($event) => unref(form).phone = $event,
				placeholder: "Nomor HP",
				icon: "lucide:smartphone"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).password,
				"onUpdate:modelValue": ($event) => unref(form).password = $event,
				type: "password",
				placeholder: "Password",
				icon: "lucide:lock"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).confirm,
				"onUpdate:modelValue": ($event) => unref(form).confirm = $event,
				type: "password",
				placeholder: "Konfirmasi Ulang Password",
				icon: "lucide:lock"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppButton, {
				type: "submit",
				size: "lg",
				block: "",
				loading: unref(loading),
				class: "mt-2"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Daftar`);
					else return [createTextVNode("Daftar")];
				}),
				_: 1
			}, _parent));
			_push(`<p class="text-center text-xs text-muted">Sudah punya akun? `);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/login",
				class: "text-[#1976F3] font-semibold"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Masuk disini`);
					else return [createTextVNode("Masuk disini")];
				}),
				_: 1
			}, _parent));
			_push(`</p></form></div></div></div>`);
		};
	}
});
// pages/register.vue
var _sfc_setup = register_vue_vue_type_script_setup_true_lang_default.setup;
register_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var register_default = register_vue_vue_type_script_setup_true_lang_default;

export { register_default as default };
//# sourceMappingURL=register-LRzCxZrO.mjs.map
