export type ParsedCandidate = {
  full_name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  years_experience?: number;
  education?: string;
};

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_REGEX = /(?:(?:\+\d{1,3}[\s-]?)?(?:\(\d{1,4}\)[\s-]?)?\d[\d\s-]{7,}\d)/;

const KNOWN_SKILLS = [
  "javascript","typescript","react","node","next.js","python","java","sql","aws","gcp","docker","kubernetes","graphql","rest","go","c#","ruby","php"
];

export function simpleParseResume(text: string): ParsedCandidate {
  const email = text.match(EMAIL_REGEX)?.[0];
  const phone = text.match(PHONE_REGEX)?.[0];
  const lowered = text.toLowerCase();
  const skills = Array.from(new Set(KNOWN_SKILLS.filter(s => lowered.includes(s))));
  let years_experience: number | undefined = undefined;
  const yearsMatch = lowered.match(/(\d+)[+\-\s]*(?:years|yrs)/);
  if (yearsMatch) years_experience = Number(yearsMatch[1]);
  const nameLine = text.split(/\n|\r/).find(l => l.trim().split(/\s+/).length >= 2 && !l.includes("@"));
  const full_name = nameLine?.trim();
  return { full_name, email: email || undefined, phone: phone || undefined, skills, years_experience };
}

