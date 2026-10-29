import { getDb } from "../db";
import { pengaturanPublik } from "../db/schema";

// Properties that can be toggled via pengaturan_publik (FR-07).
// Identity fields (nama/surel/telepon pelapor) are never in this list — they are never exposed.
// kode + status are always visible (hard guard in filterPublicProps) per UC-12 spec.
export const TOGGLEABLE_PROPS = ["kategori", "lokasi", "deskripsi", "lampiran", "riwayat"] as const;
export type ToggleProp = (typeof TOGGLEABLE_PROPS)[number];

export const ALWAYS_VISIBLE = ["kode", "status", "createdAt"] as const;

/**
 * Load pengaturan_publik map: nama_properti -> tampilPublik
 * Missing rows default to true (visible) for backwards compat.
 */
export async function loadVisibilityMap(): Promise<Map<string, boolean>> {
  const db = getDb();
  const rows = await db.select().from(pengaturanPublik);
  const m = new Map<string, boolean>();
  for (const r of rows) m.set(r.namaProperti, !!r.tampilPublik);
  return m;
}

/**
 * Filter a pengaduan object to only include properties allowed by pengaturan_publik.
 * For hidden pengaduan (tampilPublik=false), only kode+status are returned at public level.
 */
export function filterPublicProps<T extends Record<string, any>>(
  obj: T,
  visMap: Map<string, boolean>,
  isHidden = false,
): Partial<T> {
  if (isHidden) {
    // Spec UC-01/02 alternate: hidden => only kode + status
    const out: any = {};
    for (const k of ALWAYS_VISIBLE) if (k in obj) out[k] = obj[k];
    // explicitly ensure kode/status even if visMap says hidden
    if ("kode" in obj) out.kode = obj.kode;
    if ("status" in obj) out.status = obj.status;
    if ("id" in obj) out.id = obj.id;
    return out;
  }
  const out: any = { ...obj };
  // Enforce visMap on toggleable props — remove if toggled off
  for (const prop of TOGGLEABLE_PROPS) {
    if (visMap.get(prop) === false) delete out[prop];
  }
  // Always keep kode/status regardless of visMap
  return out;
}
