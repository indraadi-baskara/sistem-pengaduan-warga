import { d as defineEventHandler, g as getRouterParam, c as createError, b as getDb, o as lampiran, p as pengaduan, q as getAuthUser, t as loadVisibilityMap, v as setHeader } from '../../../nitro/nitro.mjs';
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

const ____key__get = defineEventHandler(async (event) => {
  const raw = getRouterParam(event, "key");
  const rawKey = Array.isArray(raw) ? raw.join("/") : raw || "";
  const key = decodeURIComponent(rawKey);
  if (!key || !key.startsWith("lampiran/")) throw createError({ statusCode: 400, message: "Invalid lampiran key" });
  const db = getDb();
  const [row] = await db.select().from(lampiran).where(eq(lampiran.kunciStorage, key));
  if (!row) throw createError({ statusCode: 404, message: "Lampiran not found" });
  const [p] = await db.select().from(pengaduan).where(eq(pengaduan.id, row.idPengaduan));
  if (!p) throw createError({ statusCode: 404, message: "Pengaduan not found" });
  const auth = getAuthUser(event);
  const isOwner = (auth == null ? void 0 : auth.id) === p.idPelapor;
  const isStaff = (auth == null ? void 0 : auth.peran) === "pengurus" || (auth == null ? void 0 : auth.peran) === "admin";
  if (!p.tampilPublik && !isOwner && !isStaff) {
    throw createError({ statusCode: 403, message: "Pengaduan is hidden" });
  }
  const visMap = await loadVisibilityMap();
  if (visMap.get("lampiran") === false && !isOwner && !isStaff) {
    throw createError({ statusCode: 403, message: "Lampiran hidden by pengaturan publik" });
  }
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore("lampiran");
    const blob = await store.get(key, { type: "arrayBuffer" });
    if (blob) {
      setHeader(event, "Content-Type", row.mimeType || "application/octet-stream");
      setHeader(event, "Content-Disposition", `inline; filename="${row.namaFile}"`);
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return Buffer.from(blob);
    }
  } catch {
  }
  try {
    const { readFile } = await import('node:fs/promises');
    const { join } = await import('node:path');
    const data = await readFile(join(process.cwd(), ".data", "blobs", key));
    setHeader(event, "Content-Type", row.mimeType || "application/octet-stream");
    setHeader(event, "Content-Disposition", `inline; filename="${row.namaFile}"`);
    return data;
  } catch {
  }
  throw createError({ statusCode: 404, message: "File not found in storage" });
});

export { ____key__get as default };
//# sourceMappingURL=_...key_.get.mjs.map
