<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'admin' })
useHead({ title: 'Admin — Pengaduan Masuk' })
const items = ref<any[]>([])
const status = ref('')
const q = ref('')
const loading = ref(true)
async function load(){
  loading.value=true
  try { const r:any = await $fetch('/api/admin/pengaduan', { query: { status: status.value || undefined, q: q.value || undefined } }); items.value = r.data ?? r ?? [] } catch { items.value=[] } finally { loading.value=false }
}
onMounted(load)
watch(status, load)
async function setStatus(id:number, s:string){
  await $fetch(`/api/admin/pengaduan/${id}/status`, { method:'PATCH', body:{ status: s } })
  await load()
}
async function toggleVis(it:any){
  await $fetch(`/api/admin/pengaduan/${it.id}/visibility`, { method:'PATCH', body:{ tampilPublik: !it.tampilPublik } })
  await load()
}
</script>
<template>
  <div>
    <h1 class="text-xl font-extrabold">Kelola Pengaduan</h1>
    <p class="text-sm text-muted">Hanya untuk pengurus & admin</p>
    <div class="mt-4 flex flex-wrap gap-2">
      <input v-model="q" placeholder="Cari kode / lokasi" class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm flex-1 min-w-[200px]" @keydown.enter="load" />
      <select v-model="status" class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm">
        <option value="">Semua</option><option value="diterima">Diterima</option><option value="diproses">Diproses</option><option value="selesai">Selesai</option>
      </select>
      <AppButton size="sm" @click="load">Cari</AppButton>
      <NuxtLink to="/admin/users" class="h-10 px-4 rounded-xl border border-[#DCE8F1] bg-white text-sm font-semibold inline-flex items-center">Kelola User</NuxtLink>
      <NuxtLink to="/admin/pengaturan" class="h-10 px-4 rounded-xl border border-[#DCE8F1] bg-white text-sm font-semibold inline-flex items-center">Pengaturan Publik</NuxtLink>
    </div>
    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] shadow-card overflow-hidden">
      <div v-if="loading" class="p-8 text-center text-sm text-muted">Memuat...</div>
      <div v-else-if="!items.length" class="p-8 text-center text-sm text-muted">Tidak ada data</div>
      <div v-else class="divide-y divide-[#E5EDF5]">
        <div v-for="it in items" :key="it.id" class="p-4 flex flex-wrap items-center justify-between gap-3">
          <div class="min-w-0"><p class="text-sm font-bold">{{ it.kode }} · <span class="text-muted font-normal">{{ it.lokasi }}</span></p><p class="text-xs text-muted truncate max-w-[520px]">{{ it.deskripsi?.split('\n')[0] }}</p></div>
          <div class="flex items-center gap-2">
            <StatusBadge :status="it.status" />
            <select :value="it.status" @change="setStatus(it.id, ($event.target as HTMLSelectElement).value)" class="h-8 rounded-full border border-[#DCE8F1] bg-white px-2 text-xs">
              <option value="diterima">Diterima</option><option value="diproses">Diproses</option><option value="selesai">Selesai</option>
            </select>
            <button @click="toggleVis(it)" :class="['h-8 px-3 rounded-full text-xs font-semibold border', it.tampilPublik ? 'bg-white border-[#DCE8F1]' : 'bg-[#FEE2E2] border-[#FECACA] text-[#991B1B]']">{{ it.tampilPublik ? 'Publik' : 'Hidden' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
