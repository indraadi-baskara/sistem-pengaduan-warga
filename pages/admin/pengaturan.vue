<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'admin' })
useHead({ title: 'Pengaturan Publik — Admin' })

type Row = { namaProperti: string; tampilPublik: boolean }

const rows = ref<Row[]>([])
const saving = ref<string | null>(null)
const msg = ref('')
const err = ref('')

const labels: Record<string, string> = {
  kategori: 'Kategori',
  lokasi: 'Lokasi',
  deskripsi: 'Deskripsi',
  lampiran: 'Lampiran',
  riwayat: 'Riwayat Status',
}

async function load() {
  try {
    const res: any = await $fetch('/api/admin/pengaturan-publik')
    rows.value = Array.isArray(res) ? res : (res.data ?? [])
  } catch (e: any) {
    err.value = e?.data?.message || 'Gagal memuat pengaturan'
  }
}

async function toggle(row: Row) {
  const next = !row.tampilPublik
  saving.value = row.namaProperti
  msg.value = ''
  try {
    const updated: Row = await $fetch('/api/admin/pengaturan-publik', {
      method: 'PUT',
      body: { namaProperti: row.namaProperti, tampilPublik: next },
    })
    row.tampilPublik = updated.tampilPublik
    msg.value = `${labels[row.namaProperti] ?? row.namaProperti} ${next ? 'ditampilkan' : 'disembunyikan'}`
    setTimeout(() => (msg.value = ''), 2000)
  } catch (e: any) {
    err.value = e?.data?.message || 'Gagal menyimpan'
    setTimeout(() => (err.value = ''), 3000)
  } finally {
    saving.value = null
  }
}

onMounted(load)
</script>
<template>
  <div>
    <NuxtLink to="/admin" class="text-sm text-[#1976F3]">← Kembali</NuxtLink>
    <h1 class="text-xl font-extrabold mt-2">Pengaturan Tampil Publik</h1>
    <p class="text-sm text-muted">Atur field apa yang terlihat di daftar/detail publik. Perubahan langsung aktif tanpa deploy (FR-07).</p>
    <AppAlert v-if="err" type="error" :message="err" class="mt-4" />
    <AppAlert v-if="msg" type="success" :message="msg" class="mt-4" />
    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card max-w-[600px]">
      <p v-if="!rows.length" class="text-sm text-muted">Memuat...</p>
      <div v-else class="space-y-3">
        <label
          v-for="row in rows"
          :key="row.namaProperti"
          class="flex items-center justify-between p-3 rounded-xl border border-[#E5EDF5] bg-[#F8FAFF]"
        >
          <span class="text-sm font-semibold">{{ labels[row.namaProperti] ?? row.namaProperti }}</span>
          <span class="flex items-center gap-2">
            <span class="text-xs text-muted">{{ row.tampilPublik ? 'Tampil' : 'Hidden' }}</span>
            <input
              type="checkbox"
              :checked="row.tampilPublik"
              :disabled="saving === row.namaProperti"
              @change="toggle(row)"
              class="w-5 h-5 rounded border-[#DCE8F1] text-[#1976F3] disabled:opacity-50"
            />
          </span>
        </label>
      </div>
      <p class="mt-4 text-xs text-muted">`kode` dan `status` selalu tampil dan tidak dapat disembunyikan. Identitas pelapor tidak pernah diekspos.</p>
    </div>
  </div>
</template>
