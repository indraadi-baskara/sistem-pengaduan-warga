CREATE TABLE `kategori` (
	`id_kategori` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nama` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `kategori_nama_idx` ON `kategori` (`nama`);--> statement-breakpoint
CREATE TABLE `lampiran` (
	`id_lampiran` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_pengaduan` integer NOT NULL,
	`nama_file` text NOT NULL,
	`kunci_storage` text NOT NULL,
	`mime_type` text,
	`ukuran` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`id_pengaduan`) REFERENCES `pengaduan`(`id_pengaduan`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `lampiran_pengaduan_idx` ON `lampiran` (`id_pengaduan`);--> statement-breakpoint
CREATE TABLE `pengaduan` (
	`id_pengaduan` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kode_pelacakan` text NOT NULL,
	`id_kategori` integer NOT NULL,
	`id_pelapor` integer NOT NULL,
	`lokasi` text NOT NULL,
	`deskripsi` text NOT NULL,
	`status` text DEFAULT 'diterima' NOT NULL,
	`tampil_publik` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id_kategori`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_pelapor`) REFERENCES `pengguna`(`id_pengguna`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pengaduan_kode_idx` ON `pengaduan` (`kode_pelacakan`);--> statement-breakpoint
CREATE INDEX `pengaduan_status_idx` ON `pengaduan` (`status`);--> statement-breakpoint
CREATE INDEX `pengaduan_kategori_idx` ON `pengaduan` (`id_kategori`);--> statement-breakpoint
CREATE INDEX `pengaduan_pelapor_idx` ON `pengaduan` (`id_pelapor`);--> statement-breakpoint
CREATE TABLE `pengaturan_publik` (
	`id_pengaturan` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nama_properti` text NOT NULL,
	`tampil_publik` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pengaturan_properti_idx` ON `pengaturan_publik` (`nama_properti`);--> statement-breakpoint
CREATE TABLE `pengguna` (
	`id_pengguna` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nama` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`peran` text DEFAULT 'pelapor' NOT NULL,
	`aktif` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pengguna_email_idx` ON `pengguna` (`email`);--> statement-breakpoint
CREATE TABLE `riwayat_status` (
	`id_riwayat` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_pengaduan` integer NOT NULL,
	`id_pengguna` integer,
	`status` text NOT NULL,
	`catatan` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`id_pengaduan`) REFERENCES `pengaduan`(`id_pengaduan`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna`(`id_pengguna`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `riwayat_pengaduan_idx` ON `riwayat_status` (`id_pengaduan`);