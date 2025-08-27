import OpenAI from "openai";
import { env } from "@/lib/env";

export const openai = env.server.OPENAI_API_KEY
  ? new OpenAI({ apiKey: env.server.OPENAI_API_KEY })
  : undefined;

