import { requireAuth } from "../utils/auth";

// POST /api/upload — lampiran helper (Netlify Blobs when available, else local .data/blobs)
// Body: multipart/form-data with field "file"
// Returns: { kunciStorage, namaFile, mimeType, ukuran }
export default defineEventHandler(async (event) => {
  requireAuth(event);
  const form = await readMultipartFormData(event);
  if (!form?.length) throw createError({ statusCode: 400, message: "No file uploaded" });

  const file = form.find((f) => f.name === "file" || f.filename);
  if (!file?.data) throw createError({ statusCode: 400, message: "Field 'file' required" });
  if (file.data.length > 5 * 1024 * 1024) throw createError({ statusCode: 413, message: "File too large (max 5MB)" });

  const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (file.type && !allowed.includes(file.type)) {
    throw createError({ statusCode: 400, message: `Unsupported type ${file.type}. Allowed: ${allowed.join(", ")}` });
  }

  const ext = file.filename?.split(".").pop() || "bin";
  const key = `lampiran/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  let stored = false;
  let storeError = "";

  // 1) Try Netlify Blobs (prod). Requires @netlify/blobs dep + NETLIFY_BLOBS_CONTEXT on Functions.
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("lampiran");
    await store.set(key, file.data as any);
    stored = true;
    console.log(`[upload] blobs set ok: ${key} (${file.data.length}b)`);
  } catch (e: any) {
    storeError = e?.message?.slice(0, 300) || String(e).slice(0, 300);
    console.warn(`[upload] blobs set failed: ${storeError}`);
  }

  // 2) Local fallback: .data/blobs (dev only — ephemeral on Netlify, don't rely)
  if (!stored) {
    try {
      const { writeFile, mkdir } = await import("node:fs/promises");
      const { join } = await import("node:path");
      await mkdir(join(process.cwd(), ".data", "blobs", "lampiran"), { recursive: true });
      await writeFile(join(process.cwd(), ".data", "blobs", key), file.data);
      stored = true;
      console.log(`[upload] local fallback write ok: ${key}`);
    } catch (e: any) {
      console.error(`[upload] local fallback failed: ${e?.message}`);
    }
  }

  if (!stored) {
    throw createError({
      statusCode: 500,
      message: `Storage unavailable — blobs: ${storeError || "unknown"} (check Netlify Blobs enabled, see netlify.toml)`,
    });
  }

  return {
    kunciStorage: key,
    namaFile: file.filename ?? "upload",
    mimeType: file.type ?? "application/octet-stream",
    ukuran: file.data.length,
  };
});
