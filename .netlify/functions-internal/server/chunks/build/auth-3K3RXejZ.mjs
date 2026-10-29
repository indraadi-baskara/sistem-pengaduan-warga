import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-DjkACiAr.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

// layouts/auth.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#DCE8F1] p-3 md:p-4" }, _attrs))}><div class="mx-auto max-w-[1280px] bg-[#B9D7EC] rounded-[24px] overflow-hidden relative min-h-[calc(100vh-24px)] flex">`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var auth_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { auth_default as default };
//# sourceMappingURL=auth-3K3RXejZ.mjs.map
