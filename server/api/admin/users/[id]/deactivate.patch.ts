import { z } from "zod";
import { getDb } from "../../../../db";
import { pengguna } from "../../../../db/schema";
import { requireAdmin } from "../../../../utils/auth";
import { eq } from "drizzle-orm";

const Body = z.object({ aktif: z.boolean() });

export default defineEventHandler(async (event) => {
  const admin = requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const { aktif } = Body.parse(await readBody(event));

  if (admin.id === id && !aktif) throw createError({ statusCode: 400, message: "Cannot deactivate own account" });

  const db = getDb();
  const [updated] = await db.update(pengguna).set({ aktif, updatedAt: new Date() }).where(eq(pengguna.id, id)).returning();
  if (!updated) throw createError({ statusCode: 404, message: "User not found" });
  return { id: updated.id, aktif: updated.aktif };
});
