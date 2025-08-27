export type QuestionCategory = "technical" | "behavioral" | "situational";

export function buildQuestionPrompt(
  roleTitle: string,
  level: "junior" | "mid" | "senior",
  categories: QuestionCategory[],
  industry?: string
) {
  return `You are an expert interviewer. Generate concise, high-quality interview questions.
Role: ${roleTitle}
Level: ${level}
Industry: ${industry || "general"}
Categories: ${categories.join(", ")}
Return JSON with fields: questions[{text, category, difficulty:1-5}], tips, rubric.`;
}

