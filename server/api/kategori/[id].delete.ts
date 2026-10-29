import { getDb } from "../../db";
import { kategori, pengaduan } from "../../db/schema";
import { requireAdmin } from "../../utils/auth";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });

  const db = getDb();
  const [inUse] = await db.select().from(pengaduan).where(eq(pengaduan.idKategori, id)).limit(1);
  if (inUse) throw createError({ statusCode: 409, message: "Cannot delete kategori in use by pengaduan" });

  const [deleted] = await db.delete(kategori).where(eq(kategori.id, id)).returning();
  if (!deleted) throw createError({ statusCode: 404, message: "Kategori not found" });
  return { ok: true, id: deleted.id };
});
