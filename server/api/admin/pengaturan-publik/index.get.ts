import { getDb } from "../../../db";
import { pengaturanPublik } from "../../../db/schema";
import { requireAdmin } from "../../../utils/auth";

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const db = getDb();
  const rows = await db.select().from(pengaturanPublik).orderBy(pengaturanPublik.namaProperti);
  return rows;
});
