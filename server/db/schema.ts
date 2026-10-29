import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// pengguna — FR-06, UC-03/04/11
// All users (pelapor, pengurus, admin) in one table; peran distinguishes.
// Spec: §5.4 — id_pengguna PK, nama, surel (unique), kata sandi hash, peran, aktif.
// ---------------------------------------------------------------------------
export const pengguna = sqliteTable(
  "pengguna",
  {
    id: integer("id_pengguna").primaryKey({ autoIncrement: true }),
    nama: text("nama").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(), // bcrypt hash
    peran: text("peran", { enum: ["pelapor", "pengurus", "admin"] }).notNull().default("pelapor"),
    aktif: integer("aktif", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex("pengguna_email_idx").on(t.email)],
);

// ---------------------------------------------------------------------------
// kategori — §5.4
// Jenis permasalahan: fasilitas umum, kebersihan, jalan/saluran, penerangan, keamanan.
// ---------------------------------------------------------------------------
export const kategori = sqliteTable(
  "kategori",
  {
    id: integer("id_kategori").primaryKey({ autoIncrement: true }),
    nama: text("nama").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex("kategori_nama_idx").on(t.nama)],
);

// ---------------------------------------------------------------------------
// pengaduan — FR-01/03/05/08, UC-05/08/09/10 — core entity
// Spec: id_pengaduan PK, id_kategori FK, id_pelapor FK, kode_pelacakan unique,
//       lokasi, deskripsi, status enum(diterima,diproses,selesai), tampil_publik.
// Redundancy noted in §5.4: status denormalized from latest riwayat_status for query speed.
// ---------------------------------------------------------------------------
export const pengaduan = sqliteTable(
  "pengaduan",
  {
    id: integer("id_pengaduan").primaryKey({ autoIncrement: true }),
    kode: text("kode_pelacakan").notNull(), // e.g. LW-2026-0001
    idKategori: integer("id_kategori")
      .notNull()
      .references(() => kategori.id),
    idPelapor: integer("id_pelapor")
      .notNull()
      .references(() => pengguna.id),
    lokasi: text("lokasi").notNull(),
    deskripsi: text("deskripsi").notNull(),
    status: text("status", { enum: ["diterima", "diproses", "selesai"] }).notNull().default("diterima"),
    tampilPublik: integer("tampil_publik", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    uniqueIndex("pengaduan_kode_idx").on(t.kode),
    index("pengaduan_status_idx").on(t.status),
    index("pengaduan_kategori_idx").on(t.idKategori),
    index("pengaduan_pelapor_idx").on(t.idPelapor),
  ],
);

// ---------------------------------------------------------------------------
// lampiran — FR-01, UC-05 — documentation supporting complaint
// File stored in Netlify Blobs [11]; table stores metadata + storage key only.
// ---------------------------------------------------------------------------
export const lampiran = sqliteTable(
  "lampiran",
  {
    id: integer("id_lampiran").primaryKey({ autoIncrement: true }),
    idPengaduan: integer("id_pengaduan")
      .notNull()
      .references(() => pengaduan.id, { onDelete: "cascade" }),
    namaFile: text("nama_file").notNull(),
    kunciStorage: text("kunci_storage").notNull(), // Netlify Blobs key
    mimeType: text("mime_type"),
    ukuran: integer("ukuran"), // bytes
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [index("lampiran_pengaduan_idx").on(t.idPengaduan)],
);

// ---------------------------------------------------------------------------
// pengaturan_publik — FR-07, UC-12 — one row per property that can be toggled
// Spec: §5.4 — id_pengaturan PK, nama_properti unique, tampil_publik.
// Identity fields never included; kode + status are always visible (hard-coded guard).
// ---------------------------------------------------------------------------
export const pengaturanPublik = sqliteTable(
  "pengaturan_publik",
  {
    id: integer("id_pengaturan").primaryKey({ autoIncrement: true }),
    namaProperti: text("nama_properti").notNull(), // e.g. "kategori", "lokasi", "deskripsi"
    tampilPublik: integer("tampil_publik", { mode: "boolean" }).notNull().default(true),
  },
  (t) => [uniqueIndex("pengaturan_properti_idx").on(t.namaProperti)],
);

// ---------------------------------------------------------------------------
// riwayat_status — FR-05, UC-09 — every status change + initial entry
// Spec: id_riwayat PK, id_pengaduan FK, id_pengguna FK (nullable for system entry), status, catatan, time.
// ---------------------------------------------------------------------------
export const riwayatStatus = sqliteTable(
  "riwayat_status",
  {
    id: integer("id_riwayat").primaryKey({ autoIncrement: true }),
    idPengaduan: integer("id_pengaduan")
      .notNull()
      .references(() => pengaduan.id, { onDelete: "cascade" }),
    idPengguna: integer("id_pengguna").references(() => pengguna.id), // null = system (initial)
    status: text("status", { enum: ["diterima", "diproses", "selesai"] }).notNull(),
    catatan: text("catatan"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [index("riwayat_pengaduan_idx").on(t.idPengaduan)],
);
