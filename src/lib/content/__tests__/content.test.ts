import { describe, it, expect } from "vitest";
import { lessons } from "@/lib/content/lessons";
import { challenges } from "@/lib/content/challenges";

describe("lessons content", () => {
  it("has unique lesson ids", () => {
    const ids = lessons.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every lesson has at least one page", () => {
    for (const lesson of lessons) {
      expect(lesson.pages.length, `lesson ${lesson.id} has no pages`).toBeGreaterThan(0);
    }
  });
});

describe("challenges content", () => {
  it("has unique challenge ids", () => {
    const ids = challenges.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique question ids within each challenge", () => {
    for (const challenge of challenges) {
      const ids = challenge.questions.map((q) => q.id);
      expect(new Set(ids).size, `duplicate question id within ${challenge.id}`).toBe(ids.length);
    }
  });

  it("multiple-choice questions have a correctIndex within bounds", () => {
    for (const challenge of challenges) {
      for (const q of challenge.questions) {
        if (q.type === "multiple-choice") {
          expect(q.correctIndex, `${challenge.id}/${q.id} correctIndex`).toBeGreaterThanOrEqual(0);
          expect(q.correctIndex, `${challenge.id}/${q.id} correctIndex`).toBeLessThan(q.options.length);
        }
      }
    }
  });

  it("coding questions declare at least one test", () => {
    for (const challenge of challenges) {
      for (const q of challenge.questions) {
        if (q.type === "coding") {
          expect(q.tests.length, `${challenge.id}/${q.id} has no tests`).toBeGreaterThan(0);
        }
      }
    }
  });
});
