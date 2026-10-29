import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

// components/ui/StatusBadge.vue?vue&type=script&setup=true&lang.ts
var StatusBadge_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StatusBadge",
	__ssrInlineRender: true,
	props: { status: {} },
	setup(__props) {
		const props = __props;
		const map = {
			selesai: {
				label: "Selesai",
				cls: "bg-[#DCFCE7] text-[#166534]"
			},
			diproses: {
				label: "Dalam Proses",
				cls: "bg-[#FEF9C3] text-[#92400E]"
			},
			diterima: {
				label: "Diterima",
				cls: "bg-[#DBEAFE] text-[#1E40AF]"
			},
			ditolak: {
				label: "Ditolak",
				cls: "bg-[#FEE2E2] text-[#991B1B]"
			}
		};
		const conf = computed(() => map[props.status] ?? {
			label: props.status,
			cls: "bg-gray-100 text-gray-600"
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: ["inline-flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-semibold leading-none whitespace-nowrap", unref(conf).cls] }, _attrs))}>${ssrInterpolate(unref(conf).label)}</span>`);
		};
	}
});
// components/ui/StatusBadge.vue
var _sfc_setup = StatusBadge_vue_vue_type_script_setup_true_lang_default.setup;
StatusBadge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/StatusBadge.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var StatusBadge_default = Object.assign(StatusBadge_vue_vue_type_script_setup_true_lang_default, { __name: "StatusBadge" });

export { StatusBadge_default as S };
//# sourceMappingURL=StatusBadge-Bk82bS9D.mjs.map
