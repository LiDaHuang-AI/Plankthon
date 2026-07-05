import { NextResponse } from "next/server";
import { registerAccount } from "@/lib/authStore";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json({ error: "email and password required" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "password too short" }, { status: 400 });
    }

    const result = await registerAccount(email, password, typeof name === "string" ? name : "New User");
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    return NextResponse.json({ email: result.email, name: result.name });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
