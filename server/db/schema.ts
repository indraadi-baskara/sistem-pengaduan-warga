import { pgTable, text, integer, boolean, serial, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// pengguna — FR-06, UC-03/04/11
// ---------------------------------------------------------------------------
export const pengguna = pgTable(
  "pengguna",
  {
    id: serial("id_pengguna").primaryKey(),
    nama: text("nama").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    peran: text("peran", { enum: ["pelapor", "pengurus", "admin"] }).notNull().default("pelapor"),
    aktif: boolean("aktif").notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`extract(epoch from now())::int`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`extract(epoch from now())::int`),
  },
  (t) => [uniqueIndex("pengguna_email_idx").on(t.email)],
);

// ---------------------------------------------------------------------------
// kategori — §5.4
// ---------------------------------------------------------------------------
export const kategori = pgTable(
  "kategori",
  {
    id: serial("id_kategori").primaryKey(),
    nama: text("nama").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`extract(epoch from now())::int`),
  },
  (t) => [uniqueIndex("kategori_nama_idx").on(t.nama)],
);

// ---------------------------------------------------------------------------
// pengaduan — FR-01/03/05/08, UC-05/08/09/10
// ---------------------------------------------------------------------------
export const pengaduan = pgTable(
  "pengaduan",
  {
    id: serial("id_pengaduan").primaryKey(),
    kode: text("kode_pelacakan").notNull(),
    idKategori: integer("id_kategori")
      .notNull()
      .references(() => kategori.id),
    idPelapor: integer("id_pelapor")
      .notNull()
      .references(() => pengguna.id),
    lokasi: text("lokasi").notNull(),
    deskripsi: text("deskripsi").notNull(),
    status: text("status", { enum: ["diterima", "diproses", "selesai"] }).notNull().default("diterima"),
    tampilPublik: boolean("tampil_publik").notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`extract(epoch from now())::int`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`extract(epoch from now())::int`),
  },
  (t) => [
    uniqueIndex("pengaduan_kode_idx").on(t.kode),
    index("pengaduan_status_idx").on(t.status),
    index("pengaduan_kategori_idx").on(t.idKategori),
    index("pengaduan_pelapor_idx").on(t.idPelapor),
  ],
);

// ---------------------------------------------------------------------------
// lampiran — FR-01, UC-05
// ---------------------------------------------------------------------------
export const lampiran = pgTable(
  "lampiran",
  {
    id: serial("id_lampiran").primaryKey(),
    idPengaduan: integer("id_pengaduan")
      .notNull()
      .references(() => pengaduan.id, { onDelete: "cascade" }),
    namaFile: text("nama_file").notNull(),
    kunciStorage: text("kunci_storage").notNull(),
    mimeType: text("mime_type"),
    ukuran: integer("ukuran"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`extract(epoch from now())::int`),
  },
  (t) => [index("lampiran_pengaduan_idx").on(t.idPengaduan)],
);

// ---------------------------------------------------------------------------
// file_store — backing for lampiran when Netlify Blobs unavailable (prod fix)
// Stores base64 to survive ephemeral Functions filesystem.
// ---------------------------------------------------------------------------
export const fileStore = pgTable(
  "file_store",
  {
    kunciStorage: text("kunci_storage").primaryKey(),
    dataBase64: text("data_base64").notNull(),
    mimeType: text("mime_type"),
    ukuran: integer("ukuran"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`extract(epoch from now())::int`),
  },
);

// ---------------------------------------------------------------------------
// pengaturan_publik — FR-07, UC-12
// ---------------------------------------------------------------------------
export const pengaturanPublik = pgTable(
  "pengaturan_publik",
  {
    id: serial("id_pengaturan").primaryKey(),
    namaProperti: text("nama_properti").notNull(),
    tampilPublik: boolean("tampil_publik").notNull().default(true),
  },
  (t) => [uniqueIndex("pengaturan_properti_idx").on(t.namaProperti)],
);

// ---------------------------------------------------------------------------
// riwayat_status — FR-05, UC-09
// ---------------------------------------------------------------------------
export const riwayatStatus = pgTable(
  "riwayat_status",
  {
    id: serial("id_riwayat").primaryKey(),
    idPengaduan: integer("id_pengaduan")
      .notNull()
      .references(() => pengaduan.id, { onDelete: "cascade" }),
    idPengguna: integer("id_pengguna").references(() => pengguna.id),
    status: text("status", { enum: ["diterima", "diproses", "selesai"] }).notNull(),
    catatan: text("catatan"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`extract(epoch from now())::int`),
  },
  (t) => [index("riwayat_pengaduan_idx").on(t.idPengaduan)],
);
