import { d as defineEventHandler, r as requirePengurusOrAdmin, f as getQuery, b as getDb, p as pengaduan, h as pengguna, k as kategori } from '../../../nitro/nitro.mjs';
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
  requirePengurusOrAdmin(event);
  const q = getQuery(event);
  const status = q.status;
  const kategoriId = q.kategori ? Number(q.kategori) : void 0;
  const search = (_a = q.q) == null ? void 0 : _a.trim();
  const limit = Math.min(Number(q.limit) || 20, 100);
  const offset = Number(q.offset) || 0;
  const db = getDb();
  const conditions = [];
  if (status && ["diterima", "diproses", "selesai"].includes(status)) conditions.push(eq(pengaduan.status, status));
  if (kategoriId) conditions.push(eq(pengaduan.idKategori, kategoriId));
  if (search) {
    conditions.push(or(ilike(pengaduan.lokasi, `%${search}%`), ilike(pengaduan.deskripsi, `%${search}%`), ilike(pengaduan.kode, `%${search}%`)));
  }
  const whereClause = conditions.length ? and(...conditions) : void 0;
  const [countRow] = whereClause ? await db.select({ cnt: sql`count(*)::int` }).from(pengaduan).where(whereClause) : await db.select({ cnt: sql`count(*)::int` }).from(pengaduan);
  const total = Number((_b = countRow == null ? void 0 : countRow.cnt) != null ? _b : 0);
  const base = db.select({ pengaduan, kategoriNama: kategori.nama, pelaporNama: pengguna.nama }).from(pengaduan).leftJoin(kategori, eq(pengaduan.idKategori, kategori.id)).leftJoin(pengguna, eq(pengaduan.idPelapor, pengguna.id));
  const rows = whereClause ? await base.where(whereClause).orderBy(desc(pengaduan.createdAt)).limit(limit).offset(offset) : await base.orderBy(desc(pengaduan.createdAt)).limit(limit).offset(offset);
  return {
    data: rows.map(({ pengaduan: p, kategoriNama, pelaporNama }) => ({
      id: p.id,
      kode: p.kode,
      status: p.status,
      tampilPublik: p.tampilPublik,
      lokasi: p.lokasi,
      deskripsi: p.deskripsi,
      kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
      pelaporNama,
      // admin sees reporter name internally (never exposed on public routes)
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    })),
    total,
    limit,
    offset
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
