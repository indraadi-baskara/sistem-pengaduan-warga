import { getDb } from "../../db";
import { pengaduan, kategori, lampiran, riwayatStatus } from "../../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { loadVisibilityMap, filterPublicProps } from "../../utils/visibility";

// GET /api/pengaduan — public list (UC-01)
// Query: ?status=diterima&kategori=3&limit=20&offset=0
// Respects tampilPublik (hidden items excluded) + pengaturan_publik visMap.
export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const status = q.status as string | undefined;
  const kategoriId = q.kategori ? Number(q.kategori) : undefined;
  const limit = Math.min(Number(q.limit) || 20, 100);
  const offset = Number(q.offset) || 0;

  const db = getDb();
  const visMap = await loadVisibilityMap();

  // Base: only tampilPublik=true for public
  const conditions: any[] = [eq(pengaduan.tampilPublik, true)];
  if (status && ["diterima", "diproses", "selesai"].includes(status)) conditions.push(eq(pengaduan.status, status as any));
  if (kategoriId) conditions.push(eq(pengaduan.idKategori, kategoriId));

  const rows = await db
    .select({
      pengaduan,
      kategoriNama: kategori.nama,
    })
    .from(pengaduan)
    .leftJoin(kategori, eq(pengaduan.idKategori, kategori.id))
    .where(and(...conditions))
    .orderBy(desc(pengaduan.createdAt))
    .limit(limit)
    .offset(offset);

  const mapped = rows.map(({ pengaduan: p, kategoriNama }) => {
    const obj: any = {
      id: p.id,
      kode: p.kode,
      status: p.status,
      createdAt: p.createdAt,
      // toggleable
      kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
      lokasi: p.lokasi,
      deskripsi: p.deskripsi,
    };
    return filterPublicProps(obj, visMap, false);
  });

  return { data: mapped, limit, offset };
});
