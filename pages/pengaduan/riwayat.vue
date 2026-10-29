<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Riwayat — Pengaduan Masyarakat' })
const items = ref<any[]>([])
const q = ref('')
const statusFilter = ref('')
const loading = ref(true)
async function load() {
  loading.value=true
  try {
    const res:any = await $fetch('/api/pengaduan/me')
    items.value = Array.isArray(res) ? res : (res.data ?? res ?? [])
  } catch { items.value=[] } finally { loading.value=false }
}
onMounted(load)
const filtered = computed(()=>{
  let r = items.value
  if (statusFilter.value) r = r.filter((x:any)=>x.status===statusFilter.value)
  if (q.value) r = r.filter((x:any)=> `${x.kode} ${x.deskripsi} ${x.lokasi}`.toLowerCase().includes(q.value.toLowerCase()))
  return r
})
</script>
<template>
  <div>
    <h1 class="text-xl font-extrabold">Riwayat Pengaduan</h1>
    <p class="text-sm text-muted">Pantau perkembangan laporan Anda.</p>
    <div class="mt-4 flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <Icon name="lucide:search" size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input v-model="q" placeholder="Cari kode atau judul..." class="w-full h-10 rounded-xl border border-[#DCE8F1] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE]" />
      </div>
      <select v-model="statusFilter" class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm">
        <option value="">Semua status</option>
        <option value="diterima">Diterima</option>
        <option value="diproses">Dalam Proses</option>
        <option value="selesai">Selesai</option>
      </select>
    </div>
    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] shadow-card overflow-hidden">
      <div v-if="loading" class="p-10 text-center text-sm text-muted">Memuat...</div>
      <div v-else-if="!filtered.length" class="p-10 text-center">
        <p class="text-sm text-muted">Tidak ada pengaduan{{ q || statusFilter ? ' sesuai filter' : '' }}</p>
        <NuxtLink to="/pengaduan/create" class="mt-3 inline-flex h-9 px-4 items-center rounded-full bg-[#1976F3] text-white text-sm font-semibold">Buat Pengaduan</NuxtLink>
      </div>
      <div v-else class="divide-y divide-[#E5EDF5]">
        <NuxtLink v-for="it in filtered" :key="it.id" :to="`/pengaduan/${it.id}`" class="flex items-center justify-between gap-4 p-4 hover:bg-[#F8FAFF] transition">
          <div class="flex gap-3 min-w-0">
            <div class="w-14 h-14 rounded-xl bg-[#EAF6FF] overflow-hidden shrink-0 grid place-items-center">
              <img v-if="it.lampiran?.[0]?.kunciStorage" :src="`/api/lampiran/${it.lampiran[0].kunciStorage}`" class="w-full h-full object-cover" alt="" />
              <Icon v-else name="lucide:image" size="18" class="text-muted" />
            </div>
            <div class="min-w-0">
              <p class="text-sm font-bold truncate max-w-[360px]">{{ it.deskripsi?.split('\n')[0] || it.kode }}</p>
              <p class="text-xs text-muted">{{ it.kode }} · {{ it.lokasi }}</p>
              <p class="text-[11px] text-muted">{{ new Date(it.dibuatPada).toLocaleDateString('id-ID') }}</p>
            </div>
          </div>
          <StatusBadge :status="it.status" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
