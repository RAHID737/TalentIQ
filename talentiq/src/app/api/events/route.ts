import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(_req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      function send(evt: string, data: unknown) {
        controller.enqueue(encoder.encode(`event: ${evt}\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }
      send("ping", { t: Date.now() });
      const id = setInterval(() => send("ping", { t: Date.now() }), 10000);
      return () => clearInterval(id as unknown as number);
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

