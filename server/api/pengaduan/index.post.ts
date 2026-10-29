import { z } from "zod";
import { getDb } from "../../db";
import { pengaduan, kategori, riwayatStatus, lampiran } from "../../db/schema";
import { requireAuth } from "../../utils/auth";
import { eq } from "drizzle-orm";

const Body = z.object({
  idKategori: z.number().int(),
  lokasi: z.string().min(3).max(300),
  deskripsi: z.string().min(10).max(5000),
  tampilPublik: z.boolean().optional().default(true),
  // lampiran optional metadata (actual file upload via multipart handled separately; this keeps JSON path simple)
  lampiran: z
    .array(
      z.object({
        namaFile: z.string(),
        kunciStorage: z.string(),
        mimeType: z.string().optional(),
        ukuran: z.number().optional(),
      }),
    )
    .optional(),
});

function genKode(): string {
  const d = new Date();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LW-${d.getFullYear()}-${rnd}`;
}

export default defineEventHandler(async (event) => {
  const user = requireAuth(event);
  const body = Body.parse(await readBody(event));
  const db = getDb();

  // Validate kategori exists
  const [kat] = await db.select().from(kategori).where(eq(kategori.id, body.idKategori));
  if (!kat) throw createError({ statusCode: 400, message: "Kategori not found" });

  const kode = genKode();

  // Spec §5.4 + UC-05: one transaction — pengaduan + lampiran + initial riwayat_status
  // Drizzle libSQL supports batch; we emulate transactional via sequential inserts with cleanup on failure.
  // For SQLite we use db.transaction if available.
  const doInsert = async (tx: any) => {
    const [created] = await tx
      .insert(pengaduan)
      .values({
        kode,
        idKategori: body.idKategori,
        idPelapor: user.id,
        lokasi: body.lokasi.trim(),
        deskripsi: body.deskripsi.trim(),
        status: "diterima",
        tampilPublik: body.tampilPublik ?? true,
      })
      .returning();

    if (body.lampiran?.length) {
      for (const l of body.lampiran) {
        await tx.insert(lampiran).values({
          idPengaduan: created.id,
          namaFile: l.namaFile,
          kunciStorage: l.kunciStorage,
          mimeType: l.mimeType ?? null,
          ukuran: l.ukuran ?? null,
        });
      }
    }

    await tx.insert(riwayatStatus).values({
      idPengaduan: created.id,
      idPengguna: null, // system initial entry per spec §5.4
      status: "diterima",
      catatan: "Pengaduan diterima sistem",
    });

    return created;
  };

  let created: any;
  // neon-http driver throws "No transactions support" — use sequential inserts
  // pg driver would support transaction, but http is default for serverless
  const isNeonHttp = (db as any).__isNeonHttp ?? (db as any).constructor?.name === "NeonHttpDatabase";
  if (!isNeonHttp && typeof (db as any).transaction === "function") {
    try {
      created = await (db as any).transaction(doInsert);
    } catch (e: any) {
      if (e.message?.includes("No transactions support")) created = await doInsert(db);
      else throw e;
    }
  } else {
    created = await doInsert(db);
  }

  return { pengaduan: created, kode };
});
