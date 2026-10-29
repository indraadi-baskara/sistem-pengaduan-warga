<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'admin' })
useHead({ title: 'Kelola User — Admin' })
const users = ref<any[]>([])
const loading = ref(true)
const form = reactive({ nama:'', email:'', password:'', peran:'pelapor' })
const err = ref(''); const ok = ref('')
async function load(){ loading.value=true; try{ users.value = await $fetch<any>('/api/admin/users') }catch{} finally{loading.value=false} }
onMounted(load)
async function create(){
  err.value=''; ok.value=''
  if (!form.nama || !form.email || !form.password) { err.value='Lengkapi form'; return }
  try { await $fetch('/api/admin/users', { method:'POST', body:{ ...form } }); ok.value='User dibuat'; form.nama=''; form.email=''; form.password=''; await load() } catch(e:any){ err.value=e?.data?.statusMessage||'Gagal' }
}
async function toggle(id:number, aktif:boolean){
  await $fetch(`/api/admin/users/${id}/deactivate`, { method:'PATCH', body:{ aktif: !aktif } }); await load()
}
</script>
<template>
  <div>
    <NuxtLink to="/admin" class="text-sm text-[#1976F3]">← Kembali ke Kelola Pengaduan</NuxtLink>
    <h1 class="text-xl font-extrabold mt-2">Kelola User</h1>
    <div class="mt-4 grid lg:grid-cols-[380px_1fr] gap-4">
      <div class="bg-white rounded-2xl border border-[#DCE8F1] p-5 shadow-card h-fit">
        <h2 class="font-bold">Tambah User</h2>
        <AppAlert v-if="err" type="error" :message="err" class="mt-3" />
        <AppAlert v-if="ok" type="success" :message="ok" class="mt-3" />
        <div class="mt-3 space-y-3">
          <AppInput v-model="form.nama" label="Nama" placeholder="Nama lengkap" />
          <AppInput v-model="form.email" label="Email" placeholder="email@..." />
          <AppInput v-model="form.password" label="Password" type="password" placeholder="Min 8 karakter" />
          <AppSelect v-model="form.peran" label="Peran" :options="[{value:'pelapor',label:'Pelapor'},{value:'pengurus',label:'Pengurus'},{value:'admin',label:'Admin'}]" />
          <AppButton block @click="create">Buat User</AppButton>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-[#DCE8F1] shadow-card overflow-hidden">
        <div v-if="loading" class="p-8 text-center text-sm text-muted">Memuat...</div>
        <div v-else class="divide-y divide-[#E5EDF5]">
          <div v-for="u in users" :key="u.id" class="p-4 flex items-center justify-between gap-3">
            <div><p class="text-sm font-bold">{{ u.nama }} <span class="px-2 py-0.5 rounded-full bg-[#EAF6FF] text-xs capitalize ml-1">{{ u.peran }}</span></p><p class="text-xs text-muted">{{ u.email }}</p></div>
            <button @click="toggle(u.id, u.aktif)" :class="['h-8 px-3 rounded-full text-xs font-semibold border', u.aktif ? 'bg-white border-[#DCE8F1]' : 'bg-[#FEE2E2] border-[#FECACA] text-[#991B1B]']">{{ u.aktif ? 'Aktif' : 'Nonaktif' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
