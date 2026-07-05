import { NextResponse } from "next/server";
import { verifyAccount } from "@/lib/authStore";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json({ error: "email and password required" }, { status: 400 });
    }

    const result = await verifyAccount(email, password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
    return NextResponse.json({ email: result.email, name: result.name });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
