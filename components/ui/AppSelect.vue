<script setup lang="ts">
defineProps<{ label?: string; modelValue?: string|number; placeholder?: string; error?: string; required?: boolean; options: Array<{value:any;label:string}> }>()
defineEmits(['update:modelValue'])
const id = `sel-${Math.random().toString(36).slice(2,7)}`
</script>
<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="text-[13px] font-semibold text-ink">{{ label }} <span v-if="required" class="text-[#DC2626]">*</span></label>
    <div class="relative">
      <select :id="id" :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :class="['w-full h-12 rounded-xl border bg-white px-4 pr-9 text-[14px] focus:border-[#1976F3] focus:ring-4 focus:ring-[#DBEAFE] outline-none transition appearance-none', error ? 'border-[#FCA5A5]' : 'border-[#DCE8F1]']">
        <option value="" disabled>{{ placeholder || 'Pilih' }}</option>
        <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
      <Icon name="lucide:chevron-down" class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" size="18" />
    </div>
    <p v-if="error" class="text-xs text-[#DC2626]">{{ error }}</p>
  </div>
</template>
