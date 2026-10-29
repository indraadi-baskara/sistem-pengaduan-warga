// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  components: [{ path: "~/components", pathPrefix: false }],
  vite: {
    plugins: [tailwindcss() as any],
  },
  nitro: {
    preset: process.env.NETLIFY ? "netlify" : undefined,
    experimental: { openAPI: true },
    serverAssets: [{ baseName: "migrations", dir: "server/db/migrations" }],
  },
  runtimeConfig: {
    // Secrets NEVER inlined — read from NUXT_* env at runtime via Nitro
    // DB: NUXT_DATABASE_URL (Turso/libSQL URL) or DATABASE_URL fallback
    // Local: file:./data/lapor.db is used when no env is set (see server/db/index.ts)
    databaseUrl: "",
    session: { password: "" },
  },
  experimental: { appManifest: false },
  modules: ["@nuxt/icon", "@nuxt/image", "nuxt-auth-utils"],
  compatibilityDate: "2024-12-18",
});
