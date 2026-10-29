<script setup lang="ts">
defineProps<{ item: any }>()
</script>
<template>
  <div class="flex items-center justify-between gap-3 py-3 border-b border-[#E5EDF5] last:border-0">
    <div class="flex gap-3 min-w-0">
      <div class="w-12 h-12 rounded-lg bg-[#EAF6FF] overflow-hidden shrink-0 grid place-items-center">
        <img v-if="item.image" :src="item.image" class="w-full h-full object-cover" alt="" />
        <Icon v-else name="lucide:image" size="18" class="text-muted" />
      </div>
      <div class="min-w-0">
        <p class="text-sm font-semibold truncate">{{ item.title || item.kode || item.deskripsi }}</p>
        <p class="text-xs text-muted flex items-center gap-1"><Icon name="lucide:map-pin" size="12" />{{ item.lokasi || item.kategori?.nama || '-' }}</p>
      </div>
    </div>
    <StatusBadge :status="(item.status||'diterima').toLowerCase()" />
  </div>
</template>
