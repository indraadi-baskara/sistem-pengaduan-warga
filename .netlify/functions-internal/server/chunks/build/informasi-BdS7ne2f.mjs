import { a as useHead } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
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

// pages/informasi.vue?vue&type=script&setup=true&lang.ts
var informasi_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "informasi",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Informasi — Pengaduan Masyarakat" });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[800px]" }, _attrs))}><h1 class="text-xl font-extrabold">Informasi</h1><p class="text-sm text-muted mt-1">Alur dan ketentuan layanan pengaduan Kelurahan Pendrikan Kidul.</p><div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card space-y-4 text-sm leading-relaxed"><h2 class="font-bold">Alur Pengaduan</h2><ol class="list-decimal list-inside space-y-1 text-muted"><li>Warga membuat akun dan mengisi form pengaduan dengan bukti foto.</li><li>Pengurus verifikasi dan mengubah status menjadi <b class="text-ink">Diproses</b>.</li><li>Setelah ditindaklanjuti, status diupdate menjadi <b class="text-ink">Selesai</b> dengan catatan.</li><li>Warga dapat melacak via kode atau menu Riwayat.</li></ol><h2 class="font-bold">Kontak</h2><p class="text-muted">Jl. Bima Raya 1, Pendrikan Kidul, Semarang Tengah · Jam layanan 08:00–15:00 WIB</p></div></div>`);
		};
	}
});
// pages/informasi.vue
var _sfc_setup = informasi_vue_vue_type_script_setup_true_lang_default.setup;
informasi_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/informasi.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var informasi_default = informasi_vue_vue_type_script_setup_true_lang_default;

export { informasi_default as default };
//# sourceMappingURL=informasi-BdS7ne2f.mjs.map
