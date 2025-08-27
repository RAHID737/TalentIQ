"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else alert("Check your email to confirm and log in.");
  }

  return (
    <div className="min-h-[70vh] grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm border rounded p-6 space-y-4" aria-label="Signup form">
        <h1 className="text-xl font-semibold">Sign up</h1>
        {error && <div role="alert" className="text-red-600 text-sm">{error}</div>}
        <label className="block">
          <span className="text-sm">Email</span>
          <input aria-label="Email" className="mt-1 w-full border rounded px-3 py-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm">Password</span>
          <input aria-label="Password" className="mt-1 w-full border rounded px-3 py-2" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}

