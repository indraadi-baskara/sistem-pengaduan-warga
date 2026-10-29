import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { u as useAuth } from './useAuth-DE_CnqO1.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

// components/AppTopbar.vue?vue&type=script&setup=true&lang.ts
var AppTopbar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppTopbar",
	__ssrInlineRender: true,
	setup(__props) {
		const { user} = useAuth();
		const menuOpen = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_Icon = components_default;
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-40 bg-white border-b border-[#DCE8F1]" }, _attrs))}><div class="mx-auto max-w-[1440px] flex items-center justify-between gap-4 px-4 md:px-6 h-[64px]"><div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "flex items-center gap-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="w-10 h-10 rounded-xl bg-[#1A2A52] text-white grid place-items-center text-[9px] font-black leading-none text-center"${_scopeId}>KOTA<br${_scopeId}>SMG</span><div class="leading-tight hidden sm:block"${_scopeId}><p class="text-[15px] font-extrabold tracking-tight text-ink"${_scopeId}>Pengaduan Masyarakat</p><p class="text-[11px] text-muted -mt-0.5"${_scopeId}>Kelurahan Pendrikan Kidul</p></div><div class="sm:hidden"${_scopeId}><p class="text-sm font-extrabold"${_scopeId}>Pengaduan</p></div>`);
					else return [
						createVNode("span", { class: "w-10 h-10 rounded-xl bg-[#1A2A52] text-white grid place-items-center text-[9px] font-black leading-none text-center" }, [
							createTextVNode("KOTA"),
							createVNode("br"),
							createTextVNode("SMG")
						]),
						createVNode("div", { class: "leading-tight hidden sm:block" }, [createVNode("p", { class: "text-[15px] font-extrabold tracking-tight text-ink" }, "Pengaduan Masyarakat"), createVNode("p", { class: "text-[11px] text-muted -mt-0.5" }, "Kelurahan Pendrikan Kidul")]),
						createVNode("div", { class: "sm:hidden" }, [createVNode("p", { class: "text-sm font-extrabold" }, "Pengaduan")])
					];
				}),
				_: 1
			}, _parent));
			_push(`<button class="hidden lg:flex ml-2 w-8 h-8 items-center justify-center rounded-lg hover:bg-[#EAF6FF] text-muted" aria-label="Menu">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:menu",
				size: "18"
			}, null, _parent));
			_push(`</button></div><nav class="hidden md:flex items-center gap-5 text-sm">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "font-semibold text-[#1976F3]"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Beranda`);
					else return [createTextVNode("Beranda")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/publik",
				class: "text-muted hover:text-ink"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Publik`);
					else return [createTextVNode("Publik")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/lacak",
				class: "text-muted hover:text-ink"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Lacak`);
					else return [createTextVNode("Lacak")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/informasi",
				class: "text-muted hover:text-ink"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Informasi`);
					else return [createTextVNode("Informasi")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/faq",
				class: "text-muted hover:text-ink"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`FAQ`);
					else return [createTextVNode("FAQ")];
				}),
				_: 1
			}, _parent));
			_push(`</nav><div class="flex items-center gap-2">`);
			if (unref(user)) {
				_push(`<!--[--><button class="relative w-9 h-9 grid place-items-center rounded-full hover:bg-[#EAF6FF] text-ink" aria-label="Notifikasi">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "lucide:bell",
					size: "20"
				}, null, _parent));
				_push(`<span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button><div class="relative"><button class="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-[#F1F6FB]"><span class="w-8 h-8 rounded-full bg-[#1976F3] text-white grid place-items-center text-sm font-bold">${ssrInterpolate((unref(user).nama || unref(user).email || "U").slice(0, 1).toUpperCase())}</span><span class="hidden sm:block text-left leading-tight"><p class="text-sm font-bold">${ssrInterpolate(unref(user).nama)}</p><p class="text-[11px] text-muted capitalize">${ssrInterpolate(unref(user).peran)}</p></span>`);
				_push(ssrRenderComponent(_component_Icon, {
					name: "lucide:chevron-down",
					size: "14",
					class: "text-muted"
				}, null, _parent));
				_push(`</button>`);
				if (unref(menuOpen)) {
					_push(`<div class="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[#DCE8F1] shadow-panel p-1">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/dashboard",
						class: "flex px-3 py-2 rounded-lg hover:bg-[#EAF6FF] text-sm"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Dashboard`);
							else return [createTextVNode("Dashboard")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/profil",
						class: "flex px-3 py-2 rounded-lg hover:bg-[#EAF6FF] text-sm"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Profil`);
							else return [createTextVNode("Profil")];
						}),
						_: 1
					}, _parent));
					_push(`<button class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FEE2E2] text-sm text-[#991B1B]">Keluar</button></div>`);
				} else _push(`<!---->`);
				_push(`</div><!--]-->`);
			} else {
				_push(`<!--[-->`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/login",
					class: "hidden sm:inline-flex h-9 px-4 items-center rounded-full border border-[#DCE8F1] text-sm font-semibold hover:bg-white"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Masuk`);
						else return [createTextVNode("Masuk")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/register",
					class: "inline-flex h-9 px-5 items-center rounded-full bg-[#1976F3] text-white text-sm font-semibold hover:bg-[#0B63CE]"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Daftar`);
						else return [createTextVNode("Daftar")];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			}
			_push(`</div></div></header>`);
		};
	}
});
// components/AppTopbar.vue
var _sfc_setup = AppTopbar_vue_vue_type_script_setup_true_lang_default.setup;
AppTopbar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppTopbar.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppTopbar_default = Object.assign(AppTopbar_vue_vue_type_script_setup_true_lang_default, { __name: "AppTopbar" });

export { AppTopbar_default as A };
//# sourceMappingURL=AppTopbar-DwGHk3aT.mjs.map
