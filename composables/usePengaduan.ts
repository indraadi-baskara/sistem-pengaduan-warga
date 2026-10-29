export const usePengaduan = () => {
  const list = async (params: any = {}) => {
    return await $fetch<any>('/api/pengaduan', { query: params })
  }
  const track = async (kode: string) => {
    return await $fetch<any>(`/api/pengaduan/kode/${kode}`)
  }
  const detail = async (id: number) => {
    return await $fetch<any>(`/api/pengaduan/${id}`)
  }
  const create = async (payload: any) => {
    return await $fetch<any>('/api/pengaduan', { method: 'POST', body: payload })
  }
  const me = async () => {
    return await $fetch<any>('/api/pengaduan/me')
  }
  const adminList = async (params: any = {}) => {
    return await $fetch<any>('/api/admin/pengaduan', { query: params })
  }
  const updateStatus = async (id: number, status: string, catatan?: string) => {
    return await $fetch<any>(`/api/admin/pengaduan/${id}/status`, { method: 'PATCH', body: { status, catatan } })
  }
  const toggleVisibility = async (id: number, tampilPublik: boolean) => {
    return await $fetch<any>(`/api/admin/pengaduan/${id}/visibility`, { method: 'PATCH', body: { tampilPublik } })
  }
  return { list, track, detail, create, me, adminList, updateStatus, toggleVisibility }
}
