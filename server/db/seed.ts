import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { hashPassword } from "../lib/auth";
import { eq } from "drizzle-orm";

function sanitizeDbUrl(url: string): string {
  let u = url.trim();
  if ((u.startsWith('"') && u.endsWith('"')) || (u.startsWith("'") && u.endsWith("'"))) u = u.slice(1, -1);
  if (!u.includes("channel_binding")) return u;
  try {
    const parsed = new URL(u);
    parsed.searchParams.delete("channel_binding");
    return parsed.toString();
  } catch {
    return u.replace(/[&?]channel_binding=[^&]*/g, "").replace(/\?&/, "?");
  }
}

const rawUrl = process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL;
if (!rawUrl) {
  console.error("[seed] Missing DATABASE_URL (set NUXT_DATABASE_URL or DATABASE_URL)");
  process.exit(1);
}
const url = sanitizeDbUrl(rawUrl);

async function main() {
  const client = neon(url);
  const db = drizzle(client as any, { schema });

  console.log(`[seed] connecting to ${url!.replace(/:[^:@/]*@/, ":***@").slice(0, 80)}`);

  const defaultKategori = [
    "Fasilitas Umum",
    "Kebersihan Lingkungan",
    "Jalan dan Saluran Air",
    "Penerangan",
    "Keamanan",
    "Lainnya",
  ];
  for (const nama of defaultKategori) {
    try {
      await db.insert(schema.kategori).values({ nama }).onConflictDoNothing();
    } catch (e: any) {
      console.warn(`[seed] kategori '${nama}' warn:`, e.message?.slice(0, 120));
    }
  }
  console.log(`[seed] kategori: ${defaultKategori.length} ensured`);

  const defaultProps: Array<[string, boolean]> = [
    ["kategori", true],
    ["lokasi", true],
    ["deskripsi", true],
    ["lampiran", true],
    ["riwayat", true],
  ];
  for (const [namaProperti, tampilPublik] of defaultProps) {
    try {
      await db.insert(schema.pengaturanPublik).values({ namaProperti, tampilPublik }).onConflictDoNothing();
    } catch (e: any) {
      console.warn(`[seed] pengaturan '${namaProperti}' warn:`, e.message?.slice(0, 120));
    }
  }
  console.log(`[seed] pengaturan_publik: ${defaultProps.length} ensured`);

  const adminEmail = (process.env.SEED_ADMIN_EMAIL || "admin@laporwarga.local").toLowerCase();
  const adminPass = process.env.SEED_ADMIN_PASSWORD || "Admin123!";
  const existing = await db.select().from(schema.pengguna).where(eq(schema.pengguna.email, adminEmail));
  if (!existing.length) {
    const pwHash = await hashPassword(adminPass);
    await db.insert(schema.pengguna).values({
      nama: "Administrator",
      email: adminEmail,
      password: pwHash,
      peran: "admin",
      aktif: true,
    });
    console.log(`[seed] admin created: ${adminEmail} / ${adminPass}`);
  } else {
    console.log(`[seed] admin exists: ${adminEmail}`);
  }

  const pengurusEmail = "pengurus@laporwarga.local";
  const pengurusExisting = await db.select().from(schema.pengguna).where(eq(schema.pengguna.email, pengurusEmail));
  if (!pengurusExisting.length) {
    const pwHash = await hashPassword("Pengurus123!");
    await db.insert(schema.pengguna).values({
      nama: "Pengurus Wilayah",
      email: pengurusEmail,
      password: pwHash,
      peran: "pengurus",
      aktif: true,
    });
    console.log(`[seed] pengurus created: ${pengurusEmail} / Pengurus123!`);
  }

  console.log("[seed] done");
}

main().catch((e) => {
  console.error("[seed] failed:", e);
  process.exit(1);
});
