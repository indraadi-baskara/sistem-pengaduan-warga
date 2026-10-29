/**
 * Request logging + X-Request-Id for observability.
 * Runs before auth middleware (alphabetical: request-log < auth).
 */
export default defineEventHandler((event) => {
  const start = Date.now();
  const url = getRequestURL(event);
  // Only log API requests to avoid noise
  if (!url.pathname.startsWith("/api/")) return;

  const reqId = `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  (event.context as any).reqId = reqId;
  setHeader(event, "X-Request-Id", reqId);

  (event.context as any)["_start"] = start;

  // Log on finish via hook
  event.node.res.on("finish", () => {
    const ms = Date.now() - start;
    const status = event.node.res.statusCode;
    // Structured log for Netlify log drain
    console.log(
      JSON.stringify({
        reqId,
        method: event.method,
        path: url.pathname,
        status,
        ms,
        ip: getRequestIP(event, { xForwardedFor: true }),
      }),
    );
  });
});
