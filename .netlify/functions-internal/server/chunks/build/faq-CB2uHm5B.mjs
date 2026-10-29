import { a as useHead } from '../virtual/entry.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

// pages/faq.vue?vue&type=script&setup=true&lang.ts
var faq_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "faq",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "FAQ — Pengaduan Masyarakat" });
		const faqs = [
			{
				q: "Apakah harus buat akun?",
				a: "Ya, untuk melacak dan mendapat update status. Form publik di beranda juga memerlukan login."
			},
			{
				q: "Format lampiran apa yang didukung?",
				a: "JPG, PNG, WebP, PDF maksimal 5 MB."
			},
			{
				q: "Berapa lama ditanggapi?",
				a: "Maksimal 3 hari kerja untuk verifikasi awal."
			},
			{
				q: "Bagaimana cara lacak?",
				a: "Gunakan kode LW-YYYY-XXXX di halaman Lacak atau menu Riwayat."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[800px]" }, _attrs))}><h1 class="text-xl font-extrabold">FAQ</h1><div class="mt-4 space-y-3"><!--[-->`);
			ssrRenderList(faqs, (f) => {
				_push(`<details class="bg-white rounded-2xl border border-[#DCE8F1] p-4 shadow-card open:bg-[#F8FAFF]"><summary class="font-semibold cursor-pointer list-none flex items-center justify-between">${ssrInterpolate(f.q)} `);
				_push(ssrRenderComponent(_component_Icon, {
					name: "lucide:chevron-down",
					size: "16",
					class: "text-muted"
				}, null, _parent));
				_push(`</summary><p class="text-sm text-muted mt-2">${ssrInterpolate(f.a)}</p></details>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
// pages/faq.vue
var _sfc_setup = faq_vue_vue_type_script_setup_true_lang_default.setup;
faq_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var faq_default = faq_vue_vue_type_script_setup_true_lang_default;

export { faq_default as default };
//# sourceMappingURL=faq-CB2uHm5B.mjs.map
