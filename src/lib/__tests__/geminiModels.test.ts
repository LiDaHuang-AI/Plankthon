import { describe, it, expect } from "vitest";
import { GEMINI_MODELS } from "@/lib/geminiModels";

describe("GEMINI_MODELS", () => {
  it("is non-empty and has no duplicates", () => {
    expect(GEMINI_MODELS.length).toBeGreaterThan(0);
    expect(new Set(GEMINI_MODELS).size).toBe(GEMINI_MODELS.length);
  });

  it("only contains real, published Gemini model ids (no 3.x — doesn't exist)", () => {
    for (const model of GEMINI_MODELS) {
      expect(model).toMatch(/^gemini-(1\.5|2\.0|2\.5)-(flash|pro)(-\d+)?$/);
    }
  });

  it("does not regress to the invented gemini-3.5-flash id", () => {
    expect(GEMINI_MODELS).not.toContain("gemini-3.5-flash");
  });
});
