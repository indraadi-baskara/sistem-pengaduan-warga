import { d as defineEventHandler, r as requirePengurusOrAdmin, b as getDb, p as pengaduan, k as kategori } from '../../../nitro/nitro.mjs';
import { sql, eq } from 'drizzle-orm';
import 'unhead/server';
import 'vue';
import 'unhead/legacy';
import 'unhead/plugins';
import 'drizzle-orm/neon-http';
import '@neondatabase/serverless';
import 'drizzle-orm/pg-core';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:fs/promises';
import '@iconify/utils';
import 'consola';

const stats_get = defineEventHandler(async (event) => {
  var _a, _b;
  requirePengurusOrAdmin(event);
  const db = getDb();
  const [totalRow] = await db.select({ cnt: sql`count(*)::int` }).from(pengaduan);
  const byStatus = await db.select({ status: pengaduan.status, cnt: sql`count(*)::int` }).from(pengaduan).groupBy(pengaduan.status);
  const byKategori = await db.select({ kategoriId: pengaduan.idKategori, kategoriNama: kategori.nama, cnt: sql`count(*)::int` }).from(pengaduan).leftJoin(kategori, eq(pengaduan.idKategori, kategori.id)).groupBy(pengaduan.idKategori, kategori.nama);
  const recentByDay = await db.execute(sql`
    SELECT to_timestamp(created_at)::date as day, count(*)::int as cnt
    FROM pengaduan
    GROUP BY day
    ORDER BY day DESC
    LIMIT 14
  `);
  return {
    total: Number((_a = totalRow == null ? void 0 : totalRow.cnt) != null ? _a : 0),
    byStatus: byStatus.map((r) => ({ status: r.status, count: Number(r.cnt) })),
    byKategori: byKategori.map((r) => ({ kategoriId: r.kategoriId, kategoriNama: r.kategoriNama, count: Number(r.cnt) })),
    recentByDay: (_b = recentByDay.rows) != null ? _b : recentByDay
  };
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
