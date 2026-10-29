import { getDb } from "../../../db";
import { pengaduan, kategori, pengguna, lampiran } from "../../../db/schema";
import { requirePengurusOrAdmin } from "../../../utils/auth";
import { eq, desc, and, sql, ilike, or, inArray } from "drizzle-orm";

// GET /api/admin/pengaduan — UC-08: pengurus/admin dashboard list with filters
// Query: ?status=&kategori=&q=&limit=&offset=
export default defineEventHandler(async (event) => {
  requirePengurusOrAdmin(event);
  const q = getQuery(event);
  const status = q.status as string | undefined;
  const kategoriId = q.kategori ? Number(q.kategori) : undefined;
  const search = (q.q as string | undefined)?.trim();
  const limit = Math.min(Number(q.limit) || 20, 100);
  const offset = Number(q.offset) || 0;

  const db = getDb();
  const conditions: any[] = [];
  if (status && ["diterima", "diproses", "selesai"].includes(status)) conditions.push(eq(pengaduan.status, status as any));
  if (kategoriId) conditions.push(eq(pengaduan.idKategori, kategoriId));
  if (search) {
    conditions.push(or(ilike(pengaduan.lokasi, `%${search}%`), ilike(pengaduan.deskripsi, `%${search}%`), ilike(pengaduan.kode, `%${search}%`)) as any);
  }

  const whereClause = conditions.length ? and(...conditions) : undefined;

  const [countRow] = whereClause
    ? await db.select({ cnt: sql<number>`count(*)::int` }).from(pengaduan).where(whereClause)
    : await db.select({ cnt: sql<number>`count(*)::int` }).from(pengaduan);
  const total = Number(countRow?.cnt ?? 0);

  const base = db
    .select({ pengaduan, kategoriNama: kategori.nama, pelaporNama: pengguna.nama })
    .from(pengaduan)
    .leftJoin(kategori, eq(pengaduan.idKategori, kategori.id))
    .leftJoin(pengguna, eq(pengaduan.idPelapor, pengguna.id));

  const rows = whereClause
    ? await base.where(whereClause).orderBy(desc(pengaduan.createdAt)).limit(limit).offset(offset)
    : await base.orderBy(desc(pengaduan.createdAt)).limit(limit).offset(offset);

  // lampiran for admin thumbnails
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

  return {
    data: rows.map(({ pengaduan: p, kategoriNama, pelaporNama }) => ({
      id: p.id,
      kode: p.kode,
      status: p.status,
      tampilPublik: p.tampilPublik,
      lokasi: p.lokasi,
      deskripsi: p.deskripsi,
      kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
      lampiran: lampBy.get(p.id) ?? [],
      pelaporNama,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })),
    total,
    limit,
    offset,
  };
});
