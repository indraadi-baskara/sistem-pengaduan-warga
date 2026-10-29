<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'admin' })
useHead({ title: 'Pengaturan Publik — Admin' })
const settings = ref<any>({})
const saving = ref(false); const msg = ref('')
async function load(){ settings.value = await $fetch<any>('/api/admin/pengaturan-publik') }
onMounted(load)
async function save(){
  saving.value=true; msg.value=''
  try { await $fetch('/api/admin/pengaturan-publik', { method:'PUT', body: settings.value }); msg.value='Tersimpan' } catch(e:any){ msg.value='Gagal menyimpan' } finally{ saving.value=false; setTimeout(()=>msg.value='', 3000) }
}
const fields = ['tampilKategori','tampilLokasi','tampilDeskripsi','tampilLampiran','tampilRiwayat'] as const
const labels: Record<string,string> = { tampilKategori:'Kategori', tampilLokasi:'Lokasi', tampilDeskripsi:'Deskripsi', tampilLampiran:'Lampiran', tampilRiwayat:'Riwayat Status' }
</script>
<template>
  <div>
    <NuxtLink to="/admin" class="text-sm text-[#1976F3]">← Kembali</NuxtLink>
    <h1 class="text-xl font-extrabold mt-2">Pengaturan Tampil Publik</h1>
    <p class="text-sm text-muted">Atur field apa yang terlihat di daftar/detail publik.</p>
    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card max-w-[600px]">
      <div class="space-y-3">
        <label v-for="f in fields" :key="f" class="flex items-center justify-between p-3 rounded-xl border border-[#E5EDF5] bg-[#F8FAFF]">
          <span class="text-sm font-semibold">{{ labels[f] }}</span>
          <input type="checkbox" v-model="settings[f]" class="w-5 h-5 rounded border-[#DCE8F1] text-[#1976F3]" />
        </label>
      </div>
      <AppButton class="mt-4" :loading="saving" @click="save">Simpan</AppButton>
      <span v-if="msg" class="ml-3 text-sm text-muted">{{ msg }}</span>
    </div>
  </div>
</template>
