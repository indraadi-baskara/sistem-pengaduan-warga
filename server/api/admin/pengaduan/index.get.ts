import { getDb } from "../../../db";
import { pengaduan, kategori, pengguna } from "../../../db/schema";
import { requirePengurusOrAdmin } from "../../../utils/auth";
import { eq, desc, and } from "drizzle-orm";

// GET /api/admin/pengaduan — UC-08: pengurus/admin dashboard list with filters
// Query: ?status=&kategori=&limit=&offset=
export default defineEventHandler(async (event) => {
  requirePengurusOrAdmin(event);
  const q = getQuery(event);
  const status = q.status as string | undefined;
  const kategoriId = q.kategori ? Number(q.kategori) : undefined;
  const limit = Math.min(Number(q.limit) || 20, 100);
  const offset = Number(q.offset) || 0;

  const db = getDb();
  const conditions: any[] = [];
  if (status && ["diterima", "diproses", "selesai"].includes(status)) conditions.push(eq(pengaduan.status, status as any));
  if (kategoriId) conditions.push(eq(pengaduan.idKategori, kategoriId));

  const base = db
    .select({ pengaduan, kategoriNama: kategori.nama, pelaporNama: pengguna.nama })
    .from(pengaduan)
    .leftJoin(kategori, eq(pengaduan.idKategori, kategori.id))
    .leftJoin(pengguna, eq(pengaduan.idPelapor, pengguna.id));

  const rows = conditions.length
    ? await base.where(and(...conditions)).orderBy(desc(pengaduan.createdAt)).limit(limit).offset(offset)
    : await base.orderBy(desc(pengaduan.createdAt)).limit(limit).offset(offset);

  return {
    data: rows.map(({ pengaduan: p, kategoriNama, pelaporNama }) => ({
      id: p.id,
      kode: p.kode,
      status: p.status,
      tampilPublik: p.tampilPublik,
      lokasi: p.lokasi,
      deskripsi: p.deskripsi,
      kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
      pelaporNama, // admin sees reporter name internally (never exposed on public routes)
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })),
    limit,
    offset,
  };
});
