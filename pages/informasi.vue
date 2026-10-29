<script setup lang="ts">
definePageMeta({ layout: 'public' })
useHead({ title: 'Informasi — Pengaduan Masyarakat' })
</script>
<template>
  <div class="max-w-[800px]">
    <h1 class="text-xl font-extrabold">Informasi</h1>
    <p class="text-sm text-muted mt-1">Alur dan ketentuan layanan pengaduan Kelurahan Pendrikan Kidul.</p>
    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card space-y-4 text-sm leading-relaxed">
      <h2 class="font-bold">Alur Pengaduan</h2>
      <ol class="list-decimal list-inside space-y-1 text-muted">
        <li>Warga membuat akun dan mengisi form pengaduan dengan bukti foto.</li>
        <li>Pengurus verifikasi dan mengubah status menjadi <b class="text-ink">Diproses</b>.</li>
        <li>Setelah ditindaklanjuti, status diupdate menjadi <b class="text-ink">Selesai</b> dengan catatan.</li>
        <li>Warga dapat melacak via kode atau menu Riwayat.</li>
      </ol>
      <h2 class="font-bold">Kontak</h2>
      <p class="text-muted">Jl. Bima Raya 1, Pendrikan Kidul, Semarang Tengah · Jam layanan 08:00–15:00 WIB</p>
    </div>
  </div>
</template>
