<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useHead({ title: 'Masuk — Pengaduan Masyarakat' })
const { login, loading } = useAuth()
const email = ref('')
const password = ref('')
const remember = ref(true)
const err = ref('')
async function onSubmit() {
  err.value = ''
  if (!email.value || !password.value) { err.value = 'Email dan password wajib diisi'; return }
  try { await login(email.value, password.value); await navigateTo('/dashboard') } catch (e:any) { err.value = e?.data?.message || e.message || 'Login gagal' }
}
</script>
<template>
  <div class="flex w-full">
    <!-- Left branding -->
    <div class="hidden lg:flex flex-1 flex-col items-center justify-center px-10 py-12 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-[#EAF6FF] via-[#D6EAF5] to-[#9CC6E8] opacity-60" aria-hidden="true" />
      <!-- Semarang skyline silhouette -->
      <div class="relative z-10 max-w-[420px]">
        <div class="mx-auto w-[84px] h-[84px] rounded-2xl bg-white border-4 border-[#1A2A52] grid place-items-center overflow-hidden shadow-card">
          <div class="text-center leading-none"><p class="text-[10px] font-bold tracking-widest text-[#C41E1A]">KOTA</p><p class="text-lg font-black text-[#1A2A52] -mt-1">SEMARANG</p><p class="text-[7px] text-[#1A2A52]">HEBAT</p></div>
        </div>
        <h1 class="mt-6 text-[32px] font-black leading-tight text-[#0F172A]">Pengaduan Masyarakat</h1>
        <p class="text-lg font-semibold text-[#1E293B]">Kelurahan Pendrikan Kidul</p>
        <p class="text-lg font-semibold text-[#1E293B] -mt-1">Kota Semarang</p>
        <div class="mx-auto mt-3 w-12 h-1 rounded-full bg-[#1976F3]" />
        <p class="mt-4 text-sm text-[#475569] leading-relaxed">Bersama wujudkan lingkungan<br/>Pendrikan Kidul yang lebih nyaman</p>
        <!-- houses illustration placeholder -->
        <div class="mt-8 mx-auto w-full max-w-[360px] h-[160px] rounded-2xl bg-white/60 border border-white/70 grid place-items-center">
          <div class="text-center"><Icon name="lucide:house" size="48" class="mx-auto text-[#1976F3] opacity-60" /><p class="text-xs text-muted mt-1">Ilustrasi lingkungan</p></div>
        </div>
      </div>
      <!-- city silhouettes at bottom -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#7FB6DD] to-transparent opacity-40" aria-hidden="true" />
    </div>

    <!-- Right card -->
    <div class="flex-1 lg:max-w-[480px] bg-white/0 lg:bg-transparent flex items-center justify-center p-4 md:p-8">
      <div class="w-full max-w-[420px] bg-white rounded-[20px] shadow-panel border border-white p-6 md:p-8">
        <!-- Mobile logo -->
        <div class="lg:hidden flex flex-col items-center text-center mb-6">
          <div class="w-12 h-12 rounded-xl bg-white border-2 border-[#1A2A52] grid place-items-center"><Icon name="lucide:shield" size="20" /></div>
          <p class="mt-2 text-sm font-black">Pengaduan Masyarakat</p>
          <p class="text-xs text-muted">Kelurahan Pendrikan Kidul</p>
        </div>

        <h2 class="text-2xl font-extrabold">Masuk Ke Akun</h2>
        <p class="text-xs text-muted mt-1">Silahkan Login Untuk Melanjutkan</p>

        <AppAlert v-if="err" type="error" :message="err" class="mt-4" />

        <form @submit.prevent="onSubmit" class="mt-5 space-y-3">
          <AppInput v-model="email" placeholder="Email atau NIK" icon="lucide:mail" />
          <AppInput v-model="password" type="password" placeholder="Password" icon="lucide:lock" />

          <div class="flex items-center justify-between pt-1">
            <label class="flex items-center gap-2 text-xs cursor-pointer"><input type="checkbox" v-model="remember" class="w-4 h-4 rounded border-[#DCE8F1] text-[#1976F3]" /> Ingat Saya</label>
            <NuxtLink to="#" class="text-xs text-[#1976F3] hover:underline">Lupa Password?</NuxtLink>
          </div>

          <AppButton type="submit" size="lg" block :loading="loading" class="mt-2">Login</AppButton>

          <div class="flex items-center gap-3 my-2">
            <div class="flex-1 h-px bg-[#E5EDF5]" /><span class="text-xs text-muted">atau</span><div class="flex-1 h-px bg-[#E5EDF5]" />
          </div>

          <NuxtLink to="/register" class="flex h-[46px] items-center justify-center rounded-xl border border-white shadow-sm bg-white text-[#1976F3] font-semibold text-sm hover:bg-[#EAF6FF]">Daftar Akun</NuxtLink>
          <p class="text-center text-xs text-muted">Belum punya akun? <NuxtLink to="/register" class="text-[#1976F3] font-semibold">Daftar disini</NuxtLink></p>
        </form>
      </div>
    </div>
  </div>
</template>
