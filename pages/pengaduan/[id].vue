<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
const route = useRoute()
const item = ref<any>(null)
const loading = ref(true)
const err = ref('')
function toDate(v: any) {
  if (v == null) return null
  const n = Number(v)
  if (Number.isNaN(n)) return new Date(v)
  return new Date(n < 1e12 ? n * 1000 : n)
}
function fmtDate(v: any) {
  const d = toDate(v)
  return d ? d.toLocaleString('id-ID') : '-'
}
onMounted(async ()=>{
  try { item.value = await $fetch<any>(`/api/pengaduan/${route.params.id}`) } catch(e:any){ err.value = e?.data?.statusMessage || e?.data?.message || 'Tidak ditemukan' } finally { loading.value=false }
})
useHead({ title: () => item.value ? `${item.value.kode} — Detail` : 'Detail Pengaduan' })
</script>
<template>
  <div>
    <NuxtLink to="/pengaduan/riwayat" class="text-sm text-[#1976F3] inline-flex items-center gap-1"><Icon name="lucide:arrow-left" size="14" /> Kembali</NuxtLink>
    <div v-if="loading" class="mt-4 p-10 text-center text-sm text-muted">Memuat...</div>
    <AppAlert v-else-if="err" type="error" :message="err" class="mt-4" />
    <div v-else class="mt-4 space-y-4">
      <div class="bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div><p class="text-xs text-muted">{{ item.kode }}</p><h1 class="text-lg font-extrabold">{{ item.deskripsi?.split('\n')[0] }}</h1><p class="text-sm text-muted flex items-center gap-1 mt-1"><Icon name="lucide:map-pin" size="14" />{{ item.lokasi }}</p></div>
          <StatusBadge :status="item.status" />
        </div>
        <div class="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <div class="rounded-xl bg-[#F8FAFF] border border-[#E5EDF5] p-3"><p class="text-xs text-muted">Kategori</p><p class="font-semibold">{{ item.kategori?.nama || '-' }}</p></div>
          <div class="rounded-xl bg-[#F8FAFF] border border-[#E5EDF5] p-3"><p class="text-xs text-muted">Tanggal</p><p class="font-semibold">{{ fmtDate(item.createdAt) }}</p></div>
        </div>
        <div class="mt-4"><p class="text-sm font-semibold">Deskripsi</p><p class="text-sm text-muted whitespace-pre-wrap mt-1">{{ item.deskripsi }}</p></div>
        <div v-if="item.lampiran?.length" class="mt-4"><p class="text-sm font-semibold">Lampiran</p><div class="mt-2 flex flex-wrap gap-2"><span v-for="l in item.lampiran" :key="l.id" class="px-3 py-1 rounded-full bg-[#EAF6FF] text-xs">{{ l.namaFile }}</span></div></div>
      </div>
      <div class="bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card">
        <h2 class="font-extrabold">Riwayat Status</h2>
        <div v-if="!item.riwayat?.length" class="mt-3 text-sm text-muted">Belum ada pembaruan</div>
        <ol v-else class="mt-3 space-y-3">
          <li v-for="r in item.riwayat" :key="r.id" class="flex gap-3">
            <span class="w-2 h-2 rounded-full bg-[#1976F3] mt-2 shrink-0" />
            <div class="rounded-xl border border-[#E5EDF5] bg-[#F8FAFF] px-3 py-2 flex-1">
              <p class="text-sm font-semibold capitalize">{{ r.status }} <span class="text-muted font-normal">· {{ fmtDate(r.createdAt) }}</span></p>
              <p v-if="r.catatan" class="text-xs text-muted mt-1">{{ r.catatan }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
