<script setup lang="ts">
definePageMeta({ layout: 'public' })
useHead({ title: 'FAQ — Pengaduan Masyarakat' })
const faqs = [
  { q: 'Apakah harus buat akun?', a: 'Ya, untuk melacak dan mendapat update status. Form publik di beranda juga memerlukan login.' },
  { q: 'Format lampiran apa yang didukung?', a: 'JPG, PNG, WebP, PDF maksimal 5 MB.' },
  { q: 'Berapa lama ditanggapi?', a: 'Maksimal 3 hari kerja untuk verifikasi awal.' },
  { q: 'Bagaimana cara lacak?', a: 'Gunakan kode LW-YYYY-XXXX di halaman Lacak atau menu Riwayat.' },
]
</script>
<template>
  <div class="max-w-[800px]">
    <h1 class="text-xl font-extrabold">FAQ</h1>
    <div class="mt-4 space-y-3">
      <details v-for="f in faqs" :key="f.q" class="bg-white rounded-2xl border border-[#DCE8F1] p-4 shadow-card open:bg-[#F8FAFF]">
        <summary class="font-semibold cursor-pointer list-none flex items-center justify-between">{{ f.q }} <Icon name="lucide:chevron-down" size="16" class="text-muted" /></summary>
        <p class="text-sm text-muted mt-2">{{ f.a }}</p>
      </details>
    </div>
  </div>
</template>
