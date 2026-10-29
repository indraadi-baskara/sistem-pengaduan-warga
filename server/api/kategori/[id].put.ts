import { z } from "zod";
import { getDb } from "../../db";
import { kategori } from "../../db/schema";
import { requireAdmin } from "../../utils/auth";
import { eq } from "drizzle-orm";

const Body = z.object({ nama: z.string().min(2).max(80) });

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const { nama } = Body.parse(await readBody(event));

  const db = getDb();
  // unique guard
  const [dup] = await db.select().from(kategori).where(eq(kategori.nama, nama.trim()));
  if (dup && dup.id !== id) throw createError({ statusCode: 409, message: "Kategori name already exists" });

  const [updated] = await db.update(kategori).set({ nama: nama.trim() }).where(eq(kategori.id, id)).returning();
  if (!updated) throw createError({ statusCode: 404, message: "Kategori not found" });
  return updated;
});
