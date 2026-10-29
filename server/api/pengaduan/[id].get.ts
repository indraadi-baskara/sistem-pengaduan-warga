import { getDb } from "../../db";
import { pengaduan, kategori, lampiran, riwayatStatus } from "../../db/schema";
import { eq } from "drizzle-orm";
import { loadVisibilityMap, filterPublicProps } from "../../utils/visibility";
import { getAuthUser } from "../../utils/auth";

// GET /api/pengaduan/:id — public detail; hidden items gated.
// Owner + pengurus/admin bypass hidden gate.
export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });

  const db = getDb();
  const [p] = await db.select().from(pengaduan).where(eq(pengaduan.id, id));
  if (!p) throw createError({ statusCode: 404, message: "Pengaduan not found" });

  const auth = getAuthUser(event);
  const isOwner = auth?.id === p.idPelapor;
  const isStaff = auth?.peran === "pengurus" || auth?.peran === "admin";
  const canSeeHidden = isOwner || isStaff;

  if (!p.tampilPublik && !canSeeHidden) {
    // Public visitor: only kode+status
    return { id: p.id, kode: p.kode, status: p.status, createdAt: p.createdAt, _hidden: true };
  }

  const visMap = await loadVisibilityMap();
  const [kat] = await db.select().from(kategori).where(eq(kategori.id, p.idKategori));
  const lamp = await db.select().from(lampiran).where(eq(lampiran.idPengaduan, p.id));
  const riwayat = await db.select().from(riwayatStatus).where(eq(riwayatStatus.idPengaduan, p.id));

  const obj: any = {
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
    updatedAt: p.updatedAt,
  };

  // Staff/owner see full regardless of visMap; public filtered
  if (canSeeHidden) return obj;
  return filterPublicProps(obj, visMap, false);
});
