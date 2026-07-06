import { NextResponse } from "next/server";
import { GEMINI_MODELS } from "@/lib/geminiModels";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

// Public endpoint, no auth required — cap per-IP usage so one visitor (or a
// script) can't burn through the shared Gemini quota for everyone else.
const RATE_LIMIT = 15;
const RATE_WINDOW_SECONDS = 5 * 60;

export async function POST(req: Request) {
  try {
    const { message, history = [], language = 'en' } = await req.json();

    const ip = getClientIp(req);
    const { allowed, resetSeconds } = await rateLimit(`planky:${ip}`, RATE_LIMIT, RATE_WINDOW_SECONDS);
    if (!allowed) {
      const minutes = Math.max(1, Math.ceil(resetSeconds / 60));
      const limitMsg =
        language === "th"
          ? `ส่งข้อความบ่อยเกินไปนะ ลองใหม่อีกครั้งใน ${minutes} นาที 🐡`
          : `You're sending messages a bit fast. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}. 🐡`;
      return NextResponse.json(
        { text: limitMsg },
        { status: 429, headers: { "Retry-After": String(resetSeconds) } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!apiKey) {
      // Mock mode
      return NextResponse.json({
        text: "I am Plank AI. You haven't provided a GEMINI_API_KEY, so this is a mock response. But here is some Python code:\n\n```python\ndef greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"USER\")\n```"
      });
    }

    const SYSTEM_PROMPT = `You are "Plank AI", an expert Python programming tutor inside the Plankthon learning app. You are friendly, patient, and encouraging.

Expertise & quality:
- Write clean, correct, runnable Python that follows PEP 8 and Pythonic best practices.
- Make sure code actually works and produces the described result; never invent functions or libraries that do not exist.
- Prefer simple, beginner-friendly solutions; avoid unnecessary complexity or heavy libraries unless asked.

How to teach:
- Explain the "why" behind the code (the concept), not just the answer.
- When the user's code has a bug, explain what is wrong and how to fix it — do not silently rewrite it.
- Point out common mistakes and good habits when relevant.
- Use a short, clear explanation, then a single \`\`\`python code block, then the expected output when helpful.

Style:
- Reply in the user's language (${language}), but keep all code, keywords, and technical terms in English.
- Be concise. If a question is not about Python or programming, gently steer the user back to learning Python.`;

    // Build a multi-turn conversation (keep recent turns; start from a user message)
    const contents: { role: string; parts: { text: string }[] }[] = [];
    const past = Array.isArray(history) ? history.slice(-20) : [];
    for (const h of past) {
      const role = h?.role === "planky" || h?.role === "model" ? "model" : "user";
      const text = typeof h?.text === "string" ? h.text.trim() : "";
      if (!text) continue;
      if (contents.length === 0 && role === "model") continue; // Gemini must start with a user turn
      contents.push({ role, parts: [{ text }] });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const payload = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 5000,
      }
    };

    // Try a reliable model first; Gemini returns 503/429/5xx when a model is
    // overloaded or rate-limited on the free tier, so fall back automatically.
    const MODELS = GEMINI_MODELS;
    let lastStatus = 0;

    for (const model of MODELS) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't understand that.";
        return NextResponse.json({ text });
      }

      lastStatus = response.status;
      const body = await response.text().catch(() => "");
      console.error(`Plank AI: ${model} -> ${response.status} ${body.slice(0, 300)}`);

      // 400/401/403 mean the request or key is wrong — trying another model
      // won't help, so stop. Only retry on transient/quota errors.
      if (![429, 500, 502, 503, 504].includes(response.status)) break;
    }

    // Every model failed. For overload/quota, reply with a friendly message so
    // it renders as a normal Planky turn rather than a scary error.
    const busy = lastStatus === 503 || lastStatus === 429;
    if (busy) {
      const busyMsg =
        language === "th"
          ? "ตอนนี้ Plank AI มีคนใช้งานเยอะมาก (โมเดลโหลดเต็ม) ลองส่งใหม่อีกครั้งในอีกสักครู่นะ 🐡"
          : "Plank AI is very busy right now (the model is overloaded). Please try again in a moment. 🐡";
      return NextResponse.json({ text: busyMsg });
    }
    return NextResponse.json(
      { error: `Gemini API error (${lastStatus}).` },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("Plank AI Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
