import { describe, it, expect } from "vitest";
import { translations, t } from "@/lib/i18n";

describe("i18n", () => {
  it("has the exact same set of keys in en and th", () => {
    const enKeys = Object.keys(translations.en).sort();
    const thKeys = Object.keys(translations.th).sort();
    expect(thKeys).toEqual(enKeys);
  });

  it("no translation string is empty", () => {
    for (const lang of ["en", "th"] as const) {
      for (const [key, value] of Object.entries(translations[lang])) {
        expect(value, `${lang}.${key} should not be empty`).not.toBe("");
      }
    }
  });

  it("t() returns the Thai string when lang is th", () => {
    expect(t("th", "logIn")).toBe(translations.th.logIn);
  });

  it("t() falls back to English for any other lang value", () => {
    expect(t("en", "logIn")).toBe(translations.en.logIn);
    expect(t(undefined, "logIn")).toBe(translations.en.logIn);
    expect(t(null, "logIn")).toBe(translations.en.logIn);
    expect(t("fr", "logIn")).toBe(translations.en.logIn);
  });

  it("surfaces the new auth error strings added alongside real login/register", () => {
    for (const key of ["invalidCredentials", "emailAlreadyRegistered", "passwordTooShort"] as const) {
      expect(translations.en[key]).toBeTruthy();
      expect(translations.th[key]).toBeTruthy();
    }
  });
});
