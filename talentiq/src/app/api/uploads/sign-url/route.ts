import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  const { fileName } = await req.json();
  if (!fileName) {
    return NextResponse.json({ error: "Missing fileName" }, { status: 400 });
  }
  const bucket = "resumes";
  const path = `${Date.now()}-${fileName}`;
  const { data, error } = await supabaseServer.storage
    .from(bucket)
    .createSignedUploadUrl(path);
  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: error?.message || "Failed to sign URL" }, { status: 500 });
  }
  return NextResponse.json({ url: data.signedUrl, path });
}

