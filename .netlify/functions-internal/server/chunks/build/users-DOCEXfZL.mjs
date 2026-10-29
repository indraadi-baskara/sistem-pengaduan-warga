import { a as useHead, $ as $fetch } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { A as AppButton_default } from './AppButton-Bs21ZYWr.mjs';
import { A as AppAlert_default } from './AppAlert-gLt8pBzn.mjs';
import { A as AppInput_default } from './AppInput-DIEvGQ1m.mjs';
import { A as AppSelect_default } from './AppSelect-DZEwLx7G.mjs';
import { defineComponent, ref, reactive, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
import './components-0OfPnzPL.mjs';

// pages/admin/users.vue?vue&type=script&setup=true&lang.ts
var users_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "users",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Kelola User — Admin" });
		const users = ref([]);
		const loading = ref(true);
		const form = reactive({
			nama: "",
			email: "",
			password: "",
			peran: "pelapor"
		});
		const err = ref("");
		const ok = ref("");
		async function load() {
			loading.value = true;
			try {
				users.value = await $fetch("/api/admin/users");
			} catch {} finally {
				loading.value = false;
			}
		}
		async function create() {
			err.value = "";
			ok.value = "";
			if (!form.nama || !form.email || !form.password) {
				err.value = "Lengkapi form";
				return;
			}
			try {
				await $fetch("/api/admin/users", {
					method: "POST",
					body: { ...form }
				});
				ok.value = "User dibuat";
				form.nama = "";
				form.email = "";
				form.password = "";
				await load();
			} catch (e) {
				err.value = e?.data?.statusMessage || "Gagal";
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_AppAlert = AppAlert_default;
			const _component_AppInput = AppInput_default;
			const _component_AppSelect = AppSelect_default;
			const _component_AppButton = AppButton_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin",
				class: "text-sm text-[#1976F3]"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`← Kembali ke Kelola Pengaduan`);
					else return [createTextVNode("← Kembali ke Kelola Pengaduan")];
				}),
				_: 1
			}, _parent));
			_push(`<h1 class="text-xl font-extrabold mt-2">Kelola User</h1><div class="mt-4 grid lg:grid-cols-[380px_1fr] gap-4"><div class="bg-white rounded-2xl border border-[#DCE8F1] p-5 shadow-card h-fit"><h2 class="font-bold">Tambah User</h2>`);
			if (unref(err)) _push(ssrRenderComponent(_component_AppAlert, {
				type: "error",
				message: unref(err),
				class: "mt-3"
			}, null, _parent));
			else _push(`<!---->`);
			if (unref(ok)) _push(ssrRenderComponent(_component_AppAlert, {
				type: "success",
				message: unref(ok),
				class: "mt-3"
			}, null, _parent));
			else _push(`<!---->`);
			_push(`<div class="mt-3 space-y-3">`);
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).nama,
				"onUpdate:modelValue": ($event) => unref(form).nama = $event,
				label: "Nama",
				placeholder: "Nama lengkap"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).email,
				"onUpdate:modelValue": ($event) => unref(form).email = $event,
				label: "Email",
				placeholder: "email@..."
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).password,
				"onUpdate:modelValue": ($event) => unref(form).password = $event,
				label: "Password",
				type: "password",
				placeholder: "Min 8 karakter"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppSelect, {
				modelValue: unref(form).peran,
				"onUpdate:modelValue": ($event) => unref(form).peran = $event,
				label: "Peran",
				options: [
					{
						value: "pelapor",
						label: "Pelapor"
					},
					{
						value: "pengurus",
						label: "Pengurus"
					},
					{
						value: "admin",
						label: "Admin"
					}
				]
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppButton, {
				block: "",
				onClick: create
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Buat User`);
					else return [createTextVNode("Buat User")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card overflow-hidden">`);
			if (unref(loading)) _push(`<div class="p-8 text-center text-sm text-muted">Memuat...</div>`);
			else {
				_push(`<div class="divide-y divide-[#E5EDF5]"><!--[-->`);
				ssrRenderList(unref(users), (u) => {
					_push(`<div class="p-4 flex items-center justify-between gap-3"><div><p class="text-sm font-bold">${ssrInterpolate(u.nama)} <span class="px-2 py-0.5 rounded-full bg-[#EAF6FF] text-xs capitalize ml-1">${ssrInterpolate(u.peran)}</span></p><p class="text-xs text-muted">${ssrInterpolate(u.email)}</p></div><button class="${ssrRenderClass(["h-8 px-3 rounded-full text-xs font-semibold border", u.aktif ? "bg-white border-[#DCE8F1]" : "bg-[#FEE2E2] border-[#FECACA] text-[#991B1B]"])}">${ssrInterpolate(u.aktif ? "Aktif" : "Nonaktif")}</button></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div></div>`);
		};
	}
});
// pages/admin/users.vue
var _sfc_setup = users_vue_vue_type_script_setup_true_lang_default.setup;
users_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var users_default = users_vue_vue_type_script_setup_true_lang_default;

export { users_default as default };
//# sourceMappingURL=users-DOCEXfZL.mjs.map
