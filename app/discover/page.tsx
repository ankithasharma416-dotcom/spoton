"use client";
import { useState } from "react";

const activeRooms = [
  {
    id: 1,
    name: "late night indie 🌙",
    host: "ashli",
    playlist: "Late Night Drive",
    listeners: 5,
    coverFrom: "#0f3460",
    coverTo: "#1DB954",
  },
  {
    id: 2,
    name: "hyperpop only 💀",
    host: "adi",
    playlist: "brain rot hours",
    listeners: 12,
    coverFrom: "#1a1a2e",
    coverTo: "#e94560",
  },
  {
    id: 3,
    name: "chill sunday vibes ☕",
    host: "deepa",
    playlist: "Serotonin Boost",
    listeners: 8,
    coverFrom: "#4a0e8f",
    coverTo: "#9B59B6",
  },
];

const suggestions = [
  { id: 1, name: "sam", genres: ["Lo-fi", "Indie"], match: 91 },
  { id: 2, name: "sanam", genres: ["R&B", "Pop"], match: 84 },
  { id: 3, name: "deepa", genres: ["Hyperpop", "Alt"], match: 78 },
];

export default function Discover() {
  const [activeTab, setActiveTab] = useState<"rooms" | "people">("rooms");

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
          discover
        </span>
      </div>

      {/* Tab switcher */}
      <div className="flex mx-4 mb-6 p-1 rounded-xl gap-1"
        style={{ backgroundColor: "var(--card)" }}>
        <button
          onClick={() => setActiveTab("rooms")}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            backgroundColor: activeTab === "rooms" ? "var(--accent-green)" : "transparent",
            color: activeTab === "rooms" ? "#000" : "var(--muted)",
          }}
        >
          🎧 Listening Rooms
        </button>
        <button
          onClick={() => setActiveTab("people")}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            backgroundColor: activeTab === "people" ? "var(--accent-green)" : "transparent",
            color: activeTab === "people" ? "#000" : "var(--muted)",
          }}
        >
          🎵 People
        </button>
      </div>

      {/* Listening Rooms Tab */}
      {activeTab === "rooms" && (
        <div className="px-4 flex flex-col gap-4">

          {/* Create Room Button */}
          <button
            className="w-full py-4 rounded-2xl border-2 border-dashed flex flex-col items-center gap-1 transition-all"
            style={{ borderColor: "var(--accent-green)" }}
          >
            <span className="text-2xl">＋</span>
            <span className="text-sm font-semibold" style={{ color: "var(--accent-green)" }}>
              Create a Listening Room
            </span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              pick a playlist and go live
            </span>
          </button>

          {/* Active Rooms */}
          <p className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}>active now</p>

          {activeRooms.map((room) => (
            <div
              key={room.id}
              className="rounded-2xl overflow-hidden border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              {/* Room cover */}
              <div
                className="h-24 flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${room.coverFrom}, ${room.coverTo})` }}
              >
                <p className="text-white font-bold text-lg">{room.name}</p>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full"
                  style={{ backgroundColor: "#00000050" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-white text-xs">live</span>
                </div>
              </div>

              {/* Room info */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{room.playlist}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    by {room.host} · {room.listeners} listening
                  </p>
                </div>
                <button
                  className="text-xs font-bold px-4 py-2 rounded-full text-black"
                  style={{ backgroundColor: "var(--accent-green)" }}
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* People Tab */}
      {activeTab === "people" && (
        <div className="px-4 flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}>suggested for you</p>

          {suggestions.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-3 p-4 rounded-2xl border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ backgroundColor: "var(--accent-purple)" }}
              >
                {person.name[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{person.name}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {person.genres.map((g) => (
                    <span key={g} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "var(--accent-green)20", color: "var(--accent-green)" }}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg font-bold" style={{ color: "var(--accent-green)" }}>
                  {person.match}%
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>match</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}