import { getDb } from "../../db";
import { pengaduan, kategori, lampiran } from "../../db/schema";
import { eq, desc, and, sql, ilike, or, inArray } from "drizzle-orm";
import { loadVisibilityMap, filterPublicProps } from "../../utils/visibility";

// GET /api/pengaduan — public list (UC-01)
// Query: ?status=diterima&kategori=3&q=jalan&limit=20&offset=0
// Respects tampilPublik (hidden items excluded) + pengaturan_publik visMap.
export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const status = q.status as string | undefined;
  const kategoriId = q.kategori ? Number(q.kategori) : undefined;
  const search = (q.q as string | undefined)?.trim();
  const limit = Math.min(Number(q.limit) || 20, 100);
  const offset = Number(q.offset) || 0;

  const db = getDb();
  const visMap = await loadVisibilityMap();

  // Base: only tampilPublik=true for public
  const conditions: any[] = [eq(pengaduan.tampilPublik, true)];
  if (status && ["diterima", "diproses", "selesai"].includes(status)) conditions.push(eq(pengaduan.status, status as any));
  if (kategoriId) conditions.push(eq(pengaduan.idKategori, kategoriId));
  if (search) {
    // Search lokasi/deskripsi/kode (ILIKE, pg); fallback to LIKE for http driver is fine
    conditions.push(or(ilike(pengaduan.lokasi, `%${search}%`), ilike(pengaduan.deskripsi, `%${search}%`), ilike(pengaduan.kode, `%${search}%`)) as any);
  }

  const whereClause = and(...conditions);

  const [countRow] = await db.select({ cnt: sql<number>`count(*)::int` }).from(pengaduan).where(whereClause);
  const total = Number(countRow?.cnt ?? 0);

  const rows = await db
    .select({
      pengaduan,
      kategoriNama: kategori.nama,
    })
    .from(pengaduan)
    .leftJoin(kategori, eq(pengaduan.idKategori, kategori.id))
    .where(whereClause)
    .orderBy(desc(pengaduan.createdAt))
    .limit(limit)
    .offset(offset);

  // Lampiran for thumbnails (one query for all ids)
  let lampByPengaduan = new Map<number, any[]>();
  if (visMap.get("lampiran") !== false && rows.length) {
    const ids = rows.map((r) => r.pengaduan.id);
    const lamps = await db.select().from(lampiran).where(inArray(lampiran.idPengaduan, ids));
    for (const l of lamps) {
      const arr = lampByPengaduan.get(l.idPengaduan) || [];
      arr.push(l);
      lampByPengaduan.set(l.idPengaduan, arr);
    }
  }

  const mapped = rows.map(({ pengaduan: p, kategoriNama }) => {
    const obj: any = {
      id: p.id,
      kode: p.kode,
      status: p.status,
      createdAt: p.createdAt,
      kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
      lokasi: p.lokasi,
      deskripsi: p.deskripsi,
      lampiran: lampByPengaduan.get(p.id) ?? [],
    };
    return filterPublicProps(obj, visMap, false);
  });

  return { data: mapped, total, limit, offset };
});
