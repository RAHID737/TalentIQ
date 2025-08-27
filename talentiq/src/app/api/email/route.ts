import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html }: { to: string; subject: string; html: string } = await req.json();
    if (!to || !subject || !html) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    if (!env.server.RESEND_API_KEY) return NextResponse.json({ error: "Email not configured" }, { status: 503 });
    const resend = new Resend(env.server.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: "noreply@talentiq.app", to, subject, html });
    if (error) return NextResponse.json({ error: String(error) }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

