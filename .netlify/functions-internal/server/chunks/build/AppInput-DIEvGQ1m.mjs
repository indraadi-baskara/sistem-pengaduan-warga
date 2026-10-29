import { t as components_default } from './components-0OfPnzPL.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';

// components/ui/AppInput.vue?vue&type=script&setup=true&lang.ts
var AppInput_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppInput",
	__ssrInlineRender: true,
	props: {
		label: {},
		modelValue: {},
		placeholder: {},
		type: {},
		error: {},
		required: { type: Boolean },
		icon: {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const id = `inp-${Math.random().toString(36).slice(2, 7)}`;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}>`);
			if (__props.label) {
				_push(`<label${ssrRenderAttr("for", id)} class="text-[13px] font-semibold text-ink">${ssrInterpolate(__props.label)} `);
				if (__props.required) _push(`<span class="text-[#DC2626]">*</span>`);
				else _push(`<!---->`);
				_push(`</label>`);
			} else _push(`<!---->`);
			_push(`<div class="relative">`);
			if (__props.icon) {
				_push(`<span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">`);
				_push(ssrRenderComponent(_component_Icon, {
					name: __props.icon,
					size: "18"
				}, null, _parent));
				_push(`</span>`);
			} else _push(`<!---->`);
			_push(`<input${ssrRenderAttr("id", id)}${ssrRenderAttr("type", __props.type || "text")}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass([
				"w-full h-12 rounded-xl border bg-white px-4 text-[14px] placeholder:text-[#9CA3AF] focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE] outline-none transition",
				__props.icon ? "pl-10" : "",
				__props.error ? "border-[#FCA5A5] focus:border-[#EF4444] focus:ring-[#FEE2E2]" : "border-[#DCE8F1]"
			])}"></div>`);
			if (__props.error) _push(`<p class="text-xs text-[#DC2626]">${ssrInterpolate(__props.error)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// components/ui/AppInput.vue
var _sfc_setup = AppInput_vue_vue_type_script_setup_true_lang_default.setup;
AppInput_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/AppInput.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppInput_default = Object.assign(AppInput_vue_vue_type_script_setup_true_lang_default, { __name: "AppInput" });

export { AppInput_default as A };
//# sourceMappingURL=AppInput-DIEvGQ1m.mjs.map
