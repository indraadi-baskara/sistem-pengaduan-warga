/**
 * Debug endpoint to verify runtime env without leaking secrets.
 * Publicly readable — only reports presence/length, never values.
 * Delete after diagnosing prod 500.
 */
export default defineEventHandler(() => {
  const cfg = (() => {
    try {
      return useRuntimeConfig() as any;
    } catch {
      return {};
    }
  })();
  const dbUrl = cfg.databaseUrl || process.env.NUXT_DATABASE_URL || process.env.DATABASE_URL || "";
  const sessPw = cfg.session?.password || cfg.sessionPassword || process.env.NUXT_SESSION_PASSWORD || process.env.BETTER_AUTH_SECRET || "";

  return {
    runtimeConfig: {
      databaseUrlPresent: !!cfg.databaseUrl,
      sessionPasswordPresent: !!(cfg.session?.password || cfg.sessionPassword),
      sessionPasswordLen: String(cfg.session?.password || cfg.sessionPassword || "").length,
    },
    processEnv: {
      NUXT_DATABASE_URL_present: !!process.env.NUXT_DATABASE_URL,
      NUXT_DATABASE_URL_len: String(process.env.NUXT_DATABASE_URL || "").length,
      NUXT_SESSION_PASSWORD_present: !!process.env.NUXT_SESSION_PASSWORD,
      NUXT_SESSION_PASSWORD_len: String(process.env.NUXT_SESSION_PASSWORD || "").length,
      DATABASE_URL_present: !!process.env.DATABASE_URL,
    },
    derived: {
      dbUrlLen: String(dbUrl).length,
      sessionPasswordLen: String(sessPw).length,
      sessionPasswordOk: String(sessPw).length >= 32,
    },
  };
});
