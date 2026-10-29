<script setup>
useHead({
  htmlAttrs: { lang: "id-ID" },
  titleTemplate: (t) => (t ? `${t} — Lapor Warga` : 'Lapor Warga — Pengaduan Masyarakat Pendrikan Kidul'),
  meta: [
    { name: "description", content: "Sistem Pengaduan Masyarakat Kelurahan Pendrikan Kidul, Kota Semarang — sampaikan aspirasi Anda." },
    { name: "theme-color", content: "#1976F3" },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  bodyAttrs: { class: 'font-display' },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
