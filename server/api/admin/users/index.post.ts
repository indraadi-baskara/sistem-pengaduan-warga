import { z } from "zod";
import { hashPassword } from "../../../lib/auth";
import { getDb } from "../../../db";
import { pengguna } from "../../../db/schema";
import { requireAdmin } from "../../../utils/auth";
import { eq } from "drizzle-orm";

const Body = z.object({
  nama: z.string().min(2).max(100),
  email: z.string().email(),
  peran: z.enum(["pengurus", "admin"]),
  password: z.string().min(8).max(128),
});

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const body = Body.parse(await readBody(event));
  const db = getDb();
  const normalized = body.email.trim().toLowerCase();

  const [existing] = await db.select().from(pengguna).where(eq(pengguna.email, normalized));
  if (existing) throw createError({ statusCode: 409, message: "Email already registered" });

  const pwHash = await hashPassword(body.password);
  const [created] = await db
    .insert(pengguna)
    .values({
      nama: body.nama.trim(),
      email: normalized,
      password: pwHash,
      peran: body.peran,
      aktif: true,
    })
    .returning();

  return { id: created.id, nama: created.nama, email: created.email, peran: created.peran, aktif: created.aktif };
});
