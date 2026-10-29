import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

// components/ui/AppAlert.vue?vue&type=script&setup=true&lang.ts
var AppAlert_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppAlert",
	__ssrInlineRender: true,
	props: {
		type: {},
		title: {},
		message: {}
	},
	setup(__props) {
		const map = {
			success: "bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]",
			warning: "bg-[#FEF9C3] text-[#92400E] border-[#FDE68A]",
			error: "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]",
			info: "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]"
		};
		const dot = {
			success: "bg-[#16A34A]",
			warning: "bg-[#F59E0B]",
			error: "bg-[#DC2626]",
			info: "bg-[#1976F3]"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["flex gap-3 rounded-xl border px-4 py-3", map[__props.type || "info"]] }, _attrs))}><span class="${ssrRenderClass(["mt-1 w-2 h-2 rounded-full shrink-0", dot[__props.type || "info"]])}" aria-hidden="true"></span><div class="min-w-0">`);
			if (__props.title) _push(`<p class="text-sm font-semibold leading-none">${ssrInterpolate(__props.title)}</p>`);
			else _push(`<!---->`);
			if (__props.message) _push(`<p class="text-xs opacity-90 mt-1">${ssrInterpolate(__props.message)}</p>`);
			else _push(`<!---->`);
			_push(`<div class="text-xs mt-1">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></div></div>`);
		};
	}
});
// components/ui/AppAlert.vue
var _sfc_setup = AppAlert_vue_vue_type_script_setup_true_lang_default.setup;
AppAlert_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/AppAlert.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppAlert_default = Object.assign(AppAlert_vue_vue_type_script_setup_true_lang_default, { __name: "AppAlert" });

export { AppAlert_default as A };
//# sourceMappingURL=AppAlert-gLt8pBzn.mjs.map
