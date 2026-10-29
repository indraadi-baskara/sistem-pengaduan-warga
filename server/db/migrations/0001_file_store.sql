CREATE TABLE "file_store" (
	"kunci_storage" text PRIMARY KEY NOT NULL,
	"data_base64" text NOT NULL,
	"mime_type" text,
	"ukuran" integer,
	"created_at" integer DEFAULT extract(epoch from now())::int NOT NULL
);
