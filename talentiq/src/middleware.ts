import { NextResponse, NextRequest } from "next/server";

// Simple in-memory token bucket per IP (development only)
const buckets = new Map<string, { tokens: number; last: number }>();
const RATE = 60; // tokens per minute

export function middleware(req: NextRequest) {
  const ipHeader =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip");
  const ip = ipHeader?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const bucket = buckets.get(ip) || { tokens: RATE, last: now };
  const refill = ((now - bucket.last) / 60000) * RATE;
  bucket.tokens = Math.min(RATE, bucket.tokens + refill);
  bucket.last = now;
  if (bucket.tokens < 1) {
    return new NextResponse(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });
  }
  bucket.tokens -= 1;
  buckets.set(ip as string, bucket);
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};

