import { getDb } from "../../../db";
import { pengaduan, kategori, lampiran, riwayatStatus } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { loadVisibilityMap, filterPublicProps } from "../../../utils/visibility";
import { getAuthUser } from "../../../utils/auth";
import { enforceRateLimit } from "../../../utils/rateLimit";

// GET /api/pengaduan/kode/:kode — UC-02 tracking (public, no auth)
// Hidden complaints: only kode + status visible unless owner/staff.
export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { windowMs: 60_000, max: 30, key: "kode" });
  const kode = getRouterParam(event, "kode")?.trim();
  if (!kode) throw createError({ statusCode: 400, message: "Kode required" });

  const db = getDb();
  const [p] = await db.select().from(pengaduan).where(eq(pengaduan.kode, kode));
  if (!p) throw createError({ statusCode: 404, message: "Pengaduan not found" });

  const auth = getAuthUser(event);
  const isOwner = auth?.id === p.idPelapor;
  const isStaff = auth?.peran === "pengurus" || auth?.peran === "admin";
  const canSeeHidden = isOwner || isStaff;

  const visMap = await loadVisibilityMap();
  const isHidden = !p.tampilPublik && !canSeeHidden;

  // Resolve kategori
  let kat: any = null;
  if (!isHidden || visMap.get("kategori") !== false) {
    const [k] = await db.select().from(kategori).where(eq(kategori.id, p.idKategori));
    kat = k ? { id: k.id, nama: k.nama } : null;
  }

  // Lampiran + riwayat filtered by visibility
  let lamp: any[] = [];
  let riwayat: any[] = [];
  if (!isHidden) {
    if (visMap.get("lampiran") !== false) lamp = await db.select().from(lampiran).where(eq(lampiran.idPengaduan, p.id));
    if (visMap.get("riwayat") !== false) riwayat = await db.select().from(riwayatStatus).where(eq(riwayatStatus.idPengaduan, p.id));
  }
  // isHidden: spec strict => empty lamp/riwayat, only kode+status via filter

  const obj: any = {
    id: p.id,
    kode: p.kode,
    status: p.status,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    kategori: kat,
    lokasi: p.lokasi,
    deskripsi: p.deskripsi,
    lampiran: lamp,
    riwayat,
  };

  // Owner/staff bypass visMap entirely (full object)
  if (canSeeHidden && !p.tampilPublik) return obj;
  return filterPublicProps(obj, visMap, isHidden);
});
