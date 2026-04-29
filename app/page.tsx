"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";

const stories = [
  { id: 1, name: "Ashli", gradient: "from-green-500 to-teal-400" },
  { id: 2, name: "Adi", gradient: "from-purple-500 to-pink-400" },
  { id: 3, name: "Deepa", gradient: "from-blue-500 to-cyan-400" },
  { id: 4, name: "Sam", gradient: "from-orange-500 to-yellow-400" },
  { id: 5, name: "Sanam", gradient: "from-red-500 to-rose-400" },
];

const posts = [
  {
    id: 1,
    user: "Ashli",
    playlist: "Late Night Drive",
    caption: "this playlist hits different at 2am 🌙",
    songs: 14,
    coverFrom: "#0f3460",
    coverTo: "#1DB954",
    likes: 42,
  },
  {
    id: 2,
    user: "Adi",
    playlist: "Serotonin Boost",
    caption: "for when you need to feel something good ✨",
    songs: 20,
    coverFrom: "#4a0e8f",
    coverTo: "#9B59B6",
    likes: 87,
  },
  {
    id: 3,
    user: "Deepa",
    playlist: "hyperpop brain rot",
    caption: "don't judge me 💀",
    songs: 31,
    coverFrom: "#1a1a2e",
    coverTo: "#e94560",
    likes: 134,
  },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen">

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <span className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--accent-green)" }}>
          spot<span style={{ color: "var(--accent-purple)" }}>on</span>
        </span>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: "var(--accent-purple)" }}
        >
          A
        </div>
      </div>

      {/* Stories */}
      <div className="px-4 mb-6">
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div
              className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center"
              style={{ borderColor: "var(--accent-green)" }}
            >
              <span className="text-2xl font-light" style={{ color: "var(--accent-green)" }}>+</span>
            </div>
            <span className="text-xs" style={{ color: "var(--muted)" }}>your vibe</span>
          </div>

          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${story.gradient} p-0.5`}>
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: "var(--card)" }}
                >
                  {story.name[0].toUpperCase()}
                </div>
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-6 h-px" style={{ backgroundColor: "var(--border)" }} />

      {/* Feed */}
      <div className="px-4 flex flex-col gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl overflow-hidden border"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-3 p-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "var(--accent-purple)" }}
              >
                {post.user[0].toUpperCase()}
              </div>
              <span className="font-medium text-sm">{post.user}</span>
              <span className="ml-auto text-xs" style={{ color: "var(--muted)" }}>2h ago</span>
            </div>

            <div
              className="mx-4 rounded-xl h-44 flex flex-col items-center justify-center gap-2 mb-4"
              style={{ background: `linear-gradient(135deg, ${post.coverFrom}, ${post.coverTo})` }}
            >
              <span className="text-4xl">🎵</span>
              <p className="text-white font-bold text-lg">{post.playlist}</p>
              <p className="text-white/60 text-sm">{post.songs} songs</p>
            </div>

            <div className="px-4 pb-4">
              <p className="text-sm mb-3">{post.caption}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="text-sm" style={{ color: "var(--muted)" }}>
                    ♥ {post.likes}
                  </button>
                  <button className="text-sm" style={{ color: "var(--muted)" }}>
                    💬 reply
                  </button>
                </div>
                <button
                  className="text-xs font-bold px-4 py-1.5 rounded-full text-black"
                  style={{ backgroundColor: "var(--accent-green)" }}
                >
                  ▶ play
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}