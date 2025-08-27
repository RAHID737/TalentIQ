"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/jobs", label: "Jobs" },
    { href: "/candidates", label: "Candidates" },
    { href: "/pipeline", label: "Pipeline" },
  ];
  return (
    <nav aria-label="Main" className="border-b px-4 py-3 flex items-center gap-3 sticky top-0 bg-white/80 backdrop-blur dark:bg-black/40 z-40">
      <span className="font-semibold mr-2">TalentIQ</span>
      <ul className="flex gap-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`px-2 py-1 rounded ${pathname === l.href ? "bg-gray-200 dark:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-900"}`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto flex gap-2">
        <Link className="underline text-sm" href="/auth/login">Login</Link>
        <Link className="underline text-sm" href="/auth/signup">Sign up</Link>
      </div>
    </nav>
  );
}

