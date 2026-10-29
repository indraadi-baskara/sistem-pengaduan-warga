import { d as defineEventHandler, w as requireAuth, y as readMultipartFormData, c as createError } from '../../nitro/nitro.mjs';
import 'unhead/server';
import 'vue';
import 'unhead/legacy';
import 'unhead/plugins';
import 'drizzle-orm/neon-http';
import '@neondatabase/serverless';
import 'drizzle-orm/pg-core';
import 'drizzle-orm';
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

const upload_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  requireAuth(event);
  const form = await readMultipartFormData(event);
  if (!(form == null ? void 0 : form.length)) throw createError({ statusCode: 400, message: "No file uploaded" });
  const file = form.find((f) => f.name === "file" || f.filename);
  if (!(file == null ? void 0 : file.data)) throw createError({ statusCode: 400, message: "Field 'file' required" });
  if (file.data.length > 5 * 1024 * 1024) throw createError({ statusCode: 413, message: "File too large (max 5MB)" });
  const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (file.type && !allowed.includes(file.type)) {
    throw createError({ statusCode: 400, message: `Unsupported type ${file.type}. Allowed: ${allowed.join(", ")}` });
  }
  const ext = ((_a = file.filename) == null ? void 0 : _a.split(".").pop()) || "bin";
  const key = `lampiran/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore("lampiran");
    await store.set(key, file.data, { metadata: { mimeType: (_b = file.type) != null ? _b : "application/octet-stream" } });
  } catch {
    try {
      const { writeFile, mkdir } = await import('node:fs/promises');
      const { join } = await import('node:path');
      await mkdir(join(process.cwd(), ".data", "blobs", "lampiran"), { recursive: true });
      await writeFile(join(process.cwd(), ".data", "blobs", key), file.data);
    } catch {
    }
  }
  return {
    kunciStorage: key,
    namaFile: (_c = file.filename) != null ? _c : "upload",
    mimeType: (_d = file.type) != null ? _d : "application/octet-stream",
    ukuran: file.data.length
  };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
