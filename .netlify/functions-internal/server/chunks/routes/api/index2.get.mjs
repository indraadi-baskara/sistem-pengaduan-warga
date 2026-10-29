import { d as defineEventHandler, f as getQuery, b as getDb, t as loadVisibilityMap, p as pengaduan, k as kategori, x as filterPublicProps } from '../../nitro/nitro.mjs';
import { eq, or, ilike, and, sql, desc } from 'drizzle-orm';
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

const index_get = defineEventHandler(async (event) => {
  var _a, _b;
  const q = getQuery(event);
  const status = q.status;
  const kategoriId = q.kategori ? Number(q.kategori) : void 0;
  const search = (_a = q.q) == null ? void 0 : _a.trim();
  const limit = Math.min(Number(q.limit) || 20, 100);
  const offset = Number(q.offset) || 0;
  const db = getDb();
  const visMap = await loadVisibilityMap();
  const conditions = [eq(pengaduan.tampilPublik, true)];
  if (status && ["diterima", "diproses", "selesai"].includes(status)) conditions.push(eq(pengaduan.status, status));
  if (kategoriId) conditions.push(eq(pengaduan.idKategori, kategoriId));
  if (search) {
    conditions.push(or(ilike(pengaduan.lokasi, `%${search}%`), ilike(pengaduan.deskripsi, `%${search}%`), ilike(pengaduan.kode, `%${search}%`)));
  }
  const whereClause = and(...conditions);
  const [countRow] = await db.select({ cnt: sql`count(*)::int` }).from(pengaduan).where(whereClause);
  const total = Number((_b = countRow == null ? void 0 : countRow.cnt) != null ? _b : 0);
  const rows = await db.select({
    pengaduan,
    kategoriNama: kategori.nama
  }).from(pengaduan).leftJoin(kategori, eq(pengaduan.idKategori, kategori.id)).where(whereClause).orderBy(desc(pengaduan.createdAt)).limit(limit).offset(offset);
  const mapped = rows.map(({ pengaduan: p, kategoriNama }) => {
    const obj = {
      id: p.id,
      kode: p.kode,
      status: p.status,
      createdAt: p.createdAt,
      // toggleable
      kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
      lokasi: p.lokasi,
      deskripsi: p.deskripsi
    };
    return filterPublicProps(obj, visMap, false);
  });
  return { data: mapped, total, limit, offset };
});

export { index_get as default };
//# sourceMappingURL=index2.get.mjs.map
