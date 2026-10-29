<script setup lang="ts">
const props = defineProps<{ status: string }>()
const map: Record<string, { label: string; cls: string }> = {
  selesai: { label: 'Selesai', cls: 'bg-[#DCFCE7] text-[#166534]' },
  diproses: { label: 'Dalam Proses', cls: 'bg-[#FEF9C3] text-[#92400E]' },
  diterima: { label: 'Diterima', cls: 'bg-[#DBEAFE] text-[#1E40AF]' },
  ditolak: { label: 'Ditolak', cls: 'bg-[#FEE2E2] text-[#991B1B]' },
}
const conf = computed(() => map[props.status] ?? { label: props.status, cls: 'bg-gray-100 text-gray-600' })
</script>
<template>
  <span :class="['inline-flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-semibold leading-none whitespace-nowrap', conf.cls]">
    {{ conf.label }}
  </span>
</template>
