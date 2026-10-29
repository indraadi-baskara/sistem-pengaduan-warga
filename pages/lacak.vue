<script setup lang="ts">
definePageMeta({ layout: 'public' })
useHead({ title: 'Lacak Pengaduan — Pengaduan Masyarakat' })
const kode = ref('')
const result = ref<any>(null)
const err = ref('')
const loading = ref(false)
async function doLacak() {
  err.value=''; result.value=null
  if (!kode.value.trim()) { err.value='Masukkan kode pelacakan'; return }
  loading.value=true
  try { result.value = await $fetch<any>(`/api/pengaduan/kode/${kode.value.trim()}`) } catch(e:any){ err.value = e?.data?.statusMessage || 'Kode tidak ditemukan' } finally { loading.value=false }
}
</script>
<template>
  <div class="max-w-[720px] mx-auto">
    <h1 class="text-xl font-extrabold">Lacak Pengaduan</h1>
    <p class="text-sm text-muted">Masukkan kode pelacakan (contoh: LW-2026-0001) untuk melihat status laporan.</p>
    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card">
      <div class="flex gap-2">
        <input v-model="kode" placeholder="LW-2026-0001" @keydown.enter="doLacak" class="flex-1 h-11 rounded-xl border border-[#DCE8F1] px-4 text-sm outline-none focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE]" />
        <AppButton :loading="loading" @click="doLacak">Lacak</AppButton>
      </div>
      <AppAlert v-if="err" type="error" :message="err" class="mt-4" />
      <div v-if="result" class="mt-6 space-y-3">
        <div class="flex items-center justify-between"><p class="font-bold">{{ result.kode }}</p><StatusBadge :status="result.status" /></div>
        <p class="text-sm whitespace-pre-wrap">{{ result.deskripsi }}</p>
        <p class="text-xs text-muted">{{ result.lokasi }} · {{ new Date(result.dibuatPada).toLocaleString('id-ID') }}</p>
        <div v-if="result.riwayat?.length" class="pt-3 border-t border-[#E5EDF5]">
          <p class="text-sm font-semibold">Riwayat</p>
          <ul class="mt-2 space-y-2"><li v-for="r in result.riwayat" :key="r.id" class="text-xs bg-[#F8FAFF] border border-[#E5EDF5] rounded-lg px-3 py-2"><b class="capitalize">{{ r.statusBaru }}</b> — {{ r.catatan || '-' }} <span class="text-muted">({{ new Date(r.dibuatPada).toLocaleString('id-ID') }})</span></li></ul>
        </div>
      </div>
    </div>
  </div>
</template>
