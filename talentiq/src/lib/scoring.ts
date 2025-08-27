export type ScoringWeights = {
  skills: number;
  experience: number;
  education: number;
  location: number;
};

export type CandidateProfile = {
  skills?: string[];
  years_experience?: number;
  education?: string;
  location?: string;
};

export type JobRequirements = {
  required_skills: string[];
  min_years?: number;
  education?: string;
  location?: string;
};

export function scoreCandidate(
  candidate: CandidateProfile,
  job: JobRequirements,
  weights: ScoringWeights
) {
  const breakdown: Record<string, number> = {};
  const skills = candidate.skills || [];
  const required = job.required_skills || [];
  const skillOverlap = required.length
    ? skills.filter((s) => required.includes(s.toLowerCase())).length / required.length
    : 0;
  breakdown.skills = Math.round(skillOverlap * 100);

  const exp = candidate.years_experience || 0;
  const min = job.min_years || 0;
  const expScore = min === 0 ? 100 : Math.min(100, Math.round((exp / min) * 100));
  breakdown.experience = expScore;

  const eduScore = job.education && candidate.education
    ? candidate.education.toLowerCase().includes(job.education.toLowerCase()) ? 100 : 0
    : 50;
  breakdown.education = eduScore;

  const locScore = job.location && candidate.location
    ? candidate.location.toLowerCase().includes(job.location.toLowerCase()) ? 100 : 0
    : 50;
  breakdown.location = locScore;

  const totalWeight = weights.skills + weights.experience + weights.education + weights.location;
  const weighted =
    (breakdown.skills * weights.skills +
      breakdown.experience * weights.experience +
      breakdown.education * weights.education +
      breakdown.location * weights.location) /
    totalWeight;

  const score = Math.round(weighted);
  const explanation = `Skills ${breakdown.skills}%, Experience ${breakdown.experience}%, Education ${breakdown.education}%, Location ${breakdown.location}%`;
  return { score, breakdown, explanation };
}

