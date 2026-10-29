/**
 * Simple in-memory sliding-window rate limiter for serverless.
 * Per-instance only (Netlify Functions are ephemeral), but sufficient
 * as first line of defence against brute-force / enumeration.
 */
const buckets = new Map<string, number[]>();

export interface RateLimitOpts {
  /** window in ms */
  windowMs: number;
  /** max requests per window */
  max: number;
  /** key generator — defaults to IP */
  key?: string;
}

export function checkRateLimit(event: any, opts: RateLimitOpts): boolean {
  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  const key = opts.key ? `${opts.key}:${ip}` : ip;
  const now = Date.now();
  const windowStart = now - opts.windowMs;

  let hits = buckets.get(key) || [];
  hits = hits.filter((t) => t > windowStart);

  if (hits.length >= opts.max) {
    buckets.set(key, hits);
    return false; // limited
  }

  hits.push(now);
  buckets.set(key, hits);

  // opportunistic cleanup every ~100 keys
  if (buckets.size > 500) {
    for (const [k, v] of buckets) {
      if (v.length === 0 || v[v.length - 1]! < windowStart) buckets.delete(k);
    }
  }

  return true;
}

export function enforceRateLimit(event: any, opts: RateLimitOpts) {
  if (!checkRateLimit(event, opts)) {
    throw createError({
      statusCode: 429,
      message: "Too many requests — please try again later",
    });
  }
}
