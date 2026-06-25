import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Mock mode
      return NextResponse.json({
        text: "I am Plank AI. You haven't provided a GEMINI_API_KEY, so this is a mock response. But here is some Python code:\n\n```python\ndef greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"USER\")\n```"
      });
    }

    const payload = {
      contents: [{ parts: [{ text: `You are Plank AI, a friendly Python tutor. Reply concisely, prefer runnable Python in fenced code blocks. User message: ${message}` }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
