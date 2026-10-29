export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url.pathname.startsWith("/api/")) return;
  try {
    const session = (await getUserSession(event)) as any;
    if (session?.user) (event.context as any).auth = { user: session.user, session };
  } catch {}
});
