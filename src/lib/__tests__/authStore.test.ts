import { describe, it, expect, afterAll } from "vitest";
import { promises as fs } from "fs";
import path from "path";
import { registerAccount, verifyAccount } from "@/lib/authStore";

// Uses the local-JSON-file storage tier (no Upstash env vars set in tests).
// Emails are unique per test run so this never collides with real dev data.
// Cleanup only deletes the specific keys this file created — the accounts
// file is shared with real dev/prod data, so it must never be wiped wholesale.
const ACCOUNTS_FILE = path.join(process.cwd(), ".data", "accounts.json");
const createdEmails: string[] = [];
const unique = (label: string) => {
  const email = `${label}-${Date.now()}-${Math.random().toString(36).slice(2)}@test.local`;
  createdEmails.push(email.toLowerCase());
  return email;
};

afterAll(async () => {
  try {
    const raw = await fs.readFile(ACCOUNTS_FILE, "utf8");
    const accounts = JSON.parse(raw) as Record<string, unknown>;
    for (const email of createdEmails) delete accounts[email];
    await fs.writeFile(ACCOUNTS_FILE, JSON.stringify(accounts), "utf8");
  } catch {
    // File doesn't exist or is unreadable — nothing to clean up.
  }
});

describe("authStore", () => {
  it("registers a new account and can verify the correct password", async () => {
    const email = unique("register");
    const reg = await registerAccount(email, "correct-horse-battery", "Ada");
    expect(reg.ok).toBe(true);

    const login = await verifyAccount(email, "correct-horse-battery");
    expect(login).toEqual({ ok: true, email: email.toLowerCase(), name: "Ada" });
  });

  it("rejects login with the wrong password", async () => {
    const email = unique("wrongpass");
    await registerAccount(email, "correct-horse-battery", "Ada");

    const login = await verifyAccount(email, "totally-wrong");
    expect(login).toEqual({ ok: false, error: "invalid" });
  });

  it("rejects login for an email that was never registered", async () => {
    const login = await verifyAccount(unique("never-registered"), "whatever123");
    expect(login).toEqual({ ok: false, error: "invalid" });
  });

  it("rejects a second registration with the same email", async () => {
    const email = unique("dupe");
    await registerAccount(email, "first-password", "Ada");

    const second = await registerAccount(email, "second-password", "Bea");
    expect(second).toEqual({ ok: false, error: "exists" });
  });

  it("treats emails as case-insensitive and trims whitespace", async () => {
    const email = unique("case");
    await registerAccount(email.toUpperCase(), "case-pw-12345", "Ada");

    const login = await verifyAccount(`  ${email}  `, "case-pw-12345");
    expect(login.ok).toBe(true);
  });

  it("never stores the password itself in the account record", async () => {
    const email = unique("nostore");
    await registerAccount(email, "super-secret-password", "Ada");

    const raw = await fs.readFile(ACCOUNTS_FILE, "utf8");
    expect(raw).not.toContain("super-secret-password");
  });
});
