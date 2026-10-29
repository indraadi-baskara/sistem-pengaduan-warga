<script setup lang="ts">
defineProps<{ label?: string; modelValue?: string; placeholder?: string; type?: string; error?: string; required?: boolean; icon?: string }>()
defineEmits(['update:modelValue'])
const id = `inp-${Math.random().toString(36).slice(2,7)}`
</script>
<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="text-[13px] font-semibold text-ink">{{ label }} <span v-if="required" class="text-[#DC2626]">*</span></label>
    <div class="relative">
      <span v-if="icon" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"><Icon :name="icon" size="18" /></span>
      <input :id="id" :type="type || 'text'" :value="modelValue" :placeholder="placeholder" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="['w-full h-12 rounded-xl border bg-white px-4 text-[14px] placeholder:text-[#9CA3AF] focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE] outline-none transition', icon ? 'pl-10' : '', error ? 'border-[#FCA5A5] focus:border-[#EF4444] focus:ring-[#FEE2E2]' : 'border-[#DCE8F1]']" />
    </div>
    <p v-if="error" class="text-xs text-[#DC2626]">{{ error }}</p>
  </div>
</template>
