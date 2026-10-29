import { d as defineEventHandler, g as getRouterParam, c as createError, b as getDb, p as pengaduan, q as getAuthUser, t as loadVisibilityMap, k as kategori, o as lampiran, e as riwayatStatus, x as filterPublicProps } from '../../../nitro/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const _id__get = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const db = getDb();
  const [p] = await db.select().from(pengaduan).where(eq(pengaduan.id, id));
  if (!p) throw createError({ statusCode: 404, message: "Pengaduan not found" });
  const auth = getAuthUser(event);
  const isOwner = (auth == null ? void 0 : auth.id) === p.idPelapor;
  const isStaff = (auth == null ? void 0 : auth.peran) === "pengurus" || (auth == null ? void 0 : auth.peran) === "admin";
  const canSeeHidden = isOwner || isStaff;
  if (!p.tampilPublik && !canSeeHidden) {
    return { id: p.id, kode: p.kode, status: p.status, createdAt: p.createdAt, _hidden: true };
  }
  const visMap = await loadVisibilityMap();
  const [kat] = await db.select().from(kategori).where(eq(kategori.id, p.idKategori));
  const lamp = await db.select().from(lampiran).where(eq(lampiran.idPengaduan, p.id));
  const riwayat = await db.select().from(riwayatStatus).where(eq(riwayatStatus.idPengaduan, p.id));
  const obj = {
    id: p.id,
    kode: p.kode,
    status: p.status,
    tampilPublik: p.tampilPublik,
    lokasi: p.lokasi,
    deskripsi: p.deskripsi,
    kategori: kat ? { id: kat.id, nama: kat.nama } : null,
    lampiran: lamp,
    riwayat,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  };
  if (canSeeHidden) return obj;
  return filterPublicProps(obj, visMap, false);
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
