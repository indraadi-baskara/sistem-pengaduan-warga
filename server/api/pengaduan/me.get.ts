import { getDb } from "../../db";
import { pengaduan, kategori, lampiran } from "../../db/schema";
import { requireAuth } from "../../utils/auth";
import { eq, desc, inArray } from "drizzle-orm";

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

  // Attach lampiran for thumbnails
  let lampBy = new Map<number, any[]>();
  if (rows.length) {
    const ids = rows.map((r) => r.pengaduan.id);
    const lamps = await db.select().from(lampiran).where(inArray(lampiran.idPengaduan, ids));
    for (const l of lamps) {
      const arr = lampBy.get(l.idPengaduan) || [];
      arr.push(l);
      lampBy.set(l.idPengaduan, arr);
    }
  }

  return rows.map(({ pengaduan: p, kategoriNama }) => ({
    id: p.id,
    kode: p.kode,
    status: p.status,
    tampilPublik: p.tampilPublik,
    lokasi: p.lokasi,
    deskripsi: p.deskripsi,
    kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
    lampiran: lampBy.get(p.id) ?? [],
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));
});
