"use client";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";

const genres = ["Indie", "Alt-Rock", "Hyperpop", "R&B", "Lo-fi", "Pop", "Jazz", "Metal", "Classical", "Hip-Hop"];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [displayName, setDisplayName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) return prev.filter((g) => g !== genre);
      if (prev.length >= 5) return prev;
      return [...prev, genre];
    });
  };

  const handleSignUp = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setUserId(data.user?.id ?? null);
    setStep(3);
  };

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    window.location.href = "/";
  };

  const handleFinish = async () => {
    if (!userId) { setError("Session error — please try again"); return; }
    setLoading(true);
    const { error } = await supabase.from("profiles").insert({
      id: userId,
      display_name: displayName,
      top_genres: selectedGenres,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    window.location.href = "/";
  };

  // Step 1 — Welcome
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8">
        <Image src="/logo.png" alt="SPOTON" width={120} height={120} className="rounded-full" />
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            welcome to{" "}
            <span style={{ color: "var(--accent-green)" }}>spot</span>
            <span style={{ color: "var(--accent-purple)" }}>on</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            connect with people through music.
            no real name. no phone number. just your taste.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => { setMode("signup"); setStep(2); }}
            className="w-full py-4 rounded-2xl font-bold text-black text-sm"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            get started
          </button>
          <button
            onClick={() => { setMode("login"); setStep(2); }}
            className="w-full py-4 rounded-2xl font-bold text-sm border"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            i already have an account
          </button>
        </div>
        <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
          by continuing you agree to our terms. we never sell your data. ever.
        </p>
      </div>
    );
  }

  // Step 2 — Email + Password
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            {mode === "login" ? "welcome back" : "what's your email?"}
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {mode === "login" ? "sign in to your account" : "we'll keep it safe. delete your account anytime."}
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border text-sm"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full px-4 py-3 rounded-xl border text-sm"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            onClick={mode === "login" ? handleLogin : handleSignUp}
            disabled={!email || !password || loading}
            className="w-full py-4 rounded-2xl font-bold text-black text-sm disabled:opacity-40"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            {loading ? "..." : mode === "login" ? "sign in" : "continue"}
          </button>
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="text-sm text-center"
            style={{ color: "var(--muted)" }}
          >
            {mode === "login" ? "don't have an account? sign up" : "already have an account? sign in"}
          </button>
        </div>
      </div>
    );
  }

  // Step 3 — Profile Setup (signup only)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">complete your profile</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          this is how others will know you. no real name needed.
        </p>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div>
          <label className="text-xs font-semibold uppercase mb-2 block" style={{ color: "var(--muted)" }}>
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g., ashli, moonlight, sonic"
            className="w-full px-4 py-3 rounded-xl border text-sm"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase mb-3 block" style={{ color: "var(--muted)" }}>
            Top 5 Genres ({selectedGenres.length}/5)
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                style={{
                  backgroundColor: selectedGenres.includes(genre) ? "var(--accent-green)" : "transparent",
                  borderColor: "var(--border)",
                  color: selectedGenres.includes(genre) ? "#000" : "var(--muted)",
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          onClick={handleFinish}
          disabled={!displayName.trim() || selectedGenres.length === 0 || loading}
          className="w-full py-4 rounded-2xl font-bold text-black text-sm disabled:opacity-40"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          {loading ? "setting up..." : "finish setup"}
        </button>
      </div>
    </div>
  );
}