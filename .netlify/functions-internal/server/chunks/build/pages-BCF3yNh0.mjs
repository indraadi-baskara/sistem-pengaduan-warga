import { a as useHead, $ as $fetch } from '../virtual/entry.mjs';
import { N as NuxtLink } from './nuxt-link-C7FSBqNN.mjs';
import { t as components_default } from './components-0OfPnzPL.mjs';
import { A as AppButton_default } from './AppButton-Bs21ZYWr.mjs';
import { S as StatusBadge_default } from './StatusBadge-Bk82bS9D.mjs';
import { A as AppAlert_default } from './AppAlert-gLt8pBzn.mjs';
import { A as AppInput_default } from './AppInput-DIEvGQ1m.mjs';
import { A as AppSelect_default } from './AppSelect-DZEwLx7G.mjs';
import { A as AppTextarea_default, a as AppUpload_default } from './AppUpload-tTe1E8vf.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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

// composables/usePengaduan.ts
var usePengaduan = () => {
	const list = async (params = {}) => {
		return await $fetch("/api/pengaduan", { query: params });
	};
	const track = async (kode) => {
		return await $fetch(`/api/pengaduan/kode/${kode}`);
	};
	const detail = async (id) => {
		return await $fetch(`/api/pengaduan/${id}`);
	};
	const create = async (payload) => {
		return await $fetch("/api/pengaduan", {
			method: "POST",
			body: payload
		});
	};
	const me = async () => {
		return await $fetch("/api/pengaduan/me");
	};
	const adminList = async (params = {}) => {
		return await $fetch("/api/admin/pengaduan", { query: params });
	};
	const updateStatus = async (id, status, catatan) => {
		return await $fetch(`/api/admin/pengaduan/${id}/status`, {
			method: "PATCH",
			body: {
				status,
				catatan
			}
		});
	};
	const toggleVisibility = async (id, tampilPublik) => {
		return await $fetch(`/api/admin/pengaduan/${id}/visibility`, {
			method: "PATCH",
			body: { tampilPublik }
		});
	};
	return {
		list,
		track,
		detail,
		create,
		me,
		adminList,
		updateStatus,
		toggleVisibility
	};
};
// pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({ title: "Pengaduan Masyarakat — Pendrikan Kidul" });
		const { list } = usePengaduan();
		const kategoriList = ref([]);
		const form = reactive({
			judul: "",
			idKategori: "",
			deskripsi: "",
			lokasi: "Jl. Bima Raya 1, Pendrikan Kidul",
			tampilPublik: true
		});
		const file = ref(null);
		const submitting = ref(false);
		const toast = ref(null);
		const recent = ref([]);
		const stats = ref([
			4,
			6,
			3,
			5,
			7,
			4,
			6,
			5,
			8,
			3
		]);
		async function onSubmit() {
			if (!form.judul || !form.idKategori || !form.deskripsi) {
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
					msg: `Berhasil! Kode pelacakan: ${res.kode}`
				};
				form.judul = "";
				form.deskripsi = "";
				file.value = null;
				const r = await list({ limit: 5 });
				recent.value = r.data ?? [];
			} catch (e) {
				toast.value = {
					type: "error",
					msg: e?.data?.message || "Gagal mengirim pengaduan"
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
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="rounded-2xl overflow-hidden border border-white bg-gradient-to-r from-[#EAF6FF] to-[#D6EAF5] h-[92px] flex items-center px-6 relative"><div class="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,#1976F3_1px,transparent_1px)] bg-[length:24px_24px]" aria-hidden="true"></div><div class="relative"><p class="text-xs text-muted">Kelurahan Pendrikan Kidul · Kota Semarang</p><p class="text-sm font-semibold">Layanan pengaduan warga Jl. Bima Raya 1</p></div><div class="ml-auto hidden md:flex items-center gap-2 text-xs"><span class="px-3 py-1 rounded-full bg-white border border-[#DCE8F1]">Transparan</span><span class="px-3 py-1 rounded-full bg-white border border-[#DCE8F1]">Responsif</span></div></div>`);
			if (unref(toast)) _push(ssrRenderComponent(_component_AppAlert, {
				type: unref(toast).type === "success" ? "success" : "error",
				title: unref(toast).type === "success" ? "Berhasil" : "Gagal",
				message: unref(toast).msg
			}, null, _parent));
			else _push(`<!---->`);
			_push(`<div class="grid lg:grid-cols-[1.55fr_1fr] gap-6"><div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card p-6"><h2 class="text-lg font-extrabold">Form Pengaduan</h2><div class="mt-4 space-y-4">`);
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
			_push(`</div></div><div class="space-y-4"><div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card p-5"><div class="flex items-center justify-between"><h3 class="font-extrabold">Pengaduan Terbaru</h3>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/publik",
				class: "text-xs text-[#1976F3]"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Lihat semua`);
					else return [createTextVNode("Lihat semua")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (!unref(recent).length) _push(`<div class="py-8 text-center text-sm text-muted">Belum ada pengaduan publik</div>`);
			else {
				_push(`<div class="mt-2"><!--[-->`);
				ssrRenderList(unref(recent), (it) => {
					_push(`<div class="flex items-center justify-between gap-3 py-3 border-b border-[#E5EDF5] last:border-0"><div class="min-w-0 flex gap-3"><div class="w-12 h-12 rounded-lg bg-[#EAF6FF] shrink-0 overflow-hidden">`);
					if (it.image) _push(`<img${ssrRenderAttr("src", it.image)} class="w-full h-full object-cover">`);
					else _push(ssrRenderComponent(_component_Icon, {
						name: "lucide:image",
						class: "w-full h-full p-3 text-muted"
					}, null, _parent));
					_push(`</div><div class="min-w-0"><p class="text-sm font-semibold truncate max-w-[200px]">${ssrInterpolate(it.deskripsi?.split("\n")[0] || it.kode)}</p><p class="text-xs text-muted flex items-center gap-1">`);
					_push(ssrRenderComponent(_component_Icon, {
						name: "lucide:map-pin",
						size: "12"
					}, null, _parent));
					_push(`${ssrInterpolate(it.lokasi)}</p></div></div>`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: it.status }, null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div><div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card p-5"><div class="flex items-center justify-between"><p class="text-sm text-muted">Bulan : Jan–Okt</p><span class="px-3 py-1 rounded-lg border border-[#DCE8F1] text-sm font-bold bg-white">2026 `);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:chevron-down",
				size: "12",
				class: "inline"
			}, null, _parent));
			_push(`</span></div><div class="mt-3 rounded-xl bg-[#F8FAFF] border border-[#E5EDF5] p-3"><p class="text-xs font-bold flex items-center gap-2"><span class="w-5 h-5 rounded bg-[#EAF6FF] grid place-items-center">`);
			_push(ssrRenderComponent(_component_Icon, {
				name: "lucide:bar-chart-3",
				size: "12",
				class: "text-[#1976F3]"
			}, null, _parent));
			_push(`</span> Statistik Pengaduan Bulanan</p><div class="mt-3 flex items-end gap-1 h-[88px]"><!--[-->`);
			ssrRenderList(unref(stats), (v, i) => {
				_push(`<div class="flex-1 flex flex-col items-center gap-1"><span class="text-[10px] font-bold text-[#1976F3]">${ssrInterpolate(v)}</span><div style="${ssrRenderStyle({ height: `${v * 10}px` })}" class="w-full rounded-t bg-[#1976F3]"></div></div>`);
			});
			_push(`<!--]--></div><div class="flex justify-between text-[10px] text-muted mt-1"><span>Jan</span><span>Des</span></div></div></div></div></div></div>`);
		};
	}
});
// pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-BCF3yNh0.mjs.map
