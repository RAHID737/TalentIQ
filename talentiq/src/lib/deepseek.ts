import OpenAI from "openai";
import { env } from "@/lib/env";

export const deepseek = env.server.DEEPSEEK_API_KEY
  ? new OpenAI({ apiKey: env.server.DEEPSEEK_API_KEY, baseURL: "https://api.deepseek.com/v1" })
  : undefined;

