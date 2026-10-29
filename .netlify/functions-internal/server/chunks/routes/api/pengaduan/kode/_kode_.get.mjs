import { d as defineEventHandler, l as enforceRateLimit, g as getRouterParam, c as createError, b as getDb, p as pengaduan, q as getAuthUser, t as loadVisibilityMap, k as kategori, o as lampiran, e as riwayatStatus, x as filterPublicProps } from '../../../../nitro/nitro.mjs';
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

const _kode__get = defineEventHandler(async (event) => {
  var _a;
  enforceRateLimit(event, { windowMs: 6e4, max: 30, key: "kode" });
  const kode = (_a = getRouterParam(event, "kode")) == null ? void 0 : _a.trim();
  if (!kode) throw createError({ statusCode: 400, message: "Kode required" });
  const db = getDb();
  const [p] = await db.select().from(pengaduan).where(eq(pengaduan.kode, kode));
  if (!p) throw createError({ statusCode: 404, message: "Pengaduan not found" });
  const auth = getAuthUser(event);
  const isOwner = (auth == null ? void 0 : auth.id) === p.idPelapor;
  const isStaff = (auth == null ? void 0 : auth.peran) === "pengurus" || (auth == null ? void 0 : auth.peran) === "admin";
  const canSeeHidden = isOwner || isStaff;
  const visMap = await loadVisibilityMap();
  const isHidden = !p.tampilPublik && !canSeeHidden;
  let kat = null;
  if (!isHidden || visMap.get("kategori") !== false) {
    const [k] = await db.select().from(kategori).where(eq(kategori.id, p.idKategori));
    kat = k ? { id: k.id, nama: k.nama } : null;
  }
  let lamp = [];
  let riwayat = [];
  if (!isHidden) {
    if (visMap.get("lampiran") !== false) lamp = await db.select().from(lampiran).where(eq(lampiran.idPengaduan, p.id));
    if (visMap.get("riwayat") !== false) riwayat = await db.select().from(riwayatStatus).where(eq(riwayatStatus.idPengaduan, p.id));
  }
  const obj = {
    id: p.id,
    kode: p.kode,
    status: p.status,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    kategori: kat,
    lokasi: p.lokasi,
    deskripsi: p.deskripsi,
    lampiran: lamp,
    riwayat
  };
  if (canSeeHidden && !p.tampilPublik) return obj;
  return filterPublicProps(obj, visMap, isHidden);
});

export { _kode__get as default };
//# sourceMappingURL=_kode_.get.mjs.map
