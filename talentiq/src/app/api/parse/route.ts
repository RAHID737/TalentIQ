import { NextRequest, NextResponse } from "next/server";
import { simpleParseResume } from "@/lib/parsers/simple";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { path, provider = "simple" }: { path: string; provider?: string } = await req.json();
    if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 });

    let text: string | null = null;
    // Download file from storage
    const { data: file, error: dlError } = await supabaseServer.storage.from("resumes").download(path);
    if (dlError || !file) return NextResponse.json({ error: dlError?.message || "Download failed" }, { status: 500 });
    text = await file.text();

    // Parse via selected provider; for now only 'simple'
    const extracted = simpleParseResume(text);

    // Persist parsed record (organization detection skipped; demo scope)
    const { data: parsed, error: insError } = await supabaseServer
      .from("parsed_resumes")
      .insert({ organization_id: null, candidate_id: null, file_path: path, provider, raw: { text }, extracted })
      .select("*")
      .single();
    if (insError) return NextResponse.json({ error: insError.message }, { status: 500 });
    return NextResponse.json({ parsed, extracted });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

