<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Beranda — Pengaduan Masyarakat' })
const { user } = useAuth()
const stats = ref({ diterima: 0, diproses: 0, selesai: 0, total: 0 })
const recent = ref<any[]>([])
const loading = ref(true)
const now = new Date()
const monthName = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

onMounted(async () => {
  try {
    const me:any = await $fetch('/api/pengaduan/me')
    const items = Array.isArray(me) ? me : (me.data ?? [])
    recent.value = items.slice(0, 3)
    stats.value.total = items.length
    stats.value.diterima = items.filter((x:any)=>x.status==='diterima').length
    stats.value.diproses = items.filter((x:any)=>x.status==='diproses').length
    stats.value.selesai = items.filter((x:any)=>x.status==='selesai').length
  } catch {} finally { loading.value=false }
})

// mini calendar for October 2025 mimic
const calDays = ['M','S','S','R','K','J','S']
const calDates = [
  [null,null,null,1,2,3,4],
  [5,6,7,8,9,10,11],
  [12,13,14,15,16,17,18],
  [19,20,21,22,23,24,25],
  [26,27,28,29,30,31,null],
]
</script>
<template>
  <div class="space-y-4">
    <!-- Welcome banner -->
    <div class="bg-white rounded-2xl border border-[#DCE8F1] p-5 flex items-center gap-4 shadow-card">
      <div class="w-12 h-12 rounded-full bg-[#1976F3] text-white grid place-items-center font-bold text-lg shrink-0">{{ (user?.nama||'U').slice(0,1).toUpperCase() }}</div>
      <div>
        <h1 class="text-[18px] font-extrabold">Selamat Datang, {{ user?.nama || 'Warga' }}!</h1>
        <p class="text-sm text-muted">Di halaman beranda pengaduan, Anda bisa melihat berapa banyak laporan yang telah Anda buat dan memantau perkembangan pengaduan Anda untuk mewujudkan Pendrikan Kidul yang lebih baik.</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard label="Total Pengaduan" :value="stats.total" tone="blue" icon="lucide:file-text" />
      <StatCard label="Pengaduan Baru" :value="stats.diterima" tone="yellow" icon="lucide:file-clock" />
      <StatCard label="Dalam Proses" :value="stats.diproses" tone="yellow" icon="lucide:loader-circle" />
      <StatCard label="Pengaduan Selesai" :value="stats.selesai" tone="green" icon="lucide:badge-check" />
    </div>

    <div class="grid lg:grid-cols-[1.7fr_340px] gap-4">
      <!-- Pengaduan terbaru -->
      <div class="bg-white rounded-2xl border border-[#DCE8F1] p-5 shadow-card">
        <div class="flex items-center justify-between">
          <h2 class="font-extrabold">Pengaduan Terbaru</h2>
          <NuxtLink to="/pengaduan/riwayat" class="text-xs text-[#1976F3]">Lihat semua</NuxtLink>
        </div>
        <div v-if="loading" class="py-10 text-center text-sm text-muted">Memuat...</div>
        <div v-else-if="!recent.length" class="py-10 text-center">
          <p class="text-sm text-muted">Belum ada pengaduan</p>
          <NuxtLink to="/pengaduan/create" class="mt-3 inline-flex h-9 px-4 items-center rounded-full bg-[#1976F3] text-white text-sm font-semibold">Buat pengaduan pertama</NuxtLink>
        </div>
        <div v-else class="mt-2">
          <PengaduanCard v-for="it in recent" :key="it.id" :item="it" />
        </div>
      </div>

      <!-- Right: calendar + monthly stats -->
      <div class="space-y-4">
        <div class="bg-white rounded-2xl border border-[#DCE8F1] p-4 shadow-card">
          <div class="flex items-center gap-2">
            <span class="w-9 h-9 rounded-full bg-[#1976F3] text-white grid place-items-center"><Icon name="lucide:calendar" size="18" /></span>
            <div><p class="text-sm font-extrabold">Jadwal</p><p class="text-xs text-muted">Oktober 2025</p></div>
            <span class="ml-auto text-xs font-bold">{{ monthName }}</span>
          </div>
          <div class="mt-3 grid grid-cols-7 text-center text-[11px] font-semibold text-muted">
            <span v-for="d in calDays" :key="d">{{ d }}</span>
          </div>
          <div class="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
            <template v-for="(week,wi) in calDates" :key="wi">
              <span v-for="(d,di) in week" :key="di" :class="['h-7 grid place-items-center rounded-full', d===15 ? 'bg-[#1976F3] text-white font-bold' : d ? 'hover:bg-[#EAF6FF]' : '']">{{ d || '' }}</span>
            </template>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-[#DCE8F1] p-4 shadow-card">
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted">Bulan : Jan–Okt</p>
            <span class="px-3 py-1 rounded-lg border border-[#DCE8F1] text-sm font-bold bg-white">2026 <Icon name="lucide:chevron-down" size="12" class="inline" /></span>
          </div>
          <div class="mt-3 rounded-xl bg-[#F8FAFF] border border-[#E5EDF5] p-3">
            <p class="text-xs font-bold flex items-center gap-2"><span class="w-5 h-5 rounded bg-[#EAF6FF] grid place-items-center"><Icon name="lucide:bar-chart-3" size="12" class="text-[#1976F3]" /></span> Statistik Pengaduan Bulanan</p>
            <div class="mt-3 flex items-end gap-1 h-[88px]">
              <div v-for="(v,i) in [4,6,3,5,7,4,6,5,8,3]" :key="i" class="flex-1 flex flex-col items-center gap-1">
                <span class="text-[10px] font-bold text-[#1976F3]">{{ v }}</span>
                <div :style="{ height: `${v*10}px` }" class="w-full rounded-t bg-[#1976F3]" />
              </div>
            </div>
            <div class="flex justify-between text-[10px] text-muted mt-1"><span>Jan</span><span>Des</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
