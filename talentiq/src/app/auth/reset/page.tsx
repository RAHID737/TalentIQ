"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update`,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setMessage("Check your email for a reset link.");
  }

  return (
    <div className="min-h-[70vh] grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm border rounded p-6 space-y-4" aria-label="Reset password form">
        <h1 className="text-xl font-semibold">Reset password</h1>
        {error && <div role="alert" className="text-red-600 text-sm">{error}</div>}
        {message && <div role="status" className="text-green-700 text-sm">{message}</div>}
        <label className="block">
          <span className="text-sm">Email</span>
          <input aria-label="Email" className="mt-1 w-full border rounded px-3 py-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60" disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  );
}

