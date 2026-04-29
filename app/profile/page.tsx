"use client";
import { useState } from "react";

const genres = ["Indie", "Alt-Rock", "Hyperpop", "R&B", "Lo-fi", "Pop"];

const topArtists = [
  { id: 1, name: "Arctic Monkeys", genre: "Indie Rock" },
  { id: 2, name: "Billie Eilish", genre: "Alt-Pop" },
  { id: 3, name: "Frank Ocean", genre: "R&B" },
];

const playlists = [
  { id: 1, name: "Late Night Drive", songs: 14, coverFrom: "#0f3460", coverTo: "#1DB954" },
  { id: 2, name: "Serotonin Boost", songs: 20, coverFrom: "#4a0e8f", coverTo: "#9B59B6" },
  { id: 3, name: "brain rot hours", songs: 31, coverFrom: "#1a1a2e", coverTo: "#e94560" },
];

export default function Profile() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen pb-10">

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <span className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--accent-green)" }}>
          spot<span style={{ color: "var(--accent-purple)" }}>on</span>
        </span>
        <button
          onClick={toggleTheme}
          className="text-xl px-3 py-1 rounded-full border"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center gap-3 px-4 py-6">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold"
          style={{ background: "linear-gradient(135deg, var(--accent-green), var(--accent-purple))" }}
        >
          A
        </div>
        <h2 className="text-xl font-bold">ankitha</h2>
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold"
          style={{ backgroundColor: "var(--accent-purple)20", color: "var(--accent-purple)" }}
        >
          🎧 Melancholic Indie Kid
        </span>

        {/* Stats */}
        <div className="flex gap-8 mt-2">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">24</span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">138</span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>connected</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">94%</span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>avg match</span>
          </div>
        </div>
      </div>

      {/* Genre Tags */}
      <div className="px-4 mb-6">
        <p className="text-xs font-semibold mb-3 uppercase tracking-wider"
          style={{ color: "var(--muted)" }}>your genres</p>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span
              key={genre}
              className="text-xs px-3 py-1.5 rounded-full border font-medium"
              style={{ borderColor: "var(--accent-green)", color: "var(--accent-green)" }}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Top Artists */}
      <div className="px-4 mb-6">
        <p className="text-xs font-semibold mb-3 uppercase tracking-wider"
          style={{ color: "var(--muted)" }}>top artists</p>
        <div className="flex flex-col gap-3">
          {topArtists.map((artist, index) => (
            <div key={artist.id} className="flex items-center gap-3">
              <span className="text-sm font-bold w-5" style={{ color: "var(--muted)" }}>
                {index + 1}
              </span>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "var(--accent-purple)" }}
              >
                {artist.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium">{artist.name}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{artist.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div className="px-4">
        <p className="text-xs font-semibold mb-3 uppercase tracking-wider"
          style={{ color: "var(--muted)" }}>your playlists</p>
        <div className="flex flex-col gap-3">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center gap-3 p-3 rounded-xl border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${playlist.coverFrom}, ${playlist.coverTo})` }}
              >
                🎵
              </div>
              <div>
                <p className="text-sm font-medium">{playlist.name}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{playlist.songs} songs</p>
              </div>
              <button
                className="ml-auto text-xs font-bold px-3 py-1 rounded-full text-black"
                style={{ backgroundColor: "var(--accent-green)" }}
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}