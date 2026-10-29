import { getDb } from "../../../db";
import { pengguna } from "../../../db/schema";
import { requireAdmin } from "../../../utils/auth";

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const db = getDb();
  const rows = await db.select().from(pengguna);
  // Never return password hash
  return rows.map((u) => ({
    id: u.id,
    nama: u.nama,
    email: u.email,
    peran: u.peran,
    aktif: u.aktif,
    createdAt: u.createdAt,
  }));
});
