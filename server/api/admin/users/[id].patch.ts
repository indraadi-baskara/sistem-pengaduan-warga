import { z } from "zod";
import { hashPassword } from "../../../lib/auth";
import { getDb } from "../../../db";
import { pengguna } from "../../../db/schema";
import { requireAdmin } from "../../../utils/auth";
import { eq, sql } from "drizzle-orm";

const Body = z.object({
  nama: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  peran: z.enum(["pelapor", "pengurus", "admin"]).optional(),
  aktif: z.boolean().optional(),
  password: z.string().min(8).max(128).optional(), // admin reset
});

// PATCH /api/admin/users/:id — reactivate, change role, reset password, rename
export default defineEventHandler(async (event) => {
  const admin = requireAdmin(event);
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "Invalid id" });
  const body = Body.parse(await readBody(event));

  if (admin.id === id && body.aktif === false) throw createError({ statusCode: 400, message: "Cannot deactivate own account" });
  if (admin.id === id && body.peran && body.peran !== admin.peran) throw createError({ statusCode: 400, message: "Cannot change own role" });

  const db = getDb();
  const [existing] = await db.select().from(pengguna).where(eq(pengguna.id, id));
  if (!existing) throw createError({ statusCode: 404, message: "User not found" });

  // email uniqueness
  if (body.email) {
    const normalized = body.email.trim().toLowerCase();
    if (normalized !== existing.email) {
      const [dup] = await db.select().from(pengguna).where(eq(pengguna.email, normalized));
      if (dup) throw createError({ statusCode: 409, message: "Email already taken" });
      body.email = normalized;
    }
  }

  const patch: any = { updatedAt: sql`extract(epoch from now())::int` };
  if (body.nama !== undefined) patch.nama = body.nama.trim();
  if (body.email !== undefined) patch.email = body.email;
  if (body.peran !== undefined) patch.peran = body.peran;
  if (body.aktif !== undefined) patch.aktif = body.aktif;
  if (body.password !== undefined) patch.password = await hashPassword(body.password);

  const [updated] = await db.update(pengguna).set(patch).where(eq(pengguna.id, id)).returning();
  return { id: updated.id, nama: updated.nama, email: updated.email, peran: updated.peran, aktif: updated.aktif };
});
