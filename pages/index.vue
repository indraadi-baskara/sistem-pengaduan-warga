<script setup lang="ts">
definePageMeta({ layout: 'public' })
useHead({ title: 'Pengaduan Masyarakat — Pendrikan Kidul' })
const { list } = usePengaduan()
const kategoriList = ref<any[]>([])
const form = reactive({ judul: '', idKategori: '', deskripsi: '', lokasi: 'Jl. Bima Raya 1, Pendrikan Kidul', tampilPublik: true })
const file = ref<File|null>(null)
const submitting = ref(false)
const toast = ref<{type:'success'|'error';msg:string}|null>(null)
const recent = ref<any[]>([])
const stats = ref<number[]>([4,6,3,5,7,4,6,5,8,3])

onMounted(async () => {
  try { kategoriList.value = await $fetch<any>('/api/kategori') } catch {}
  try { const r:any = await list({ limit: 5 }); recent.value = r.data ?? [] } catch {}
})

async function onSubmit() {
  if (!form.judul || !form.idKategori || !form.deskripsi) { toast.value = { type:'error', msg:'Lengkapi semua field wajib' }; return }
  submitting.value = true
  try {
    let lampiran: any[] | undefined
    if (file.value) {
      const fd = new FormData(); fd.append('file', file.value)
      const up:any = await $fetch('/api/upload', { method:'POST', body: fd })
      lampiran = [{ namaFile: up.namaFile, kunciStorage: up.kunciStorage, mimeType: up.mimeType, ukuran: up.ukuran }]
    }
    const payload = { idKategori: Number(form.idKategori), lokasi: form.lokasi, deskripsi: `${form.judul}\n\n${form.deskripsi}`, tampilPublik: form.tampilPublik, lampiran }
    const res:any = await $fetch('/api/pengaduan', { method:'POST', body: payload })
    toast.value = { type:'success', msg: `Berhasil! Kode pelacakan: ${res.kode}` }
    form.judul=''; form.deskripsi=''; file.value=null
    const r:any = await list({ limit: 5 }); recent.value = r.data ?? []
  } catch (e:any) { toast.value = { type:'error', msg: e?.data?.message || 'Gagal mengirim pengaduan' } } finally { submitting.value=false; setTimeout(()=>toast.value=null, 4000) }
}
</script>
<template>
  <div class="space-y-4">
    <!-- Hero band with city -->
    <div class="rounded-2xl overflow-hidden border border-white bg-gradient-to-r from-[#EAF6FF] to-[#D6EAF5] h-[92px] flex items-center px-6 relative">
      <div class="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,#1976F3_1px,transparent_1px)] bg-[length:24px_24px]" aria-hidden="true" />
      <div class="relative"><p class="text-xs text-muted">Kelurahan Pendrikan Kidul · Kota Semarang</p><p class="text-sm font-semibold">Layanan pengaduan warga Jl. Bima Raya 1</p></div>
      <div class="ml-auto hidden md:flex items-center gap-2 text-xs"><span class="px-3 py-1 rounded-full bg-white border border-[#DCE8F1]">Transparan</span><span class="px-3 py-1 rounded-full bg-white border border-[#DCE8F1]">Responsif</span></div>
    </div>

    <AppAlert v-if="toast" :type="toast.type==='success' ? 'success':'error'" :title="toast.type==='success' ? 'Berhasil' : 'Gagal'" :message="toast.msg" />

    <div class="grid lg:grid-cols-[1.55fr_1fr] gap-6">
      <!-- Left: form -->
      <div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card p-6">
        <h2 class="text-lg font-extrabold">Form Pengaduan</h2>
        <div class="mt-4 space-y-4">
          <AppInput v-model="form.judul" label="Judul Pengaduan" placeholder="Contoh : Jalan Berlubang di Jln. Bima Raya 1" required />
          <AppSelect v-model="form.idKategori" label="Kategori Pengaduan" placeholder="Pilih Kategori Pengaduan" :options="kategoriList.map((k:any)=>({value:String(k.id), label:k.nama}))" required />
          <AppTextarea v-model="form.deskripsi" label="Deskripsi Pengaduan" placeholder="Jelaskan detail pengaduan anda..." required :rows="5" />
          <AppUpload v-model="file" label="Unggah Bukti" required />
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" v-model="form.tampilPublik" class="w-4 h-4 rounded border-[#DCE8F1] text-[#1976F3]" />
            Tampilkan di daftar publik
            <span v-if="!form.tampilPublik" class="text-xs text-muted">(hanya saya & pengelola yang bisa lihat)</span>
          </label>
          <AppButton size="lg" block :loading="submitting" @click="onSubmit"><Icon name="lucide:send" size="18" /> Kirim Pengaduan</AppButton>
        </div>
      </div>

      <!-- Right: recent + stats -->
      <div class="space-y-4">
        <div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card p-5">
          <div class="flex items-center justify-between"><h3 class="font-extrabold">Pengaduan Terbaru</h3><NuxtLink to="/publik" class="text-xs text-[#1976F3]">Lihat semua</NuxtLink></div>
          <div v-if="!recent.length" class="py-8 text-center text-sm text-muted">Belum ada pengaduan publik</div>
          <div v-else class="mt-2">
            <div v-for="it in recent" :key="it.id" class="flex items-center justify-between gap-3 py-3 border-b border-[#E5EDF5] last:border-0">
              <div class="min-w-0 flex gap-3">
                <div class="w-12 h-12 rounded-lg bg-[#EAF6FF] shrink-0 overflow-hidden"><img v-if="it.image" :src="it.image" class="w-full h-full object-cover" /><Icon v-else name="lucide:image" class="w-full h-full p-3 text-muted" /></div>
                <div class="min-w-0"><p class="text-sm font-semibold truncate max-w-[200px]">{{ it.deskripsi?.split('\n')[0] || it.kode }}</p><p class="text-xs text-muted flex items-center gap-1"><Icon name="lucide:map-pin" size="12" />{{ it.lokasi }}</p></div>
              </div>
              <StatusBadge :status="it.status" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card p-5">
          <div class="flex items-center justify-between"><p class="text-sm text-muted">Bulan : Jan–Okt</p><span class="px-3 py-1 rounded-lg border border-[#DCE8F1] text-sm font-bold bg-white">2026 <Icon name="lucide:chevron-down" size="12" class="inline" /></span></div>
          <div class="mt-3 rounded-xl bg-[#F8FAFF] border border-[#E5EDF5] p-3">
            <p class="text-xs font-bold flex items-center gap-2"><span class="w-5 h-5 rounded bg-[#EAF6FF] grid place-items-center"><Icon name="lucide:bar-chart-3" size="12" class="text-[#1976F3]" /></span> Statistik Pengaduan Bulanan</p>
            <div class="mt-3 flex items-end gap-1 h-[88px]">
              <div v-for="(v,i) in stats" :key="i" class="flex-1 flex flex-col items-center gap-1">
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
