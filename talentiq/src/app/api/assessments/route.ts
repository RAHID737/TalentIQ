import { NextRequest, NextResponse } from "next/server";

type MCQQuestion = { type: "mcq"; prompt: string; options: string[]; correct: number };
type CodingQuestion = { type: "coding"; prompt: string; starter?: string };
type EssayQuestion = { type: "essay"; prompt: string };
type Question = MCQQuestion | CodingQuestion | EssayQuestion;

type Assessment = {
  id: string;
  questions: Question[];
  createdAt: number;
  answers?: Array<string | number | null>;
  submittedAt?: number;
  autoScore?: number;
  [key: string]: unknown;
};

// In-memory placeholder for demo (replace with DB tables later)
const assessments = new Map<string, Assessment>();

export async function POST(req: NextRequest) {
  // Create assessment
  try {
    const body = (await req.json()) as Partial<Assessment> & { questions?: Question[] };
    const id = crypto.randomUUID();
    assessments.set(id, { id, questions: body.questions || [], createdAt: Date.now(), ...body });
    return NextResponse.json({ id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // Submit answers
  try {
    const { id, answers }: { id: string; answers: Array<string | number | null> } = await req.json();
    const a = assessments.get(id);
    if (!a) return NextResponse.json({ error: "Not found" }, { status: 404 });
    a.answers = answers;
    a.submittedAt = Date.now();
    // naive auto-scoring for MCQ
    let score = 0;
    a.questions.forEach((q, idx) => {
      if (q.type === "mcq") {
        const correctIndex = q.correct;
        if (answers?.[idx] === correctIndex) score += 1;
      }
    });
    a.autoScore = score;
    return NextResponse.json({ ok: true, autoScore: a.autoScore ?? null });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

