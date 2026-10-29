import { getDb } from "../../db";
import { pengaduan, kategori, riwayatStatus } from "../../db/schema";
import { requireAuth } from "../../utils/auth";
import { eq, desc } from "drizzle-orm";

// GET /api/pengaduan/me — UC-07: pelapor sees own complaints (including hidden ones)
export default defineEventHandler(async (event) => {
  const user = requireAuth(event);
  const db = getDb();
  const rows = await db
    .select({ pengaduan, kategoriNama: kategori.nama })
    .from(pengaduan)
    .leftJoin(kategori, eq(pengaduan.idKategori, kategori.id))
    .where(eq(pengaduan.idPelapor, user.id))
    .orderBy(desc(pengaduan.createdAt));

  return rows.map(({ pengaduan: p, kategoriNama }) => ({
    id: p.id,
    kode: p.kode,
    status: p.status,
    tampilPublik: p.tampilPublik,
    lokasi: p.lokasi,
    deskripsi: p.deskripsi,
    kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));
});
