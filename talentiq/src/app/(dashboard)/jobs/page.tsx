"use client";
import { useShortcuts } from "@/hooks/useShortcuts";

export default function JobsPage() {
  useShortcuts({
    "Ctrl+n": () => alert("New job"),
    "Ctrl+Shift+b": () => alert("Bulk action"),
  });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Jobs</h1>
      <p className="text-sm text-muted-foreground mt-2">Create and manage job postings.</p>
      <p className="text-xs text-gray-500 mt-3">Shortcuts: Ctrl+N (new), Ctrl+Shift+B (bulk)</p>
    </div>
  );
}

