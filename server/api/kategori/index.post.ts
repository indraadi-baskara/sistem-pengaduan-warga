import { z } from "zod";
import { getDb } from "../../db";
import { kategori } from "../../db/schema";
import { requireAdmin } from "../../utils/auth";

const Body = z.object({ nama: z.string().min(2).max(80) });

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const { nama } = Body.parse(await readBody(event));
  const db = getDb();
  const [created] = await db.insert(kategori).values({ nama: nama.trim() }).returning();
  return created;
});
