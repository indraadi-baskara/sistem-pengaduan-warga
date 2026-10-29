import { getDb } from "../../db";
import { pengaduan, kategori } from "../../db/schema";
import { requirePengurusOrAdmin } from "../../utils/auth";
import { sql, eq } from "drizzle-orm";

// GET /api/admin/stats — dashboard counts for FR-05
export default defineEventHandler(async (event) => {
  requirePengurusOrAdmin(event);
  const db = getDb();

  const [totalRow] = await db.select({ cnt: sql<number>`count(*)::int` }).from(pengaduan);

  const byStatus = await db
    .select({ status: pengaduan.status, cnt: sql<number>`count(*)::int` })
    .from(pengaduan)
    .groupBy(pengaduan.status);

  const byKategori = await db
    .select({ kategoriId: pengaduan.idKategori, kategoriNama: kategori.nama, cnt: sql<number>`count(*)::int` })
    .from(pengaduan)
    .leftJoin(kategori, eq(pengaduan.idKategori, kategori.id))
    .groupBy(pengaduan.idKategori, kategori.nama);

  const recentByDay = await db.execute(sql`
    SELECT to_timestamp(created_at)::date as day, count(*)::int as cnt
    FROM pengaduan
    GROUP BY day
    ORDER BY day DESC
    LIMIT 14
  ` as any);

  return {
    total: Number(totalRow?.cnt ?? 0),
    byStatus: byStatus.map((r) => ({ status: r.status, count: Number(r.cnt) })),
    byKategori: byKategori.map((r) => ({ kategoriId: r.kategoriId, kategoriNama: r.kategoriNama, count: Number(r.cnt) })),
    recentByDay: (recentByDay as any).rows ?? recentByDay,
  };
});
