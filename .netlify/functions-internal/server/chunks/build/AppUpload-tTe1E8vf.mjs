import { t as components_default } from './components-0OfPnzPL.mjs';
import { defineComponent, mergeProps, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';

// components/ui/AppTextarea.vue?vue&type=script&setup=true&lang.ts
var AppTextarea_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppTextarea",
	__ssrInlineRender: true,
	props: {
		label: {},
		modelValue: {},
		placeholder: {},
		error: {},
		required: { type: Boolean },
		rows: {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const id = `ta-${Math.random().toString(36).slice(2, 7)}`;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}>`);
			if (__props.label) {
				_push(`<label${ssrRenderAttr("for", id)} class="text-[13px] font-semibold text-ink">${ssrInterpolate(__props.label)} `);
				if (__props.required) _push(`<span class="text-[#DC2626]">*</span>`);
				else _push(`<!---->`);
				_push(`</label>`);
			} else _push(`<!---->`);
			_push(`<textarea${ssrRenderAttr("id", id)}${ssrRenderAttr("rows", __props.rows || 4)}${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass(["w-full rounded-xl border bg-white px-4 py-3 text-[14px] placeholder:text-[#9CA3AF] focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE] outline-none transition resize-none", __props.error ? "border-[#FCA5A5]" : "border-[#DCE8F1]"])}">${ssrInterpolate(__props.modelValue)}</textarea>`);
			if (__props.error) _push(`<p class="text-xs text-[#DC2626]">${ssrInterpolate(__props.error)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// components/ui/AppTextarea.vue
var _sfc_setup$1 = AppTextarea_vue_vue_type_script_setup_true_lang_default.setup;
AppTextarea_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/AppTextarea.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AppTextarea_default = Object.assign(AppTextarea_vue_vue_type_script_setup_true_lang_default, { __name: "AppTextarea" });
// components/ui/AppUpload.vue?vue&type=script&setup=true&lang.ts
var AppUpload_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppUpload",
	__ssrInlineRender: true,
	props: {
		label: {},
		required: { type: Boolean },
		modelValue: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const dragging = ref(false);
		ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}>`);
			if (__props.label) {
				_push(`<label class="text-[13px] font-semibold text-ink">${ssrInterpolate(__props.label)} `);
				if (__props.required) _push(`<span class="text-[#DC2626]">*</span>`);
				else _push(`<!---->`);
				_push(`</label>`);
			} else _push(`<!---->`);
			_push(`<div class="${ssrRenderClass(["flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed bg-white px-6 py-8 text-center cursor-pointer transition", unref(dragging) ? "border-[#1976F3] bg-[#EAF6FF]" : "border-[#BFDBFE] hover:bg-[#F8FAFF]"])}"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-[#EAF6FF] flex items-center justify-center text-[#1976F3]">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:download",
				size: "20"
			}, null, _parent));
			_push(`</div><div class="text-left"><p class="text-sm font-semibold text-[#1976F3]">Klik untuk mengunggah foto</p><p class="text-xs text-muted">atau drag &amp; drop file di sini</p><p class="text-[11px] text-[#9CA3AF]">(JPG, PNG, maksimal 5 MB)</p></div></div>`);
			if (__props.modelValue) _push(`<p class="text-xs font-medium text-ink mt-1">Terpilih: ${ssrInterpolate(__props.modelValue.name)} (${ssrInterpolate((__props.modelValue.size / 1024).toFixed(0))} KB)</p>`);
			else _push(`<!---->`);
			_push(`</div><input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" class="hidden"></div>`);
		};
	}
});
// components/ui/AppUpload.vue
var _sfc_setup = AppUpload_vue_vue_type_script_setup_true_lang_default.setup;
AppUpload_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/AppUpload.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppUpload_default = Object.assign(AppUpload_vue_vue_type_script_setup_true_lang_default, { __name: "AppUpload" });

export { AppTextarea_default as A, AppUpload_default as a };
//# sourceMappingURL=AppUpload-tTe1E8vf.mjs.map
