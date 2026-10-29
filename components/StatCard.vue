<script setup lang="ts">
defineProps<{ label: string; value: number|string; tone?: 'blue'|'yellow'|'green'|'red'; icon?: string }>()
const toneMap: Record<string,string> = { blue:'bg-[#EAF6FF] text-[#1976F3]', yellow:'bg-[#FEF9C3] text-[#B45309]', green:'bg-[#DCFCE7] text-[#16A34A]', red:'bg-[#FEE2E2] text-[#EF4444]' }
</script>
<template>
  <div class="bg-white rounded-2xl border border-[#DCE8F1] p-4">
    <div class="flex items-center justify-between">
      <div :class="['w-10 h-10 rounded-lg grid place-items-center', toneMap[tone||'blue']]"><Icon :name="icon||'lucide:file-text'" size="20" /></div>
      <span class="text-[28px] font-extrabold leading-none">{{ value }}</span>
    </div>
    <p class="mt-3 text-sm text-muted">{{ label }}</p>
    <NuxtLink to="/pengaduan/riwayat" class="mt-2 inline-flex w-6 h-6 items-center justify-center rounded-full bg-[#EAF6FF] text-[#1976F3] text-xs">›</NuxtLink>
  </div>
</template>
