import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history = [], language = 'en' } = await req.json();
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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from Gemini API");
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Plank AI Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
