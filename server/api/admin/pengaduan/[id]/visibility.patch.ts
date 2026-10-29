import { z } from "zod";
import { getDb } from "../../../../db";
import { pengaduan } from "../../../../db/schema";
import { requirePengurusOrAdmin } from "../../../../utils/auth";
import { eq } from "drizzle-orm";

const Body = z.object({ tampilPublik: z.boolean() });

export default defineEventHandler(async (event) => {
  requirePengurusOrAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const { tampilPublik } = Body.parse(await readBody(event));

  const db = getDb();
  const [updated] = await db.update(pengaduan).set({ tampilPublik, updatedAt: new Date() }).where(eq(pengaduan.id, id)).returning();
  if (!updated) throw createError({ statusCode: 404, message: "Pengaduan not found" });
  return updated;
});
