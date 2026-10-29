<script setup lang="ts">
const props = withDefaults(defineProps<{ variant?: 'primary'|'secondary'|'outline'|'ghost'; size?: 'sm'|'md'|'lg'; block?: boolean; loading?: boolean; disabled?: boolean }>(), { variant: 'primary', size: 'md' })
const cls = computed(() => {
  const v: Record<string,string> = {
    primary: 'bg-[#1976F3] text-white hover:bg-[#0B63CE] shadow-sm border border-transparent',
    secondary: 'bg-white text-[#1976F3] border border-[#DCE8F1] hover:bg-[#EAF6FF]',
    outline: 'bg-transparent text-ink border border-[#DCE8F1] hover:bg-white',
    ghost: 'bg-transparent text-muted hover:text-ink',
  }
  const s: Record<string,string> = {
    sm: 'h-9 px-4 text-sm rounded-full',
    md: 'h-[42px] px-5 text-sm font-semibold rounded-xl',
    lg: 'h-[52px] px-6 text-[15px] font-semibold rounded-xl',
  }
  return [v[props.variant], s[props.size], props.block ? 'w-full' : ''].join(' ')
})
</script>
<template>
  <button :disabled="disabled || loading" :class="['inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed', cls]">
    <span v-if="loading" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
    <slot />
  </button>
</template>
