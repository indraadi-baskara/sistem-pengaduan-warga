<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Buat Pengaduan — Pengaduan Masyarakat' })
const kategoriList = ref<any[]>([])
const form = reactive({ judul: '', idKategori: '', deskripsi: '', lokasi: '' })
const file = ref<File|null>(null)
const submitting = ref(false)
const toast = ref<{type:'success'|'error';msg:string}|null>(null)
onMounted(async () => { try { kategoriList.value = await $fetch<any>('/api/kategori') } catch {} })
async function onSubmit() {
  if (!form.judul || !form.idKategori || !form.deskripsi || !form.lokasi) { toast.value={type:'error', msg:'Lengkapi semua field wajib'}; return }
  submitting.value = true
  try {
    let lampiran: any[]|undefined
    if (file.value) {
      const fd = new FormData(); fd.append('file', file.value)
      const up:any = await $fetch('/api/upload', { method:'POST', body: fd })
      lampiran = [{ namaFile: up.namaFile, kunciStorage: up.kunciStorage, mimeType: up.mimeType, ukuran: up.ukuran }]
    }
    const payload = { idKategori: Number(form.idKategori), lokasi: form.lokasi, deskripsi: `${form.judul}\n\n${form.deskripsi}`, tampilPublik: true, lampiran }
    const res:any = await $fetch('/api/pengaduan', { method:'POST', body: payload })
    toast.value = { type:'success', msg: `Berhasil! Kode: ${res.kode}` }
    setTimeout(()=>navigateTo('/pengaduan/riwayat'), 900)
  } catch(e:any) { toast.value={type:'error', msg: e?.data?.message || e?.data?.statusMessage || 'Gagal mengirim'} } finally { submitting.value=false; setTimeout(()=>toast.value=null, 4000) }
}
</script>
<template>
  <div>
    <h1 class="text-xl font-extrabold">Buat Pengaduan</h1>
    <p class="text-sm text-muted">Sampaikan pengaduan Anda untuk lingkungan Pendrikan Kidul yang lebih baik.</p>
    <div class="mt-4 grid lg:grid-cols-[1.6fr_340px] gap-6">
      <div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card p-6">
        <h2 class="text-[15px] font-extrabold">Form Pengaduan</h2>
        <AppAlert v-if="toast" :type="toast.type==='success' ? 'success':'error'" :title="toast.type==='success' ? 'Berhasil' : 'Gagal'" :message="toast.msg" class="mt-3" />
        <div class="mt-4 space-y-4">
          <AppInput v-model="form.judul" label="Judul Pengaduan" placeholder="Contoh : Jalan Berlubang di Jln. Bima Raya 1" required />
          <AppSelect v-model="form.idKategori" label="Kategori Pengaduan" placeholder="Pilih Kategori Pengaduan" :options="kategoriList.map((k:any)=>({value:String(k.id),label:k.nama}))" required />
          <AppInput v-model="form.lokasi" label="Lokasi Kejadian" placeholder="Jl. Bima Raya 1 No ..." required />
          <AppTextarea v-model="form.deskripsi" label="Deskripsi Pengaduan" placeholder="Jelaskan detail pengaduan anda..." required :rows="5" />
          <AppUpload v-model="file" label="Unggah Bukti" required />
          <AppButton size="lg" block :loading="submitting" @click="onSubmit"><Icon name="lucide:send" size="18" /> Kirim Pengaduan</AppButton>
        </div>
      </div>
      <div class="bg-[#D6EAF5] rounded-2xl border border-[#BFDBFE] p-5 h-fit">
        <h3 class="font-bold flex items-center gap-2 text-[#1E40AF]"><Icon name="lucide:megaphone" size="18" class="text-[#1976F3]" /> Informasi Penting</h3>
        <ol class="mt-3 space-y-2 text-sm text-[#1E40AF] list-decimal list-inside leading-relaxed">
          <li>Pastikan pengaduan sesuai dengan wilayah kelurahan Pendrikan Kidul</li>
          <li>Sertakan deskripsi yang jelas dan foto untuk bukti</li>
          <li>Pengaduan akan di proses oleh petugas dan Anda dapat memantau statusnya di menu Riwayat Pengaduan</li>
        </ol>
      </div>
    </div>
  </div>
</template>
