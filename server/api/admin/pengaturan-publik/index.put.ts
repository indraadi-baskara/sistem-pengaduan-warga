import { z } from "zod";
import { getDb } from "../../../db";
import { pengaturanPublik } from "../../../db/schema";
import { requireAdmin } from "../../../utils/auth";
import { TOGGLEABLE_PROPS } from "../../../utils/visibility";
import { eq } from "drizzle-orm";

// Body: { namaProperti, tampilPublik }
const Body = z.object({
  namaProperti: z.string().min(1),
  tampilPublik: z.boolean(),
});

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const { namaProperti, tampilPublik } = Body.parse(await readBody(event));

  // Spec UC-12 alternate: kode/status are never in toggle list; identity never exposed
  if (!(TOGGLEABLE_PROPS as readonly string[]).includes(namaProperti)) {
    throw createError({ statusCode: 400, message: `Property '${namaProperti}' is not configurable. Allowed: ${TOGGLEABLE_PROPS.join(", ")}` });
  }

  const db = getDb();
  const [updated] = await db
    .update(pengaturanPublik)
    .set({ namaProperti, tampilPublik })
    .where(eq(pengaturanPublik.namaProperti, namaProperti))
    .returning();

  if (!updated) throw createError({ statusCode: 404, message: "Property not found" });
  return updated;
});
