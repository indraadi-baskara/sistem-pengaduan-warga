import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

// components/ui/AppButton.vue?vue&type=script&setup=true&lang.ts
var AppButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppButton",
	__ssrInlineRender: true,
	props: {
		variant: { default: "primary" },
		size: { default: "md" },
		block: { type: Boolean },
		loading: { type: Boolean },
		disabled: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const cls = computed(() => {
			return [
				{
					primary: "bg-[#1976F3] text-white hover:bg-[#0B63CE] shadow-sm border border-transparent",
					secondary: "bg-white text-[#1976F3] border border-[#DCE8F1] hover:bg-[#EAF6FF]",
					outline: "bg-transparent text-ink border border-[#DCE8F1] hover:bg-white",
					ghost: "bg-transparent text-muted hover:text-ink"
				}[props.variant],
				{
					sm: "h-9 px-4 text-sm rounded-full",
					md: "h-[42px] px-5 text-sm font-semibold rounded-xl",
					lg: "h-[52px] px-6 text-[15px] font-semibold rounded-xl"
				}[props.size],
				props.block ? "w-full" : ""
			].join(" ");
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				disabled: __props.disabled || __props.loading,
				class: ["inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed", unref(cls)]
			}, _attrs))}>`);
			if (__props.loading) _push(`<span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true"></span>`);
			else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</button>`);
		};
	}
});
// components/ui/AppButton.vue
var _sfc_setup = AppButton_vue_vue_type_script_setup_true_lang_default.setup;
AppButton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/AppButton.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppButton_default = Object.assign(AppButton_vue_vue_type_script_setup_true_lang_default, { __name: "AppButton" });

export { AppButton_default as A };
//# sourceMappingURL=AppButton-Bs21ZYWr.mjs.map
