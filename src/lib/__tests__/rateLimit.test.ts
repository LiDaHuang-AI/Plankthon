import { describe, it, expect } from "vitest";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

// Uses the in-memory fallback (no Upstash env vars set in tests). Each test
// uses a unique key so windows never collide across tests.
const uniqueKey = (label: string) => `${label}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

describe("rateLimit", () => {
  it("allows requests under the limit", async () => {
    const key = uniqueKey("under");
    const first = await rateLimit(key, 3, 60);
    const second = await rateLimit(key, 3, 60);
    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(second.remaining).toBe(1);
  });

  it("blocks requests once the limit is exceeded within the window", async () => {
    const key = uniqueKey("over");
    await rateLimit(key, 2, 60);
    await rateLimit(key, 2, 60);
    const third = await rateLimit(key, 2, 60);
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });

  it("tracks separate callers independently", async () => {
    const keyA = uniqueKey("caller-a");
    const keyB = uniqueKey("caller-b");
    await rateLimit(keyA, 1, 60);
    const bFirst = await rateLimit(keyB, 1, 60);
    expect(bFirst.allowed).toBe(true);
  });

  it("resets once the window has elapsed", async () => {
    const key = uniqueKey("reset");
    const first = await rateLimit(key, 1, 1); // 1-second window
    expect(first.allowed).toBe(true);
    await new Promise((r) => setTimeout(r, 1100));
    const afterReset = await rateLimit(key, 1, 1);
    expect(afterReset.allowed).toBe(true);
  });
});

describe("getClientIp", () => {
  it("takes the first address from x-forwarded-for", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.4, 10.0.0.1" },
    });
    expect(getClientIp(req)).toBe("203.0.113.4");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const req = new Request("http://localhost", {
      headers: { "x-real-ip": "198.51.100.7" },
    });
    expect(getClientIp(req)).toBe("198.51.100.7");
  });

  it("falls back to 'unknown' when no IP headers are present", () => {
    const req = new Request("http://localhost");
    expect(getClientIp(req)).toBe("unknown");
  });
});
