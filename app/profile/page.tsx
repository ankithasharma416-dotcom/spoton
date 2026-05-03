"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

interface Profile {
  display_name: string;
  top_genres: string[] | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setNotLoggedIn(true);
          setLoading(false);
          return;
        }

        const { data } = await supabase
          .from("profiles")
          .select("display_name, top_genres")
          .eq("id", user.id)
          .single();

        if (data) setProfile(data);
      } catch (err) {
        console.log("Profile load error:", err);
        setNotLoggedIn(true);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const displayName = profile?.display_name ?? "Anonymous";

  // Safe array — handles null, undefined, or accidental string
  const genres: string[] = Array.isArray(profile?.top_genres)
    ? profile!.top_genres
    : [];

  const initials = displayName.slice(0, 2).toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--accent-green)" }} />
      </div>
    );
  }

  if (notLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6"
        style={{ backgroundColor: "var(--background)" }}>
        <p className="text-4xl">🎵</p>
        <p className="font-semibold text-center" style={{ color: "var(--foreground)" }}>
          You're not logged in
        </p>
        <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
          Sign up to see your profile
        </p>
        <button
          onClick={() => window.location.href = "/onboarding"}
          className="mt-2 px-6 py-3 rounded-2xl font-semibold text-white"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-24" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-4">
        <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
          Profile
        </h1>
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 rounded-full border"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          Toggle Theme
        </button>
      </div>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center px-4 py-6">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4"
          style={{ background: "linear-gradient(135deg, var(--accent-green), var(--accent-purple))" }}
        >
          {initials}
        </div>

        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
          {displayName}
        </h2>

        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{ backgroundColor: "var(--accent-purple)", color: "#fff" }}
        >
          🎵 Music Lover
        </span>
      </div>

      {/* Stats */}
      <div
        className="mx-4 rounded-2xl p-4 grid grid-cols-3 text-center mb-6"
        style={{ backgroundColor: "var(--card)" }}
      >
        {[
          { label: "Posts", value: "—" },
          { label: "Connected", value: "—" },
          { label: "Avg Match", value: "—" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Top Genres */}
      {genres.length > 0 && (
        <div className="px-4 mb-6">
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--muted)" }}>
            YOUR GENRES
          </h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <motion.span
                key={genre}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "var(--card)",
                  color: "var(--accent-green)",
                  border: "1px solid var(--accent-green)"
                }}
              >
                {genre}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Sign Out */}
      <div className="px-4">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/onboarding";
          }}
          className="w-full py-3 rounded-2xl text-sm font-semibold"
          style={{ backgroundColor: "var(--card)", color: "var(--muted)" }}
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}