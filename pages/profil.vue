<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
const { user, fetchMe } = useAuth()
onMounted(fetchMe)
</script>
<template>
  <div>
    <h1 class="text-xl font-extrabold">Profil</h1>
    <div class="mt-4 bg-white rounded-2xl border border-[#DCE8F1] p-6 shadow-card max-w-[520px]">
      <div v-if="!user" class="text-sm text-muted">Memuat...</div>
      <div v-else class="space-y-3 text-sm">
        <div><p class="text-xs text-muted">Nama</p><p class="font-semibold">{{ user.nama }}</p></div>
        <div><p class="text-xs text-muted">Email</p><p class="font-semibold">{{ user.email }}</p></div>
        <div><p class="text-xs text-muted">Peran</p><p class="font-semibold capitalize">{{ user.peran }}</p></div>
        <div><p class="text-xs text-muted">Sejak</p><p class="font-semibold">{{ user.dibuatPada ? new Date(user.dibuatPada).toLocaleDateString('id-ID') : '-' }}</p></div>
      </div>
    </div>
  </div>
</template>
