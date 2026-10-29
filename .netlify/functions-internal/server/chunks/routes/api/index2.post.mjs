import { d as defineEventHandler, w as requireAuth, a as readBody, b as getDb, k as kategori, c as createError, p as pengaduan, o as lampiran, e as riwayatStatus } from '../../nitro/nitro.mjs';
import { z } from 'zod';
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

const Body = z.object({
  idKategori: z.number().int(),
  lokasi: z.string().min(3).max(300),
  deskripsi: z.string().min(10).max(5e3),
  tampilPublik: z.boolean().optional().default(true),
  // lampiran optional metadata (actual file upload via multipart handled separately; this keeps JSON path simple)
  lampiran: z.array(
    z.object({
      namaFile: z.string(),
      kunciStorage: z.string(),
      mimeType: z.string().optional(),
      ukuran: z.number().optional()
    })
  ).optional()
});
function genKode() {
  const d = /* @__PURE__ */ new Date();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LW-${d.getFullYear()}-${rnd}`;
}
const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = requireAuth(event);
  const body = Body.parse(await readBody(event));
  const db = getDb();
  const [kat] = await db.select().from(kategori).where(eq(kategori.id, body.idKategori));
  if (!kat) throw createError({ statusCode: 400, message: "Kategori not found" });
  const kode = genKode();
  const doInsert = async (tx) => {
    var _a2, _b2, _c2, _d;
    const [created2] = await tx.insert(pengaduan).values({
      kode,
      idKategori: body.idKategori,
      idPelapor: user.id,
      lokasi: body.lokasi.trim(),
      deskripsi: body.deskripsi.trim(),
      status: "diterima",
      tampilPublik: (_a2 = body.tampilPublik) != null ? _a2 : true
    }).returning();
    if ((_b2 = body.lampiran) == null ? void 0 : _b2.length) {
      for (const l of body.lampiran) {
        await tx.insert(lampiran).values({
          idPengaduan: created2.id,
          namaFile: l.namaFile,
          kunciStorage: l.kunciStorage,
          mimeType: (_c2 = l.mimeType) != null ? _c2 : null,
          ukuran: (_d = l.ukuran) != null ? _d : null
        });
      }
    }
    await tx.insert(riwayatStatus).values({
      idPengaduan: created2.id,
      idPengguna: null,
      // system initial entry per spec §5.4
      status: "diterima",
      catatan: "Pengaduan diterima sistem"
    });
    return created2;
  };
  let created;
  const isNeonHttp = (_b = db.__isNeonHttp) != null ? _b : ((_a = db.constructor) == null ? void 0 : _a.name) === "NeonHttpDatabase";
  if (!isNeonHttp && typeof db.transaction === "function") {
    try {
      created = await db.transaction(doInsert);
    } catch (e) {
      if ((_c = e.message) == null ? void 0 : _c.includes("No transactions support")) created = await doInsert(db);
      else throw e;
    }
  } else {
    created = await doInsert(db);
  }
  return { pengaduan: created, kode };
});

export { index_post as default };
//# sourceMappingURL=index2.post.mjs.map
