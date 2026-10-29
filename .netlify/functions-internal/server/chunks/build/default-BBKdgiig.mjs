import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';

// components/Container.vue
var _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "px-5 mx-auto max-w-7xl" }, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</div>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Container.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Container_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]), { __name: "Container" });
// components/Navbar.vue
var _sfc_main$2 = {
	__name: "Navbar",
	__ssrInlineRender: true,
	setup(__props) {
		const menuitems = [{
			title: "Sign up",
			url: "https://app.netlify.com/signup"
		}, {
			title: "Log in",
			url: "https://app.netlify.com/login"
		}];
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Container_default, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<header class="flex flex-row flex-wrap items-center justify-between my-4 gap-x-6 gap-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><a href="/" class="text-2xl font-bold text-zinc-800"${_scopeId}><span class="text-green-500"${_scopeId}>❖</span> Nuxt Starter </a></div><nav class="flex w-auto"${_scopeId}><ul class="flex flex-row gap-3 text-sm"${_scopeId}><!--[-->`);
						ssrRenderList(menuitems, (item) => {
							_push(`<li${_scopeId}><a${ssrRenderAttr("href", item.url)} class="flex px-3 py-2 text-gray-600 border rounded-sm hover:text-gray-800"${_scopeId}>${ssrInterpolate(item.title)}</a></li>`);
						});
						_push(`<!--]--></ul></nav></header>`);
					} else return [createVNode("header", { class: "flex flex-row flex-wrap items-center justify-between my-4 gap-x-6 gap-y-4" }, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("a", {
						href: "/",
						class: "text-2xl font-bold text-zinc-800"
					}, [createVNode("span", { class: "text-green-500" }, "❖"), createTextVNode(" Nuxt Starter ")])]), createVNode("nav", { class: "flex w-auto" }, [createVNode("ul", { class: "flex flex-row gap-3 text-sm" }, [(openBlock(), createBlock(Fragment, null, renderList(menuitems, (item) => {
						return createVNode("li", null, [createVNode("a", {
							href: item.url,
							class: "flex px-3 py-2 text-gray-600 border rounded-sm hover:text-gray-800"
						}, toDisplayString(item.title), 9, ["href"])]);
					}), 64))])])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
// components/Footer.vue
var _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
	_push(`<footer${ssrRenderAttrs(mergeProps({ class: "my-20" }, _attrs))}><p class="text-sm text-center text-zinc-600"> Copyright © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Nuxt Starter. Powered by <a href="https://www.netlify.com/" class="underline">Netlify</a>. </p></footer>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Footer_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "Footer" });
// layouts/default.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_Navbar = _sfc_main$2;
	const _component_Footer = Footer_default;
	_push(`<!--[-->`);
	_push(ssrRenderComponent(_component_Navbar, null, null, _parent));
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(ssrRenderComponent(_component_Footer, null, null, _parent));
	_push(`<!--]-->`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { default_default as default };
//# sourceMappingURL=default-BBKdgiig.mjs.map
