import { d as defineEventHandler, w as requireAuth, b as getDb, k as kategori, p as pengaduan } from '../../../nitro/nitro.mjs';
import { eq, desc } from 'drizzle-orm';
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

const me_get = defineEventHandler(async (event) => {
  const user = requireAuth(event);
  const db = getDb();
  const rows = await db.select({ pengaduan, kategoriNama: kategori.nama }).from(pengaduan).leftJoin(kategori, eq(pengaduan.idKategori, kategori.id)).where(eq(pengaduan.idPelapor, user.id)).orderBy(desc(pengaduan.createdAt));
  return rows.map(({ pengaduan: p, kategoriNama }) => ({
    id: p.id,
    kode: p.kode,
    status: p.status,
    tampilPublik: p.tampilPublik,
    lokasi: p.lokasi,
    deskripsi: p.deskripsi,
    kategori: kategoriNama ? { id: p.idKategori, nama: kategoriNama } : null,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  }));
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
