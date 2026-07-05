// Server-only helper that tracks the number of unique registered users.
//
// Storage strategy (chosen automatically):
//   1. Upstash Redis (REST) when UPSTASH_REDIS_REST_URL + _TOKEN are set —
//      persistent, works on Vercel serverless. This is the production path.
//   2. A local JSON file (.data/users.json) for `next dev`, so counting works
//      out of the box with no setup.
//   3. An in-memory set as a last resort if the filesystem is read-only and
//      Upstash isn't configured, so requests never fail.
//
// Emails are stored only as SHA-256 hashes, so the count reflects unique users
// without persisting raw email addresses.

import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

const KEY = "plankthon:users";
const FILE = path.join(process.cwd(), ".data", "users.json");

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

if (!useUpstash && process.env.NODE_ENV === "production") {
  console.warn(
    "[userCount] UPSTASH_REDIS_REST_URL/TOKEN not set in production — the " +
    "user count will fall back to the local filesystem (or in-memory, which " +
    "resets per instance) instead of a persistent store."
  );
}

function hashEmail(email: string): string {
  return crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
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
// isn't configured. Not persistent across serverless invocations, but keeps
// the endpoint from failing.
const memory = new Set<string>();

async function readSet(): Promise<Set<string>> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set(memory);
  }
}

async function writeSet(set: Set<string>): Promise<void> {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify([...set]), "utf8");
  } catch {
    set.forEach((h) => memory.add(h));
  }
}

export async function addUser(email: string): Promise<number> {
  const h = hashEmail(email);
  if (useUpstash) {
    await upstash(["SADD", KEY, h]);
    return Number(await upstash(["SCARD", KEY]));
  }
  const set = await readSet();
  set.add(h);
  await writeSet(set);
  return set.size;
}

export async function getUserCount(): Promise<number> {
  if (useUpstash) {
    return Number(await upstash(["SCARD", KEY]));
  }
  const set = await readSet();
  return set.size;
}
