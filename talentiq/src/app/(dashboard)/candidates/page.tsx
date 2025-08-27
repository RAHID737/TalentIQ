"use client";
import { ResumeDropzone } from "@/components/ResumeDropzone";
import { exportCSV, exportJSON } from "@/lib/export";
import { VoiceNote } from "@/components/VoiceNote";
import { useState } from "react";

export default function CandidatesPage() {
  const [note, setNote] = useState("");
  const sample = [
    { full_name: "Alice", email: "alice@example.com" },
    { full_name: "Bob", email: "bob@example.com" },
  ];
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Candidates</h1>
      <p className="text-sm text-muted-foreground">Upload resumes and manage applicants.</p>
      <div className="flex gap-2">
        <button className="px-3 py-2 border rounded" onClick={() => exportCSV(sample, "candidates.csv")}>Export CSV</button>
        <button className="px-3 py-2 border rounded" onClick={() => exportJSON(sample, "candidates.json")}>Export JSON</button>
      </div>
      <ResumeDropzone />
      <div className="space-y-2">
        <VoiceNote onChange={setNote} />
        <textarea className="w-full border rounded p-2" rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Notes..." />
      </div>
    </div>
  );
}

