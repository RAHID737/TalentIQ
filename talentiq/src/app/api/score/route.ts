import { NextRequest, NextResponse } from "next/server";
import { scoreCandidate, type CandidateProfile, type JobRequirements } from "@/lib/scoring";
import { supabaseServer } from "@/lib/supabaseServer";

type ScoreBody = {
  candidate: CandidateProfile;
  job: JobRequirements;
  weights: { skills: number; experience: number; education: number; location: number };
  job_id?: string;
  candidate_id?: string;
  organization_id?: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const { candidate, job, weights, job_id, candidate_id, organization_id }: ScoreBody = await req.json();
    if (!candidate || !job || !weights) return NextResponse.json({ error: "Missing inputs" }, { status: 400 });
    const result = scoreCandidate(candidate, job, weights);
    if (job_id && candidate_id && organization_id) {
      await supabaseServer
        .from("scoring_history")
        .insert({
          organization_id,
          job_id,
          candidate_id,
          score: result.score,
          breakdown: result.breakdown,
          weights,
        });
    }
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

