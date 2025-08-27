import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen grid place-items-center p-10">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome to TalentIQ</h1>
        <p className="text-muted-foreground">
          AI-driven recruitment platform. Get started below.
        </p>
        <div className="flex gap-3 justify-center">
          <Link className="underline" href="/dashboard">
            Go to Dashboard
          </Link>
          <Link className="underline" href="/jobs">
            Manage Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
