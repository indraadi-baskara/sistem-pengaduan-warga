import { z } from "zod";
import { getDb } from "../../../../db";
import { pengaduan, riwayatStatus } from "../../../../db/schema";
import { requirePengurusOrAdmin } from "../../../../utils/auth";
import { eq, sql } from "drizzle-orm";

const Body = z.object({
  status: z.enum(["diterima", "diproses", "selesai"]),
  catatan: z.string().max(1000).optional(),
});

export default defineEventHandler(async (event) => {
  const user = requirePengurusOrAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const { status, catatan } = Body.parse(await readBody(event));

  const db = getDb();
  const [existing] = await db.select().from(pengaduan).where(eq(pengaduan.id, id));
  if (!existing) throw createError({ statusCode: 404, message: "Pengaduan not found" });

  const doUpdate = async (tx: any) => {
    const [updated] = await tx.update(pengaduan).set({ status, updatedAt: sql`extract(epoch from now())::int` as any }).where(eq(pengaduan.id, id)).returning();
    await tx.insert(riwayatStatus).values({
      idPengaduan: id,
      idPengguna: user.id,
      status,
      catatan: catatan ?? null,
    });
    return updated;
  };

  const isNeonHttp = (db as any).__isNeonHttp ?? (db as any).constructor?.name === "NeonHttpDatabase";
  let result: any;
  if (!isNeonHttp && typeof (db as any).transaction === "function") {
    try {
      result = await (db as any).transaction(doUpdate);
    } catch (e: any) {
      if (e.message?.includes("No transactions support")) result = await doUpdate(db);
      else throw e;
    }
  } else {
    result = await doUpdate(db);
  }
  return result;
});
