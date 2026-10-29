CREATE TABLE "kategori" (
	"id_kategori" serial PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"created_at" integer DEFAULT extract(epoch from now())::int NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lampiran" (
	"id_lampiran" serial PRIMARY KEY NOT NULL,
	"id_pengaduan" integer NOT NULL,
	"nama_file" text NOT NULL,
	"kunci_storage" text NOT NULL,
	"mime_type" text,
	"ukuran" integer,
	"created_at" integer DEFAULT extract(epoch from now())::int NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pengaduan" (
	"id_pengaduan" serial PRIMARY KEY NOT NULL,
	"kode_pelacakan" text NOT NULL,
	"id_kategori" integer NOT NULL,
	"id_pelapor" integer NOT NULL,
	"lokasi" text NOT NULL,
	"deskripsi" text NOT NULL,
	"status" text DEFAULT 'diterima' NOT NULL,
	"tampil_publik" boolean DEFAULT true NOT NULL,
	"created_at" integer DEFAULT extract(epoch from now())::int NOT NULL,
	"updated_at" integer DEFAULT extract(epoch from now())::int NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pengaturan_publik" (
	"id_pengaturan" serial PRIMARY KEY NOT NULL,
	"nama_properti" text NOT NULL,
	"tampil_publik" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pengguna" (
	"id_pengguna" serial PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"peran" text DEFAULT 'pelapor' NOT NULL,
	"aktif" boolean DEFAULT true NOT NULL,
	"created_at" integer DEFAULT extract(epoch from now())::int NOT NULL,
	"updated_at" integer DEFAULT extract(epoch from now())::int NOT NULL
);
--> statement-breakpoint
CREATE TABLE "riwayat_status" (
	"id_riwayat" serial PRIMARY KEY NOT NULL,
	"id_pengaduan" integer NOT NULL,
	"id_pengguna" integer,
	"status" text NOT NULL,
	"catatan" text,
	"created_at" integer DEFAULT extract(epoch from now())::int NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lampiran" ADD CONSTRAINT "lampiran_id_pengaduan_pengaduan_id_pengaduan_fk" FOREIGN KEY ("id_pengaduan") REFERENCES "public"."pengaduan"("id_pengaduan") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pengaduan" ADD CONSTRAINT "pengaduan_id_kategori_kategori_id_kategori_fk" FOREIGN KEY ("id_kategori") REFERENCES "public"."kategori"("id_kategori") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pengaduan" ADD CONSTRAINT "pengaduan_id_pelapor_pengguna_id_pengguna_fk" FOREIGN KEY ("id_pelapor") REFERENCES "public"."pengguna"("id_pengguna") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "riwayat_status" ADD CONSTRAINT "riwayat_status_id_pengaduan_pengaduan_id_pengaduan_fk" FOREIGN KEY ("id_pengaduan") REFERENCES "public"."pengaduan"("id_pengaduan") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "riwayat_status" ADD CONSTRAINT "riwayat_status_id_pengguna_pengguna_id_pengguna_fk" FOREIGN KEY ("id_pengguna") REFERENCES "public"."pengguna"("id_pengguna") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "kategori_nama_idx" ON "kategori" USING btree ("nama");--> statement-breakpoint
CREATE INDEX "lampiran_pengaduan_idx" ON "lampiran" USING btree ("id_pengaduan");--> statement-breakpoint
CREATE UNIQUE INDEX "pengaduan_kode_idx" ON "pengaduan" USING btree ("kode_pelacakan");--> statement-breakpoint
CREATE INDEX "pengaduan_status_idx" ON "pengaduan" USING btree ("status");--> statement-breakpoint
CREATE INDEX "pengaduan_kategori_idx" ON "pengaduan" USING btree ("id_kategori");--> statement-breakpoint
CREATE INDEX "pengaduan_pelapor_idx" ON "pengaduan" USING btree ("id_pelapor");--> statement-breakpoint
CREATE UNIQUE INDEX "pengaturan_properti_idx" ON "pengaturan_publik" USING btree ("nama_properti");--> statement-breakpoint
CREATE UNIQUE INDEX "pengguna_email_idx" ON "pengguna" USING btree ("email");--> statement-breakpoint
CREATE INDEX "riwayat_pengaduan_idx" ON "riwayat_status" USING btree ("id_pengaduan");