// Simple fixed-window rate limiter for public, unauthenticated API routes
// (e.g. /api/planky) so a single visitor or script can't hammer a paid
// upstream API and burn through everyone else's quota.
//
// Storage strategy mirrors userCount.ts / authStore.ts:
//   1. Upstash Redis (REST) when configured — shared across all serverless
//      instances, so the limit is enforced correctly in production.
//   2. An in-memory Map fallback for `next dev` (or if Upstash isn't
//      configured) — per-instance only, but keeps the endpoint usable.

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

async function upstash(command: (string | number)[]): Promise<unknown> {
  const res = await fetch(UPSTASH_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash error ${res.status}`);
  const data = (await res.json()) as { result: unknown };
  return data.result;
}

const memoryWindows = new Map<string, { count: number; resetAt: number }>();

export type RateLimitResult = { allowed: boolean; remaining: number; resetSeconds: number };

// `key` should already identify both the caller and the route (e.g.
// "planky:203.0.113.4") so different endpoints don't share a budget.
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  if (useUpstash) {
    const redisKey = `ratelimit:${key}`;
    const count = Number(await upstash(["INCR", redisKey]));
    if (count === 1) {
      await upstash(["EXPIRE", redisKey, windowSeconds]);
    }
    const ttl = count === 1 ? windowSeconds : Number(await upstash(["TTL", redisKey]));
    return { allowed: count <= limit, remaining: Math.max(0, limit - count), resetSeconds: Math.max(ttl, 0) };
  }

  const now = Date.now();
  const existing = memoryWindows.get(key);
  if (!existing || existing.resetAt <= now) {
    memoryWindows.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, remaining: limit - 1, resetSeconds: windowSeconds };
  }
  existing.count += 1;
  return {
    allowed: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    resetSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
}

// Vercel/most proxies set x-forwarded-for to "client, proxy1, proxy2".
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
