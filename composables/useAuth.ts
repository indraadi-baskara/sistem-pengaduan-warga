export const useAuth = () => {
  const user = useState<any>('auth:user', () => null)
  const loading = ref(false)

  const fetchMe = async () => {
    try {
      const res: any = await $fetch('/api/me')
      user.value = res.user
      return res.user
    } catch { user.value = null; return null }
  }
  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const res: any = await $fetch('/api/auth/login', { method: 'POST', body: { email, password } })
      user.value = res.user
      return res.user
    } finally { loading.value = false }
  }
  const register = async (payload: { nama: string; email: string; password: string }) => {
    loading.value = true
    try {
      const res: any = await $fetch('/api/auth/register', { method: 'POST', body: payload })
      user.value = res.user
      return res.user
    } finally { loading.value = false }
  }
  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/login')
  }
  const isAdmin = computed(() => user.value?.peran === 'admin')
  const isPengurus = computed(() => user.value?.peran === 'pengurus' || isAdmin.value)
  const isLoggedIn = computed(() => !!user.value)

  return { user, loading, isAdmin, isPengurus, isLoggedIn, fetchMe, login, register, logout }
}
