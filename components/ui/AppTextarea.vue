<script setup lang="ts">
defineProps<{ label?: string; modelValue?: string; placeholder?: string; error?: string; required?: boolean; rows?: number }>()
defineEmits(['update:modelValue'])
const id = `ta-${Math.random().toString(36).slice(2,7)}`
</script>
<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="text-[13px] font-semibold text-ink">{{ label }} <span v-if="required" class="text-[#DC2626]">*</span></label>
    <textarea :id="id" :rows="rows || 4" :value="modelValue" :placeholder="placeholder" @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :class="['w-full rounded-xl border bg-white px-4 py-3 text-[14px] placeholder:text-[#9CA3AF] focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE] outline-none transition resize-none', error ? 'border-[#FCA5A5]' : 'border-[#DCE8F1]']" />
    <p v-if="error" class="text-xs text-[#DC2626]">{{ error }}</p>
  </div>
</template>
