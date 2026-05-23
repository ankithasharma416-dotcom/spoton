"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

const gradients = [
  { name: "Forest Night", from: "#0f3460", to: "#1DB954" },
  { name: "Purple Haze", from: "#4a0e8f", to: "#9B59B6" },
  { name: "Midnight", from: "#1a1a2e", to: "#e94560" },
  { name: "Ocean", from: "#1a3a4a", to: "#2ecc71" },
  { name: "Sunset", from: "#2c1a4a", to: "#e67e22" },
];

const moodOptions = [
  "🌙 late night",
  "✨ feel good",
  "💀 unhinged",
  "🫀 emotional",
  "🔥 hype",
  "☁️ chill",
];

export default function Create() {
  const [step, setStep] = useState<"pick" | "caption" | "done">("pick");
  const [selectedGradient, setSelectedGradient] = useState(gradients[0]);
  const [playlistName, setPlaylistName] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleMood = (tag: string) => {
    setSelectedMoods((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePost = async () => {
    setSaving(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("you need to be logged in to post");
      setSaving(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();

    const { error } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        display_name: profile?.display_name ?? "anonymous",
        playlist_name: playlistName,
        caption,
        mood_tags: selectedMoods,
        cover_from: selectedGradient.from,
        cover_to: selectedGradient.to,
        likes: 0,
      });

    setSaving(false);
    if (error) {
      setError(error.message);
    } else {
      setStep("done");
    }
  };

  if (step === "done") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-6xl">🎵</div>
        <h2 className="text-xl font-bold">posted!</h2>
        <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
          your playlist is out there now. someone's going to love it.
        </p>
        <button
          onClick={() => {
            setStep("pick");
            setPlaylistName("");
            setCaption("");
            setSelectedMoods([]);
            setError("");
          }}
          className="mt-4 px-6 py-3 rounded-full text-sm font-bold text-black"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          post another
        </button>
        <button
          onClick={() => window.location.href = "/"}
          className="px-6 py-3 rounded-full text-sm font-bold border"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          go to feed
        </button>
      </div>
    );
  }

  if (step === "caption") {
    return (
      <div className="min-h-screen">
        <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b"
          style={{ borderColor: "var(--border)" }}>
          <button onClick={() => setStep("pick")}
            className="text-xl" style={{ color: "var(--muted)" }}>
            ←
          </button>
          <span className="font-semibold">add details</span>
          <button
            onClick={handlePost}
            disabled={saving || !playlistName.trim()}
            className="ml-auto px-4 py-1.5 rounded-full text-sm font-bold text-black disabled:opacity-40"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            {saving ? "posting..." : "post"}
          </button>
        </div>

        {/* Preview */}
        <div
          className="mx-4 mt-6 rounded-2xl h-44 flex flex-col items-center justify-center gap-2 mb-6"
          style={{ background: `linear-gradient(135deg, ${selectedGradient.from}, ${selectedGradient.to})` }}
        >
          <span className="text-4xl">🎵</span>
          <p className="text-white font-bold text-lg">
            {playlistName || "your playlist name"}
          </p>
        </div>

        <div className="px-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl text-sm outline-none border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="what's the vibe? say something..."
            rows={3}
            className="w-full p-4 rounded-2xl text-sm outline-none border resize-none"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />

          {/* Mood tags */}
          <p className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}>
            mood tags {selectedMoods.length > 0 && `(${selectedMoods.length} selected)`}
          </p>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleMood(tag)}
                className="text-xs px-3 py-1.5 rounded-full border transition-all"
                style={{
                  borderColor: selectedMoods.includes(tag) ? "var(--accent-purple)" : "var(--border)",
                  backgroundColor: selectedMoods.includes(tag) ? "var(--accent-purple)" : "transparent",
                  color: selectedMoods.includes(tag) ? "#fff" : "var(--muted)",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <span className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--accent-green)" }}>
          spot<span style={{ color: "var(--accent-purple)" }}>on</span>
        </span>
        <span className="text-xs font-medium px-3 py-1 rounded-full"
          style={{ backgroundColor: "var(--accent-green)20", color: "var(--accent-green)" }}>
          new post
        </span>
      </div>

      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-1">pick a vibe</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          choose a color for your playlist card 🎨
        </p>
      </div>

      <div className="px-4 flex flex-col gap-3">
        {gradients.map((gradient) => (
          <button
            key={gradient.name}
            onClick={() => { setSelectedGradient(gradient); setStep("caption"); }}
            className="flex items-center gap-4 p-4 rounded-2xl border w-full text-left"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          >
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
            />
            <span className="font-semibold text-sm">{gradient.name}</span>
            <span className="ml-auto text-lg" style={{ color: "var(--muted)" }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}