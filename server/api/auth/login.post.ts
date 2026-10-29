import { z } from "zod";
import { verifyPassword } from "../../lib/auth";
import { ensureMigrated } from "../../utils/migrate";
import { getDb } from "../../db";
import { pengguna } from "../../db/schema";
import { eq } from "drizzle-orm";

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  await ensureMigrated();
  const body = Body.parse(await readBody(event));
  const db = getDb();
  const normalized = body.email.trim().toLowerCase();

  const [u] = await db.select().from(pengguna).where(eq(pengguna.email, normalized));
  if (!u) throw createError({ statusCode: 401, message: "Invalid email or password" });
  if (!u.aktif) throw createError({ statusCode: 403, message: "Account deactivated — contact admin" });

  const ok = await verifyPassword(body.password, u.password);
  if (!ok) throw createError({ statusCode: 401, message: "Invalid email or password" });

  const safeUser = { id: u.id, nama: u.nama, email: u.email, peran: u.peran };
  await setUserSession(event, { user: safeUser } as any);
  return { user: safeUser };
});
