<script setup lang="ts">
const route = useRoute()
const items = [
  { label: 'Beranda', to: '/dashboard', icon: 'lucide:house' },
  { label: 'Buat Pengaduan', to: '/pengaduan/create', icon: 'lucide:square-pen' },
  { label: 'Riwayat Pengaduan', to: '/pengaduan/riwayat', icon: 'lucide:file-text' },
  { label: 'Informasi', to: '/informasi', icon: 'lucide:info' },
  { label: 'Profil', to: '/profil', icon: 'lucide:user' },
  { label: 'FAQ', to: '/faq', icon: 'lucide:help-circle' },
]
const { logout } = useAuth()
</script>
<template>
  <aside class="w-full lg:w-[240px] shrink-0">
    <nav class="bg-white rounded-2xl border border-[#DCE8F1] p-2 space-y-1">
      <NuxtLink v-for="it in items" :key="it.to" :to="it.to" :class="['flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition', route.path===it.to ? 'bg-[#EAF6FF] text-[#1976F3] font-semibold' : 'text-ink hover:bg-[#F1F6FB]']">
        <Icon :name="it.icon" size="18" /> {{ it.label }}
      </NuxtLink>
      <div class="pt-2 mt-2 border-t border-[#E5EDF5]">
        <button @click="logout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink hover:bg-[#FEE2E2] hover:text-[#991B1B]"><Icon name="lucide:log-out" size="18" /> Keluar</button>
      </div>
    </nav>
    <div class="hidden lg:block mt-3 rounded-2xl overflow-hidden border border-[#DCE8F1] bg-white">
      <div class="h-40 bg-gradient-to-b from-[#EAF6FF] to-[#D6EAF5] grid place-items-center text-[#9CA3AF] text-xs">Ilustrasi Kota</div>
    </div>
  </aside>
</template>
