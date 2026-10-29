import { getDb } from "../../db";
import { pengaturanPublik } from "../../db/schema";

export default defineEventHandler(async () => {
  const db = getDb();
  const rows = await db.select().from(pengaturanPublik).orderBy(pengaturanPublik.namaProperti);
  return rows;
});
