<script setup lang="ts">
const props = defineProps<{ label?: string; required?: boolean; modelValue?: File | null }>()
const emit = defineEmits(['update:modelValue'])
const dragging = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
function onDrop(e: DragEvent) {
  dragging.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) emit('update:modelValue', f)
}
function onPick(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (f) emit('update:modelValue', f)
}
</script>
<template>
  <div class="space-y-1.5">
    <label v-if="label" class="text-[13px] font-semibold text-ink">{{ label }} <span v-if="required" class="text-[#DC2626]">*</span></label>
    <div @dragover.prevent="dragging=true" @dragleave="dragging=false" @drop.prevent="onDrop"
      @click="inputRef?.click()"
      :class="['flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed bg-white px-6 py-8 text-center cursor-pointer transition', dragging ? 'border-[#1976F3] bg-[#EAF6FF]' : 'border-[#BFDBFE] hover:bg-[#F8FAFF]']">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-[#EAF6FF] flex items-center justify-center text-[#1976F3]"><Icon name="lucide:download" size="20" /></div>
        <div class="text-left">
          <p class="text-sm font-semibold text-[#1976F3]">Klik untuk mengunggah foto</p>
          <p class="text-xs text-muted">atau drag & drop file di sini</p>
          <p class="text-[11px] text-[#9CA3AF]">(JPG, PNG, maksimal 5 MB)</p>
        </div>
      </div>
      <p v-if="modelValue" class="text-xs font-medium text-ink mt-1">Terpilih: {{ modelValue.name }} ({{ (modelValue.size/1024).toFixed(0) }} KB)</p>
    </div>
    <input ref="inputRef" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" class="hidden" @change="onPick" />
  </div>
</template>
