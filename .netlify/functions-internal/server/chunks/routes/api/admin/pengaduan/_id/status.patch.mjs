import { d as defineEventHandler, r as requirePengurusOrAdmin, g as getRouterParam, c as createError, a as readBody, b as getDb, p as pengaduan, e as riwayatStatus } from '../../../../../nitro/nitro.mjs';
import { z } from 'zod';
import { eq, sql } from 'drizzle-orm';
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
  status: z.enum(["diterima", "diproses", "selesai"]),
  catatan: z.string().max(1e3).optional()
});
const status_patch = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = requirePengurusOrAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const { status, catatan } = Body.parse(await readBody(event));
  const db = getDb();
  const [existing] = await db.select().from(pengaduan).where(eq(pengaduan.id, id));
  if (!existing) throw createError({ statusCode: 404, message: "Pengaduan not found" });
  const doUpdate = async (tx) => {
    const [updated] = await tx.update(pengaduan).set({ status, updatedAt: sql`extract(epoch from now())::int` }).where(eq(pengaduan.id, id)).returning();
    await tx.insert(riwayatStatus).values({
      idPengaduan: id,
      idPengguna: user.id,
      status,
      catatan: catatan != null ? catatan : null
    });
    return updated;
  };
  const isNeonHttp = (_b = db.__isNeonHttp) != null ? _b : ((_a = db.constructor) == null ? void 0 : _a.name) === "NeonHttpDatabase";
  let result;
  if (!isNeonHttp && typeof db.transaction === "function") {
    try {
      result = await db.transaction(doUpdate);
    } catch (e) {
      if ((_c = e.message) == null ? void 0 : _c.includes("No transactions support")) result = await doUpdate(db);
      else throw e;
    }
  } else {
    result = await doUpdate(db);
  }
  return result;
});

export { status_patch as default };
//# sourceMappingURL=status.patch.mjs.map
