import { z } from "zod";
import { hashPassword } from "../../lib/auth";
import { ensureMigrated } from "../../utils/migrate";
import { enforceRateLimit } from "../../utils/rateLimit";
import { getDb } from "../../db";
import { pengguna } from "../../db/schema";
import { eq } from "drizzle-orm";

const Body = z.object({
  nama: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { windowMs: 60_000, max: 5, key: "auth:register" });
  await ensureMigrated();
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
      peran: "pelapor",
      aktif: true,
    })
    .returning();

  const safeUser = { id: created.id, nama: created.nama, email: created.email, peran: created.peran };
  await setUserSession(event, { user: safeUser } as any);
  return { user: safeUser };
});
