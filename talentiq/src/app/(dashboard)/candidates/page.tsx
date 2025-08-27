import { ResumeDropzone } from "@/components/ResumeDropzone";

export default function CandidatesPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Candidates</h1>
      <p className="text-sm text-muted-foreground">Upload resumes and manage applicants.</p>
      <ResumeDropzone />
    </div>
  );
}

