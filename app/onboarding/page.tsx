"use client";
import { useState } from "react";
import Image from "next/image";

const genres = ["Indie", "Alt-Rock", "Hyperpop", "R&B", "Lo-fi", "Pop", "Jazz", "Metal", "Classical", "Hip-Hop"];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Step 1 — Welcome
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8">
        <Image
          src="/logo.png"
          alt="SPOTON"
          width={120}
          height={120}
          className="rounded-full"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            welcome to{" "}
            <span style={{ color: "var(--accent-green)" }}>spot</span>
            <span style={{ color: "var(--accent-purple)" }}>on</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            connect with people through music.{"\n"}
            no real name. no phone number.{"\n"}
            just your taste.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => setStep(2)}
            className="w-full py-4 rounded-2xl font-bold text-black text-sm"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            get started
          </button>
          <button
            onClick={() => setStep(2)}
            className="w-full py-4 rounded-2xl font-bold text-sm border"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            i already have an account
          </button>
        </div>
        <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
          by continuing you agree to our terms.{"\n"}
          we never sell your data. ever.
        </p>
      </div>
    );
  }

  // Step 2 — Email
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-16">
        <div className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-wider mb-6"
            style={{ color: "var(--accent-green)" }}>step 1 of 3</p>
          <h2 className="text-2xl font-bold mb-2">what's your email?</h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            just for verification — it'll never show on your profile
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-4 rounded-2xl text-sm outline-none border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <button
            onClick={() => setStep(3)}
            className="w-full py-4 rounded-2xl font-bold text-black text-sm"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            continue
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
          <span className="text-xs" style={{ color: "var(--muted)" }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
        </div>

        <button
          onClick={() => setStep(3)}
          className="mt-6 w-full py-4 rounded-2xl font-bold text-sm border flex items-center justify-center gap-2"
          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
        >
          🎵 continue with Spotify
        </button>
      </div>
    );
  }

  // Step 3 — Display name
  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-16">
        <p className="text-xs font-semibold uppercase tracking-wider mb-6"
          style={{ color: "var(--accent-green)" }}>step 2 of 3</p>
        <h2 className="text-2xl font-bold mb-2">pick your name</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          this is how people will know you. no real names needed.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {/* Avatar picker */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, var(--accent-green), var(--accent-purple))" }}
            >
              {displayName ? displayName[0].toUpperCase() : "?"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">your avatar</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                generated from your name
              </p>
            </div>
          </div>

          <input
            type="text"
            placeholder="e.g. moonchild, wavyy, static_k"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl text-sm outline-none border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />

          <button
            onClick={() => setStep(4)}
            disabled={!displayName.trim()}
            className="w-full py-4 rounded-2xl font-bold text-black text-sm disabled:opacity-40"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            continue
          </button>
        </div>
      </div>
    );
  }

  // Step 4 — Pick genres
  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col px-6 pt-16 pb-10">
        <p className="text-xs font-semibold uppercase tracking-wider mb-6"
          style={{ color: "var(--accent-green)" }}>step 3 of 3</p>
        <h2 className="text-2xl font-bold mb-2">what do you vibe with?</h2>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          pick at least 3 genres — this is how we find your people
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {genres.map((genre) => {
            const selected = selectedGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className="px-4 py-2 rounded-full text-sm font-semibold border transition-all"
                style={{
                  backgroundColor: selected ? "var(--accent-green)" : "transparent",
                  borderColor: selected ? "var(--accent-green)" : "var(--border)",
                  color: selected ? "#000" : "var(--muted)",
                }}
              >
                {genre}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => window.location.href = "/"}
          disabled={selectedGenres.length < 3}
          className="w-full py-4 rounded-2xl font-bold text-black text-sm disabled:opacity-40"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          lets go 🎵
        </button>

        <p className="text-xs text-center mt-3" style={{ color: "var(--muted)" }}>
          {selectedGenres.length < 3
            ? `pick ${3 - selectedGenres.length} more`
            : `${selectedGenres.length} selected — looking good!`}
        </p>
      </div>
    );
  }
}