import { a as useHead, $ as $fetch, n as navigateTo } from '../virtual/entry.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { A as AppButton_default } from './AppButton-Bs21ZYWr.mjs';
import { A as AppAlert_default } from './AppAlert-gLt8pBzn.mjs';
import { A as AppInput_default } from './AppInput-DIEvGQ1m.mjs';
import { A as AppSelect_default } from './AppSelect-DZEwLx7G.mjs';
import { A as AppTextarea_default, a as AppUpload_default } from './AppUpload-tTe1E8vf.mjs';
import { defineComponent, ref, reactive, unref, isRef, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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

// pages/pengaduan/create.vue?vue&type=script&setup=true&lang.ts
var create_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "create",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Buat Pengaduan — Pengaduan Masyarakat" });
		const kategoriList = ref([]);
		const form = reactive({
			judul: "",
			idKategori: "",
			deskripsi: "",
			lokasi: "",
			tampilPublik: true
		});
		const file = ref(null);
		const submitting = ref(false);
		const toast = ref(null);
		async function onSubmit() {
			if (!form.judul || !form.idKategori || !form.deskripsi || !form.lokasi) {
				toast.value = {
					type: "error",
					msg: "Lengkapi semua field wajib"
				};
				return;
			}
			submitting.value = true;
			try {
				let lampiran;
				if (file.value) {
					const fd = new FormData();
					fd.append("file", file.value);
					const up = await $fetch("/api/upload", {
						method: "POST",
						body: fd
					});
					lampiran = [{
						namaFile: up.namaFile,
						kunciStorage: up.kunciStorage,
						mimeType: up.mimeType,
						ukuran: up.ukuran
					}];
				}
				const payload = {
					idKategori: Number(form.idKategori),
					lokasi: form.lokasi,
					deskripsi: `${form.judul}\n\n${form.deskripsi}`,
					tampilPublik: form.tampilPublik,
					lampiran
				};
				const res = await $fetch("/api/pengaduan", {
					method: "POST",
					body: payload
				});
				toast.value = {
					type: "success",
					msg: `Berhasil! Kode: ${res.kode}`
				};
				setTimeout(() => navigateTo("/pengaduan/riwayat"), 900);
			} catch (e) {
				toast.value = {
					type: "error",
					msg: e?.data?.message || e?.data?.statusMessage || "Gagal mengirim"
				};
			} finally {
				submitting.value = false;
				setTimeout(() => toast.value = null, 4e3);
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppAlert = AppAlert_default;
			const _component_AppInput = AppInput_default;
			const _component_AppSelect = AppSelect_default;
			const _component_AppTextarea = AppTextarea_default;
			const _component_AppUpload = AppUpload_default;
			const _component_AppButton = AppButton_default;
			const _component_Icon = components_default;
			_push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-xl font-extrabold">Buat Pengaduan</h1><p class="text-sm text-muted">Sampaikan pengaduan Anda untuk lingkungan Pendrikan Kidul yang lebih baik.</p><div class="mt-4 grid lg:grid-cols-[1.6fr_340px] gap-6"><div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card p-6"><h2 class="text-[15px] font-extrabold">Form Pengaduan</h2>`);
			if (unref(toast)) _push(ssrRenderComponent(_component_AppAlert, {
				type: unref(toast).type === "success" ? "success" : "error",
				title: unref(toast).type === "success" ? "Berhasil" : "Gagal",
				message: unref(toast).msg,
				class: "mt-3"
			}, null, _parent));
			else _push(`<!---->`);
			_push(`<div class="mt-4 space-y-4">`);
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).judul,
				"onUpdate:modelValue": ($event) => unref(form).judul = $event,
				label: "Judul Pengaduan",
				placeholder: "Contoh : Jalan Berlubang di Jln. Bima Raya 1",
				required: ""
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppSelect, {
				modelValue: unref(form).idKategori,
				"onUpdate:modelValue": ($event) => unref(form).idKategori = $event,
				label: "Kategori Pengaduan",
				placeholder: "Pilih Kategori Pengaduan",
				options: unref(kategoriList).map((k) => ({
					value: String(k.id),
					label: k.nama
				})),
				required: ""
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppInput, {
				modelValue: unref(form).lokasi,
				"onUpdate:modelValue": ($event) => unref(form).lokasi = $event,
				label: "Lokasi Kejadian",
				placeholder: "Jl. Bima Raya 1 No ...",
				required: ""
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppTextarea, {
				modelValue: unref(form).deskripsi,
				"onUpdate:modelValue": ($event) => unref(form).deskripsi = $event,
				label: "Deskripsi Pengaduan",
				placeholder: "Jelaskan detail pengaduan anda...",
				required: "",
				rows: 5
			}, null, _parent));
			_push(ssrRenderComponent(_component_AppUpload, {
				modelValue: unref(file),
				"onUpdate:modelValue": ($event) => isRef(file) ? file.value = $event : null,
				label: "Unggah Bukti",
				required: ""
			}, null, _parent));
			_push(`<label class="flex items-center gap-2 text-sm"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tampilPublik) ? ssrLooseContain(unref(form).tampilPublik, null) : unref(form).tampilPublik) ? " checked" : ""} class="w-4 h-4 rounded border-[#DCE8F1] text-[#1976F3]"> Tampilkan di daftar publik `);
			if (!unref(form).tampilPublik) _push(`<span class="text-xs text-muted">(hanya saya &amp; pengelola yang bisa lihat)</span>`);
			else _push(`<!---->`);
			_push(`</label>`);
			_push(ssrRenderComponent(_component_AppButton, {
				size: "lg",
				block: "",
				loading: unref(submitting),
				onClick: onSubmit
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_Icon, {
							name: "lucide:send",
							size: "18"
						}, null, _parent, _scopeId));
						_push(` Kirim Pengaduan`);
					} else return [createVNode(_component_Icon, {
						name: "lucide:send",
						size: "18"
					}), createTextVNode(" Kirim Pengaduan")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="bg-[#D6EAF5] rounded-2xl border border-[#BFDBFE] p-5 h-fit"><h3 class="font-bold flex items-center gap-2 text-[#1E40AF]">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:megaphone",
				size: "18",
				class: "text-[#1976F3]"
			}, null, _parent));
			_push(` Informasi Penting</h3><ol class="mt-3 space-y-2 text-sm text-[#1E40AF] list-decimal list-inside leading-relaxed"><li>Pastikan pengaduan sesuai dengan wilayah kelurahan Pendrikan Kidul</li><li>Sertakan deskripsi yang jelas dan foto untuk bukti</li><li>Pengaduan akan di proses oleh petugas dan Anda dapat memantau statusnya di menu Riwayat Pengaduan</li></ol></div></div></div>`);
		};
	}
});
// pages/pengaduan/create.vue
var _sfc_setup = create_vue_vue_type_script_setup_true_lang_default.setup;
create_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pengaduan/create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var create_default = create_vue_vue_type_script_setup_true_lang_default;

export { create_default as default };
//# sourceMappingURL=create-BviaiURd.mjs.map
