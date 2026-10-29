import { requireAuth } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const user = requireAuth(event);
  return { user };
});
