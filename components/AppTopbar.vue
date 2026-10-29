<script setup lang="ts">
const { user, logout } = useAuth()
const menuOpen = ref(false)
</script>
<template>
  <header class="sticky top-0 z-40 bg-white border-b border-[#DCE8F1]">
    <div class="mx-auto max-w-[1440px] flex items-center justify-between gap-4 px-4 md:px-6 h-[64px]">
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-[#1A2A52] text-white grid place-items-center text-[9px] font-black leading-none text-center">KOTA<br/>SMG</span>
          <div class="leading-tight hidden sm:block">
            <p class="text-[15px] font-extrabold tracking-tight text-ink">Pengaduan Masyarakat</p>
            <p class="text-[11px] text-muted -mt-0.5">Kelurahan Pendrikan Kidul</p>
          </div>
          <div class="sm:hidden"><p class="text-sm font-extrabold">Pengaduan</p></div>
        </NuxtLink>
        <button class="hidden lg:flex ml-2 w-8 h-8 items-center justify-center rounded-lg hover:bg-[#EAF6FF] text-muted" aria-label="Menu"><Icon name="lucide:menu" size="18" /></button>
      </div>
      <nav class="hidden md:flex items-center gap-5 text-sm">
        <NuxtLink to="/" class="font-semibold text-[#1976F3]">Beranda</NuxtLink>
        <NuxtLink to="/informasi" class="text-muted hover:text-ink">Informasi</NuxtLink>
        <NuxtLink to="/faq" class="text-muted hover:text-ink">FAQ</NuxtLink>
      </nav>
      <div class="flex items-center gap-2">
        <template v-if="user">
          <button class="relative w-9 h-9 grid place-items-center rounded-full hover:bg-[#EAF6FF] text-ink" aria-label="Notifikasi"><Icon name="lucide:bell" size="20" /><span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /></button>
          <div class="relative">
            <button @click="menuOpen=!menuOpen" class="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-[#F1F6FB]">
              <span class="w-8 h-8 rounded-full bg-[#1976F3] text-white grid place-items-center text-sm font-bold">{{ (user.nama||user.email||'U').slice(0,1).toUpperCase() }}</span>
              <span class="hidden sm:block text-left leading-tight">
                <p class="text-sm font-bold">{{ user.nama }}</p>
                <p class="text-[11px] text-muted capitalize">{{ user.peran }}</p>
              </span>
              <Icon name="lucide:chevron-down" size="14" class="text-muted" />
            </button>
            <div v-if="menuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[#DCE8F1] shadow-panel p-1">
              <NuxtLink to="/dashboard" class="flex px-3 py-2 rounded-lg hover:bg-[#EAF6FF] text-sm">Dashboard</NuxtLink>
              <NuxtLink to="/profil" class="flex px-3 py-2 rounded-lg hover:bg-[#EAF6FF] text-sm">Profil</NuxtLink>
              <button @click="logout" class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FEE2E2] text-sm text-[#991B1B]">Keluar</button>
            </div>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="hidden sm:inline-flex h-9 px-4 items-center rounded-full border border-[#DCE8F1] text-sm font-semibold hover:bg-white">Masuk</NuxtLink>
          <NuxtLink to="/register" class="inline-flex h-9 px-5 items-center rounded-full bg-[#1976F3] text-white text-sm font-semibold hover:bg-[#0B63CE]">Daftar</NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>
