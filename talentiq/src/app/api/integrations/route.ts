import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { type, payload } = await req.json();
    switch (type) {
      case "linkedin":
        // Placeholder: search by keywords
        return NextResponse.json({ results: [], note: "LinkedIn API requires OAuth; add tokens in env." });
      case "calendar":
        return NextResponse.json({ ok: true, note: "Calendar integration stub." });
      case "slack":
        return NextResponse.json({ ok: true, note: "Slack webhook stub." });
      default:
        return NextResponse.json({ error: "Unsupported integration" }, { status: 400 });
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

