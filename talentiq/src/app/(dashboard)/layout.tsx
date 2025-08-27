import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r p-4 space-y-3">
        <h2 className="font-semibold text-lg">TalentIQ</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/candidates">Candidates</Link>
          <Link href="/pipeline">Pipeline</Link>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}

