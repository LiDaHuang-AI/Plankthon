import { NextResponse } from "next/server";
import { addUser, getUserCount } from "@/lib/userCount";

// GET  -> { count }         current number of unique registered users
// POST { email } -> { count }  record a signup (deduped by email hash)

export async function GET() {
  try {
    const count = await getUserCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null });
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "email required" }, { status: 400 });
    }
    const count = await addUser(email);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
