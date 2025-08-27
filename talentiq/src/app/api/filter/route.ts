import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

type FilterBody = {
  skills?: string[];
  min_experience?: number;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  boolean_query?: string;
  limit?: number;
};

export async function POST(req: NextRequest) {
  try {
    const body: FilterBody = await req.json();
    const {
      skills = [],
      min_experience,
      location,
      salary_min,
      salary_max,
      boolean_query,
      limit = 50,
    } = body || {};

    let query = supabase.from("candidates").select("*").limit(limit);
    if (skills.length) query = query.contains("skills", skills);
    if (min_experience) query = query.gte("years_experience", min_experience);
    if (location) query = query.ilike("location", `%${location}%`);
    // Salary filtering would join jobs/applications; simplified placeholder
    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    // Boolean query placeholder: filter in-memory
    const filtered = boolean_query
      ? (data || []).filter((c) => JSON.stringify(c).toLowerCase().includes(boolean_query.toLowerCase()))
      : data;
    return NextResponse.json({ candidates: filtered });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

