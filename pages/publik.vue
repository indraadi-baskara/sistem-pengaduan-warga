<script setup lang="ts">
definePageMeta({ layout: 'public' })
useHead({ title: 'Pengaduan Publik — Pendrikan Kidul' })

const kategoriList = ref<any[]>([])
const items = ref<any[]>([])
const total = ref(0)
const loading = ref(true)
const status = ref('')
const kategori = ref('')
const q = ref('')

const limit = 12
const offset = ref(0)

function epochToDate(v: any) {
  if (v == null) return null
  // API returns integer seconds; coerce string/number
  const n = Number(v)
  if (Number.isNaN(n)) return new Date(v)
  // heuristic: if < 1e12 treat as seconds
  return new Date(n < 1e12 ? n * 1000 : n)
}
function fmtDate(v: any) {
  const d = epochToDate(v)
  return d ? d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'
}

async function load(reset = false) {
  if (reset) offset.value = 0
  loading.value = true
  try {
    const res: any = await $fetch('/api/pengaduan', {
      query: {
        status: status.value || undefined,
        kategori: kategori.value || undefined,
        q: q.value || undefined,
        limit,
        offset: offset.value,
      },
    })
    const incoming = res.data ?? []
    items.value = offset.value === 0 ? incoming : [...items.value, ...incoming]
    total.value = res.total ?? incoming.length
  } catch {
    if (offset.value === 0) items.value = []
  } finally {
    loading.value = false
  }
}
function nextPage() {
  if (items.value.length >= total.value) return
  offset.value += limit
  load()
}

onMounted(async () => {
  try { kategoriList.value = await $fetch<any>('/api/kategori') } catch {}
  await load(true)
})
watch([status, kategori], () => load(true))
</script>
<template>
  <div class="max-w-[1100px] mx-auto">
    <h1 class="text-xl font-extrabold">Pengaduan Publik</h1>
    <p class="text-sm text-muted">Daftar laporan warga yang ditampilkan untuk transparansi (FR-04). Gunakan filter status/kategori.</p>

    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-4 shadow-card flex flex-col lg:flex-row gap-3">
      <div class="relative flex-1">
        <Icon name="lucide:search" size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          v-model="q"
          placeholder="Cari kode / lokasi / deskripsi..."
          class="w-full h-10 rounded-xl border border-[#DCE8F1] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE]"
          @keydown.enter="load(true)"
        />
      </div>
      <select v-model="status" class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm">
        <option value="">Semua status</option>
        <option value="diterima">Diterima</option>
        <option value="diproses">Diproses</option>
        <option value="selesai">Selesai</option>
      </select>
      <select v-model="kategori" class="h-10 rounded-xl border border-[#DCE8F1] bg-white px-3 text-sm">
        <option value="">Semua kategori</option>
        <option v-for="k in kategoriList" :key="k.id" :value="k.id">{{ k.nama }}</option>
      </select>
      <AppButton size="sm" @click="load(true)">Cari</AppButton>
    </div>

    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] shadow-card overflow-hidden">
      <div v-if="loading && !items.length" class="p-10 text-center text-sm text-muted">Memuat...</div>
      <div v-else-if="!items.length" class="p-10 text-center">
        <p class="text-sm text-muted">Belum ada pengaduan publik sesuai filter.</p>
        <NuxtLink to="/pengaduan/create" class="mt-3 inline-flex text-sm text-[#1976F3]">Buat pengaduan →</NuxtLink>
      </div>
      <div v-else>
        <div class="divide-y divide-[#E5EDF5]">
          <NuxtLink
            v-for="it in items"
            :key="it.id"
            :to="`/pengaduan/${it.id}`"
            class="flex items-center justify-between gap-4 p-4 hover:bg-[#F8FAFF] transition"
          >
            <div class="flex gap-3 min-w-0">
              <div class="w-14 h-14 rounded-xl bg-[#EAF6FF] overflow-hidden shrink-0 grid place-items-center">
                <img v-if="it.lampiran?.[0]?.kunciStorage" :src="`/api/lampiran/${it.lampiran[0].kunciStorage}`" class="w-full h-full object-cover" alt="" />
                <Icon v-else name="lucide:image" size="18" class="text-muted" />
              </div>
              <div class="min-w-0">
                <p class="text-sm font-bold truncate max-w-[520px]">{{ it.deskripsi?.split('\n')[0] || it.kode }}</p>
                <p class="text-xs text-muted">{{ it.kode }} · {{ it.kategori?.nama || '-' }} · {{ it.lokasi }}</p>
                <p class="text-[11px] text-muted">{{ fmtDate(it.createdAt) }}</p>
              </div>
            </div>
            <StatusBadge :status="it.status" />
          </NuxtLink>
        </div>
        <div class="p-4 flex items-center justify-between border-t border-[#E5EDF5] text-xs text-muted">
          <span>{{ items.length }} / {{ total }} ditampilkan</span>
          <AppButton v-if="items.length < total" size="sm" variant="secondary" @click="nextPage">Muat lagi</AppButton>
          <span v-else>Semua data termuat</span>
        </div>
      </div>
    </div>
  </div>
</template>
