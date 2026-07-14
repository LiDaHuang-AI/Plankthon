// Server-only helper for real (non-mock) email/password accounts.
//
// Storage strategy mirrors userCount.ts:
//   1. Upstash Redis (REST) when configured — persistent, works on Vercel serverless.
//   2. A local JSON file (.data/accounts.json) for `next dev`.
//   3. An in-memory map as a last resort if the filesystem is read-only and
//      Upstash isn't configured. Accounts won't survive a restart in that case,
//      so a warning is logged once in production.
//
// Passwords are never stored in plaintext: each is hashed with scrypt and a
// per-account random salt (Node's built-in crypto, no extra dependency).

import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

type Account = { passwordHash: string; name: string; createdAt: string };

const KEY = "plankthon:accounts";
const FILE = path.join(process.cwd(), ".data", "accounts.json");

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

if (!useUpstash && process.env.NODE_ENV === "production") {
  console.warn(
    "[authStore] UPSTASH_REDIS_REST_URL/TOKEN not set in production — " +
    "accounts will be stored on the local filesystem (or in memory if that " +
    "isn't writable) and may not persist across deployments/instances."
  );
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(password, salt, 64);
  if (actual.length !== expected.length) return false;
  return crypto.timingSafeEqual(actual, expected);
}

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

// Last-resort store, used only if the filesystem isn't writable and Upstash
// isn't configured. Not persistent across serverless invocations.
const memory = new Map<string, Account>();

async function readAll(): Promise<Map<string, Account>> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return new Map(Object.entries(JSON.parse(raw) as Record<string, Account>));
  } catch {
    return new Map(memory);
  }
}

async function writeAll(map: Map<string, Account>): Promise<void> {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(Object.fromEntries(map)), "utf8");
  } catch {
    map.forEach((v, k) => memory.set(k, v));
  }
}

export type AuthResult =
  | { ok: true; email: string; name: string }
  | { ok: false; error: "exists" | "invalid" };

export async function registerAccount(
  email: string,
  password: string,
  name: string
): Promise<AuthResult> {
  const key = normalizeEmail(email);
  const passwordHash = hashPassword(password);
  const account: Account = { passwordHash, name, createdAt: new Date().toISOString() };

  if (useUpstash) {
    await upstash(["HSET", KEY, key, JSON.stringify(account)]);
    return { ok: true, email: key, name };
  }

  const map = await readAll();
  map.set(key, account);
  await writeAll(map);
  return { ok: true, email: key, name };
}

export async function verifyAccount(email: string, password: string): Promise<AuthResult> {
  const key = normalizeEmail(email);

  let account: Account | undefined;
  if (useUpstash) {
    const raw = await upstash(["HGET", KEY, key]);
    if (typeof raw === "string") account = JSON.parse(raw) as Account;
  } else {
    const map = await readAll();
    account = map.get(key);
  }

  if (!account || !verifyPassword(password, account.passwordHash)) {
    return { ok: false, error: "invalid" };
  }
  return { ok: true, email: key, name: account.name };
}
