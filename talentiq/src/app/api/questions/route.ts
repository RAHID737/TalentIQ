import { NextRequest, NextResponse } from "next/server";
import { buildQuestionPrompt } from "@/lib/questions";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { roleTitle, level, categories, industry } = await req.json();
    if (!openai) return NextResponse.json({ error: "OpenAI not configured" }, { status: 503 });
    const prompt = buildQuestionPrompt(roleTitle, level, categories, industry);
    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.7,
    });
    const text = completion.output_text || "{}";
    let json: unknown = {};
    try { json = JSON.parse(text); } catch { json = { raw: text }; }
    return NextResponse.json({ questions: json });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

