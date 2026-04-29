"use client";
import { useState } from "react";

const myPlaylists = [
  { id: 1, name: "Late Night Drive", songs: 14, coverFrom: "#0f3460", coverTo: "#1DB954" },
  { id: 2, name: "Serotonin Boost", songs: 20, coverFrom: "#4a0e8f", coverTo: "#9B59B6" },
  { id: 3, name: "brain rot hours", songs: 31, coverFrom: "#1a1a2e", coverTo: "#e94560" },
  { id: 4, name: "sunday morning", songs: 12, coverFrom: "#1a3a2a", coverTo: "#2ecc71" },
  { id: 5, name: "main character arc", songs: 25, coverFrom: "#2c1a4a", coverTo: "#9b59b6" },
];

export default function Create() {
  const [step, setStep] = useState<"pick" | "caption" | "done">("pick");
  const [selectedPlaylist, setSelectedPlaylist] = useState<typeof myPlaylists[0] | null>(null);
  const [caption, setCaption] = useState("");

  if (step === "done") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-6xl">🎵</div>
        <h2 className="text-xl font-bold">posted!</h2>
        <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
          your playlist is out there now. someone's going to love it.
        </p>
        <button
          onClick={() => { setStep("pick"); setSelectedPlaylist(null); setCaption(""); }}
          className="mt-4 px-6 py-3 rounded-full text-sm font-bold text-black"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          post another
        </button>
      </div>
    );
  }

  if (step === "caption" && selectedPlaylist) {
    return (
      <div className="min-h-screen">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b"
          style={{ borderColor: "var(--border)" }}>
          <button onClick={() => setStep("pick")}
            className="text-xl" style={{ color: "var(--muted)" }}>
            ←
          </button>
          <span className="font-semibold">add a caption</span>
          <button
            onClick={() => setStep("done")}
            className="ml-auto px-4 py-1.5 rounded-full text-sm font-bold text-black"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            post
          </button>
        </div>

        {/* Selected playlist preview */}
        <div className="mx-4 mt-6 rounded-2xl overflow-hidden">
          <div
            className="h-40 flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${selectedPlaylist.coverFrom}, ${selectedPlaylist.coverTo})` }}
          >
            <span className="text-4xl">🎵</span>
            <p className="text-white font-bold text-lg">{selectedPlaylist.name}</p>
            <p className="text-white/60 text-sm">{selectedPlaylist.songs} songs</p>
          </div>
        </div>

        {/* Caption input */}
        <div className="px-4 mt-4">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="what's the vibe? say something..."
            rows={4}
            className="w-full p-4 rounded-2xl text-sm outline-none border resize-none"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <p className="text-xs mt-2 text-right" style={{ color: "var(--muted)" }}>
            {caption.length}/150
          </p>
        </div>

        {/* Mood tags */}
        <div className="px-4 mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "var(--muted)" }}>add a mood tag</p>
          <div className="flex flex-wrap gap-2">
            {["🌙 late night", "✨ feel good", "💀 unhinged", "🫀 emotional", "🔥 hype", "☁️ chill"].map((tag) => (
              <button
                key={tag}
                onClick={() => setCaption(caption + " " + tag)}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen">

      {/* Header */}
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

      {/* Instruction */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-1">pick a playlist</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          choose one to share with the world 🌍
        </p>
      </div>

      {/* Playlist picker */}
      <div className="px-4 flex flex-col gap-3">
        {myPlaylists.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => { setSelectedPlaylist(playlist); setStep("caption"); }}
            className="flex items-center gap-4 p-4 rounded-2xl border w-full text-left transition-all"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${playlist.coverFrom}, ${playlist.coverTo})` }}
            >
              🎵
            </div>
            <div>
              <p className="font-semibold text-sm">{playlist.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                {playlist.songs} songs
              </p>
            </div>
            <span className="ml-auto text-lg" style={{ color: "var(--muted)" }}>→</span>
          </button>
        ))}
      </div>

    </div>
  );
}