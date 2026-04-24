import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => ({ detail: "Unexpected backend response." }));
    if (!response.ok) {
      return NextResponse.json({ detail: payload.detail || "Analyze request failed." }, { status: response.status });
    }
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ detail: "Unable to reach backend service." }, { status: 500 });
  }
}
