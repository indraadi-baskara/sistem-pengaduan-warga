<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useHead({ title: 'Daftar — Pengaduan Masyarakat' })
const { register, loading } = useAuth()
const form = reactive({ email: '', nama: '', phone: '', password: '', confirm: '' })
const err = ref('')
async function onSubmit() {
  err.value = ''
  if (!form.email || !form.nama || !form.password) { err.value = 'Lengkapi semua field wajib'; return }
  if (form.password !== form.confirm) { err.value = 'Konfirmasi password tidak cocok'; return }
  if (form.password.length < 8) { err.value = 'Password minimal 8 karakter'; return }
  try { await register({ nama: form.nama, email: form.email, password: form.password }); await navigateTo('/dashboard') } catch (e:any) { err.value = e?.data?.message || e.message || 'Daftar gagal' }
}
</script>
<template>
  <div class="flex w-full">
    <div class="hidden lg:flex flex-1 flex-col items-center justify-center px-10 py-12 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-[#EAF6FF] via-[#D6EAF5] to-[#9CC6E8] opacity-60" aria-hidden="true" />
      <div class="relative z-10 max-w-[420px]">
        <div class="mx-auto w-[84px] h-[84px] rounded-2xl bg-white border-4 border-[#1A2A52] grid place-items-center shadow-card">
          <div class="text-center leading-none"><p class="text-[10px] font-bold tracking-widest text-[#C41E1A]">KOTA</p><p class="text-lg font-black text-[#1A2A52] -mt-1">SEMARANG</p><p class="text-[7px] text-[#1A2A52]">HEBAT</p></div>
        </div>
        <h1 class="mt-6 text-[32px] font-black leading-tight text-[#0F172A]">Pengaduan Masyarakat</h1>
        <p class="text-lg font-semibold text-[#1E293B]">Kelurahan Pendrikan Kidul</p>
        <p class="text-lg font-semibold text-[#1E293B] -mt-1">Kota Semarang</p>
        <div class="mx-auto mt-3 w-12 h-1 rounded-full bg-[#1976F3]" />
        <p class="mt-4 text-sm text-[#475569] leading-relaxed">Bersama wujudkan lingkungan<br/>Pendrikan Kidul yang lebih nyaman</p>
        <div class="mt-8 mx-auto w-full max-w-[360px] h-[160px] rounded-2xl bg-white/60 border border-white/70 grid place-items-center">
          <div class="text-center"><Icon name="lucide:house" size="48" class="mx-auto text-[#1976F3] opacity-60" /><p class="text-xs text-muted mt-1">Ilustrasi lingkungan</p></div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#7FB6DD] to-transparent opacity-40" aria-hidden="true" />
    </div>

    <div class="flex-1 lg:max-w-[480px] flex items-center justify-center p-4 md:p-8">
      <div class="w-full max-w-[420px] bg-white rounded-[20px] shadow-panel border border-white p-6 md:p-8">
        <div class="lg:hidden flex flex-col items-center text-center mb-6">
          <div class="w-12 h-12 rounded-xl bg-white border-2 border-[#1A2A52] grid place-items-center"><Icon name="lucide:shield" size="20" /></div>
          <p class="mt-2 text-sm font-black">Pengaduan Masyarakat</p>
          <p class="text-xs text-muted">Kelurahan Pendrikan Kidul</p>
        </div>
        <h2 class="text-2xl font-extrabold">Daftar Akun</h2>
        <p class="text-xs text-muted mt-1">Silahkan Daftar untuk membuat Akun</p>
        <AppAlert v-if="err" type="error" :message="err" class="mt-4" />
        <form @submit.prevent="onSubmit" class="mt-5 space-y-3">
          <AppInput v-model="form.email" placeholder="Email atau NIK" icon="lucide:mail" />
          <AppInput v-model="form.nama" placeholder="Nama Lengkap" icon="lucide:user" />
          <AppInput v-model="form.phone" placeholder="Nomor HP" icon="lucide:smartphone" />
          <AppInput v-model="form.password" type="password" placeholder="Password" icon="lucide:lock" />
          <AppInput v-model="form.confirm" type="password" placeholder="Konfirmasi Ulang Password" icon="lucide:lock" />
          <AppButton type="submit" size="lg" block :loading="loading" class="mt-2">Daftar</AppButton>
          <p class="text-center text-xs text-muted">Sudah punya akun? <NuxtLink to="/login" class="text-[#1976F3] font-semibold">Masuk disini</NuxtLink></p>
        </form>
      </div>
    </div>
  </div>
</template>
