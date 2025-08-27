import { NextRequest, NextResponse } from "next/server";
import { buildQuestionPrompt } from "@/lib/questions";
import { openai } from "@/lib/openai";
import { deepseek } from "@/lib/deepseek";

export async function POST(req: NextRequest) {
  try {
    const { roleTitle, level, categories, industry } = await req.json();
    const prompt = buildQuestionPrompt(roleTitle, level, categories, industry);
    let text = "{}";
    if (deepseek) {
      const ds = await deepseek.responses.create({ model: "deepseek-chat", input: prompt, temperature: 0.7 });
      text = ds.output_text || text;
    } else if (openai) {
      const completion = await openai.responses.create({ model: "gpt-4o-mini", input: prompt, temperature: 0.7 });
      text = completion.output_text || text;
    } else {
      return NextResponse.json({ error: "No LLM configured" }, { status: 503 });
    }
    let json: unknown = {};
    try { json = JSON.parse(text); } catch { json = { raw: text }; }
    return NextResponse.json({ questions: json });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

