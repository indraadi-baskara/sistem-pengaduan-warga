import { getDb } from "../../db";
import { lampiran, pengaduan } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getAuthUser } from "../../utils/auth";
import { loadVisibilityMap } from "../../utils/visibility";

// GET /api/lampiran/:key — stream file from Netlify Blobs (or .data/blobs fallback)
// Respects tampilPublik + pengaturan_publik lampiran toggle. Owner/staff bypass.
export default defineEventHandler(async (event) => {
  const raw = getRouterParam(event, "key") as any;
  const rawKey = Array.isArray(raw) ? raw.join("/") : raw || "";
  // Nuxt encodes slash as %2F; decode fully (lampiran/xxx)
  const key = decodeURIComponent(rawKey);
  if (!key || !key.startsWith("lampiran/")) throw createError({ statusCode: 400, message: "Invalid lampiran key" });

  const db = getDb();
  const [row] = await db.select().from(lampiran).where(eq(lampiran.kunciStorage, key));
  if (!row) throw createError({ statusCode: 404, message: "Lampiran not found" });

  const [p] = await db.select().from(pengaduan).where(eq(pengaduan.id, row.idPengaduan));
  if (!p) throw createError({ statusCode: 404, message: "Pengaduan not found" });

  const auth = getAuthUser(event);
  const isOwner = auth?.id === p.idPelapor;
  const isStaff = auth?.peran === "pengurus" || auth?.peran === "admin";

  if (!p.tampilPublik && !isOwner && !isStaff) {
    throw createError({ statusCode: 403, message: "Pengaduan is hidden" });
  }

  const visMap = await loadVisibilityMap();
  if (visMap.get("lampiran") === false && !isOwner && !isStaff) {
    throw createError({ statusCode: 403, message: "Lampiran hidden by pengaturan publik" });
  }

  // Try Netlify Blobs first
  try {
    const { getStore } = await import("@netlify/blobs" as any);
    const store = getStore("lampiran");
    const blob = await store.get(key, { type: "arrayBuffer" });
    if (blob) {
      setHeader(event, "Content-Type", row.mimeType || "application/octet-stream");
      setHeader(event, "Content-Disposition", `inline; filename="${row.namaFile}"`);
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return Buffer.from(blob as ArrayBuffer);
    }
  } catch {}

  // Fallback: local .data/blobs
  try {
    const { readFile } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const data = await readFile(join(process.cwd(), ".data", "blobs", key));
    setHeader(event, "Content-Type", row.mimeType || "application/octet-stream");
    setHeader(event, "Content-Disposition", `inline; filename="${row.namaFile}"`);
    return data;
  } catch {}

  throw createError({ statusCode: 404, message: "File not found in storage" });
});
