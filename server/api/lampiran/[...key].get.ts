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

  // 1) Netlify Blobs (prod)
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("lampiran");
    const blob = await store.get(key, { type: "arrayBuffer" });
    if (blob) {
      console.log(`[lampiran] blobs hit: ${key} (${(blob as ArrayBuffer).byteLength}b)`);
      setHeader(event, "Content-Type", row.mimeType || "application/octet-stream");
      setHeader(event, "Content-Disposition", `inline; filename="${row.namaFile}"`);
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return Buffer.from(blob as ArrayBuffer);
    } else {
      console.warn(`[lampiran] blobs miss: ${key}`);
    }
  } catch (e: any) {
    console.warn(`[lampiran] blobs get failed: ${e?.message?.slice(0, 300)}`);
  }

  // 2) DB file_store fallback (prod fix — persists across Function invocations)
  try {
    const { fileStore } = await import("../../db/schema");
    const [fs] = await db.select().from(fileStore).where(eq(fileStore.kunciStorage, key));
    if (fs?.dataBase64) {
      console.log(`[lampiran] db file_store hit: ${key} (${fs.ukuran}b)`);
      setHeader(event, "Content-Type", fs.mimeType || row.mimeType || "application/octet-stream");
      setHeader(event, "Content-Disposition", `inline; filename="${row.namaFile}"`);
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return Buffer.from(fs.dataBase64, "base64");
    }
  } catch (e: any) {
    console.warn(`[lampiran] db file_store miss: ${e?.message?.slice(0, 200)}`);
  }

  // 3) Local .data/blobs fallback (dev)
  try {
    const { readFile } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const data = await readFile(join(process.cwd(), ".data", "blobs", key));
    setHeader(event, "Content-Type", row.mimeType || "application/octet-stream");
    setHeader(event, "Content-Disposition", `inline; filename="${row.namaFile}"`);
    return data;
  } catch {}

  throw createError({
    statusCode: 404,
    message: "File not found in storage — was it uploaded before Blobs was enabled? Re-upload required.",
  });
});
