import { z } from "zod";
import { verifyPassword } from "../../lib/auth";
import { ensureMigrated } from "../../utils/migrate";
import { enforceRateLimit } from "../../utils/rateLimit";
import { getDb } from "../../db";
import { pengguna } from "../../db/schema";
import { eq } from "drizzle-orm";

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { windowMs: 60_000, max: 10, key: "auth:login" });
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
  try {
    await setUserSession(event, { user: safeUser } as any);
  } catch (e: any) {
    console.error("[auth/login] setUserSession failed:", e?.message?.slice(0, 300));
    // iron-webcrypto throws "Password string too short" when NUXT_SESSION_PASSWORD <32
    // Surface as 500 with actionable hint (don't leak secret)
    throw createError({
      statusCode: 500,
      message: e?.message?.includes("Password string too short")
        ? "Server misconfigured: NUXT_SESSION_PASSWORD must be >=32 chars (check Netlify env)"
        : `Session error: ${e?.message || "unknown"}`,
    });
  }
  return { user: safeUser };
});
