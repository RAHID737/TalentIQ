"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email for a magic link");
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onLogin} className="border rounded p-6 space-y-4 w-full max-w-sm">
        <h1 className="text-xl font-semibold">Log in</h1>
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            className="mt-1 w-full border rounded px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Send magic link</button>
      </form>
    </div>
  );
}

