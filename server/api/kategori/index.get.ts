import { getDb } from "../../db";
import { kategori } from "../../db/schema";

export default defineEventHandler(async () => {
  const db = getDb();
  const rows = await db.select().from(kategori).orderBy(kategori.nama);
  return rows;
});
