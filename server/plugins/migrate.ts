import { ensureMigrated } from "../utils/migrate";

export default defineNitroPlugin(async () => {
  ensureMigrated().catch((e) => console.error("[migrate] background failed", e));
});
