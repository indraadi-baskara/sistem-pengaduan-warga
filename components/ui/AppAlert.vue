<script setup lang="ts">
defineProps<{ type?: 'success'|'warning'|'error'|'info'; title?: string; message?: string }>()
const map: Record<string,string> = { success:'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]', warning:'bg-[#FEF9C3] text-[#92400E] border-[#FDE68A]', error:'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]', info:'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]' }
const dot: Record<string,string> = { success:'bg-[#16A34A]', warning:'bg-[#F59E0B]', error:'bg-[#DC2626]', info:'bg-[#1976F3]' }
</script>
<template>
  <div :class="['flex gap-3 rounded-xl border px-4 py-3', map[type||'info']]">
    <span :class="['mt-1 w-2 h-2 rounded-full shrink-0', dot[type||'info']]" aria-hidden="true" />
    <div class="min-w-0">
      <p v-if="title" class="text-sm font-semibold leading-none">{{ title }}</p>
      <p v-if="message" class="text-xs opacity-90 mt-1">{{ message }}</p>
      <div class="text-xs mt-1"><slot /></div>
    </div>
  </div>
</template>
