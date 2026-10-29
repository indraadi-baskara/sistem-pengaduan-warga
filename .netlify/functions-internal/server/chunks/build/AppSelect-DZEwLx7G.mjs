import { t as components_default } from './components-0OfPnzPL.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';

// components/ui/AppSelect.vue?vue&type=script&setup=true&lang.ts
var AppSelect_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppSelect",
	__ssrInlineRender: true,
	props: {
		label: {},
		modelValue: {},
		placeholder: {},
		error: {},
		required: { type: Boolean },
		options: {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const id = `sel-${Math.random().toString(36).slice(2, 7)}`;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}>`);
			if (__props.label) {
				_push(`<label${ssrRenderAttr("for", id)} class="text-[13px] font-semibold text-ink">${ssrInterpolate(__props.label)} `);
				if (__props.required) _push(`<span class="text-[#DC2626]">*</span>`);
				else _push(`<!---->`);
				_push(`</label>`);
			} else _push(`<!---->`);
			_push(`<div class="relative"><select${ssrRenderAttr("id", id)}${ssrRenderAttr("value", __props.modelValue)} class="${ssrRenderClass(["w-full h-12 rounded-xl border bg-white px-4 pr-9 text-[14px] focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE] outline-none transition appearance-none", __props.error ? "border-[#FCA5A5]" : "border-[#DCE8F1]"])}"><option value="" disabled>${ssrInterpolate(__props.placeholder || "Pilih")}</option><!--[-->`);
			ssrRenderList(__props.options, (o) => {
				_push(`<option${ssrRenderAttr("value", o.value)}>${ssrInterpolate(o.label)}</option>`);
			});
			_push(`<!--]--></select>`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:chevron-down",
				class: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted",
				size: "18"
			}, null, _parent));
			_push(`</div>`);
			if (__props.error) _push(`<p class="text-xs text-[#DC2626]">${ssrInterpolate(__props.error)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// components/ui/AppSelect.vue
var _sfc_setup = AppSelect_vue_vue_type_script_setup_true_lang_default.setup;
AppSelect_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/AppSelect.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppSelect_default = Object.assign(AppSelect_vue_vue_type_script_setup_true_lang_default, { __name: "AppSelect" });

export { AppSelect_default as A };
//# sourceMappingURL=AppSelect-DZEwLx7G.mjs.map
