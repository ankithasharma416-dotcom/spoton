# SPOTON Project Code Archive

This file contains all source code from the SPOTON project. Created as a reference snapshot.

---

## Configuration Files

### package.json
```json
{
  "name": "spoton",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.11.0",
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

### next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### eslint.config.mjs
```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### postcss.config.mjs
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

---

## App Directory

### app/layout.tsx
```typescript
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPOTON",
  description: "Connect through music. Anonymous by design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geist.variable} min-h-screen antialiased`}
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <main className="max-w-md mx-auto pb-24">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
```

### app/globals.css
```css
@import "tailwindcss";

:root {
  --background: #F7F7F7;
  --foreground: #0A0A0A;
  --card: #FFFFFF;
  --accent-green: #1DB954;
  --accent-purple: #9B59B6;
  --muted: #6B7280;
  --border: #E5E7EB;
}

.dark {
  --background: #0A0A0A;
  --foreground: #FFFFFF;
  --card: #1A1A1A;
  --accent-green: #1DB954;
  --accent-purple: #9B59B6;
  --muted: #9CA3AF;
  --border: #2A2A2A;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

### app/page.tsx
```typescript
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "./lib/supabase";
import SplashScreen from "./components/SplashScreen";

interface Post {
  id: string;
  playlist_name: string;
  caption: string;
  mood_tags: string[];
  gradient: string;
  display_name: string;
  created_at: string;
}

const stories = [
  { name: "Ashli", color: "#1DB954" },
  { name: "Ash", color: "#9B59B6" },
  { name: "Deepa", color: "#E74C3C" },
  { name: "Sam", color: "#F39C12" },
  { name: "San", color: "#3498DB" },
];

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      </AnimatePresence>

      <main className="min-h-screen pb-24" style={{ backgroundColor: "var(--background)" }}>
        <div className="flex items-center justify-between px-4 pt-14 pb-2">
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>spoton</h1>
          <div className="w-8 h-8 rounded-full"
            style={{ background: "linear-gradient(135deg, var(--accent-green), var(--accent-purple))" }} />
        </div>

        <div className="flex gap-4 px-4 py-3 overflow-x-auto">
          {stories.map((story) => (
            <div key={story.name} className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ background: `linear-gradient(135deg, ${story.color}, var(--accent-purple))` }}>
                {story.name[0]}
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{story.name}</span>
            </div>
          ))}
        </div>

        <div className="px-4 mt-2 flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: "var(--accent-green)" }} />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12" style={{ color: "var(--muted)" }}>
              <p className="text-4xl mb-3">🎵</p>
              <p className="font-medium">No posts yet</p>
              <p className="text-sm mt-1">Be the first to share a playlist!</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--card)" }}>
                <div className="h-32 flex items-center justify-center"
                  style={{ background: post.gradient || "linear-gradient(135deg, #1DB954, #9B59B6)" }}>
                  <span className="text-white text-lg font-bold drop-shadow">🎵 {post.playlist_name}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, var(--accent-green), var(--accent-purple))" }}>
                      {post.display_name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {post.display_name ?? "Anonymous"}
                    </span>
                  </div>
                  {post.caption && <p className="text-sm mb-3" style={{ color: "var(--foreground)" }}>{post.caption}</p>}
                  {post.mood_tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2"></div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
```

### app/chat/page.tsx
```typescript
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

// Hardcoded for now — will be dynamic when we add real user connections
const MOCK_RECEIVER_ID = "00000000-0000-0000-0000-000000000001";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }
        setUserId(user.id);

        const { data } = await supabase
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order("created_at", { ascending: true });

        if (data) setMessages(data);
      } catch (err) {
        console.log("Chat load error:", err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  async function sendMessage() {
    if (!newMessage.trim() || !userId || sending) return;

    setSending(true);
    const content = newMessage.trim();
    setNewMessage("");

    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: userId,
        receiver_id: MOCK_RECEIVER_ID,
        content,
      })
      .select()
      .single();

    if (data) {
      setMessages((prev) => [...prev, data]);
    }
    if (error) console.log("Send error:", error);
    setSending(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--accent-green)" }} />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6"
        style={{ backgroundColor: "var(--background)" }}>
        <p className="text-4xl">💬</p>
        <p className="font-semibold" style={{ color: "var(--foreground)" }}>
          Sign in to chat
        </p>
        <button
          onClick={() => window.location.href = "/onboarding"}
          className="px-6 py-3 rounded-2xl font-semibold text-white"
          style={{ backgroundColor: "var(--accent-green)" }}>
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pt-16">
        {messages.length === 0 ? (
          <div className="text-center py-12" style={{ color: "var(--muted)" }}>
            <p className="text-4xl mb-3">💬</p>
            <p>No messages yet</p>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-3 flex ${msg.sender_id === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className="px-4 py-2 rounded-2xl max-w-xs text-sm"
                style={{
                  backgroundColor: msg.sender_id === userId ? "var(--accent-green)" : "var(--card)",
                  color: msg.sender_id === userId ? "#000" : "var(--foreground)",
                }}
              >
                {msg.content}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2" style={{ borderColor: "var(--border)" }}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          className="flex-1 px-4 py-2 rounded-2xl resize-none text-sm"
          style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}
          rows={1}
        />
        <button
          onClick={sendMessage}
          disabled={sending || !newMessage.trim()}
          className="px-4 py-2 rounded-2xl font-semibold text-white disabled:opacity-50 text-sm"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          {sending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
```

### app/create/page.tsx
```typescript
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

export default function Create() {
  const [step, setStep] = useState<"pick" | "caption" | "done">("pick");
  const [selectedGradient, setSelectedGradient] = useState(gradients[0]);
  const [playlistName, setPlaylistName] = useState("");
  const [caption, setCaption] = useState("");
  const [saving, setSaving] = useState(false);

  const handlePost = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user?.id)
      .single();

    const { error } = await supabase
      .from("posts")
      .insert({
        user_id: user?.id,
        display_name: profile?.display_name ?? "anonymous",
        playlist_name: playlistName,
        caption,
        cover_from: selectedGradient.from,
        cover_to: selectedGradient.to,
        likes: 0,
      });

    setSaving(false);
    if (error) {
      alert(error.message);
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
          onClick={() => { setStep("pick"); setPlaylistName(""); setCaption(""); }}
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
          <span className="text-white text-lg font-bold">🎵 {playlistName || "Playlist Name"}</span>
        </div>

        {/* Form */}
        <div className="px-4 gap-4 flex flex-col">
          <div>
            <label className="text-xs font-semibold uppercase mb-2 block" style={{ color: "var(--muted)" }}>
              Playlist Name
            </label>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
              className="w-full px-4 py-3 rounded-xl text-sm border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase mb-2 block" style={{ color: "var(--muted)" }}>
              Caption (optional)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 rounded-xl text-sm border resize-none"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
              rows={4}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b"
        style={{ borderColor: "var(--border)" }}>
        <span className="font-semibold">pick a vibe</span>
        <button
          onClick={() => setStep("caption")}
          disabled={false}
          className="ml-auto px-4 py-1.5 rounded-full text-sm font-bold text-black"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          next
        </button>
      </div>

      <div className="px-4 py-6 flex flex-col gap-4">
        {gradients.map((gradient) => (
          <button
            key={gradient.name}
            onClick={() => setSelectedGradient(gradient)}
            className={`h-24 rounded-2xl border-2 transition-all ${selectedGradient.name === gradient.name ? "border-green-500 scale-105" : ""}`}
            style={{
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              borderColor: selectedGradient.name === gradient.name ? "var(--accent-green)" : "transparent",
            }}
          >
            <span className="text-white font-semibold">{gradient.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

### app/discover/page.tsx
```typescript
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
    host: "ash",
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
  { id: 2, name: "san", genres: ["R&B", "Pop"], match: 84 },
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

          {/* Rooms List */}
          {activeRooms.map((room) => (
            <div
              key={room.id}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "var(--card)" }}
            >
              <div
                className="h-28 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${room.coverFrom}, ${room.coverTo})`,
                }}
              >
                <span className="text-white text-lg font-bold">🎵 {room.playlist}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>
                  {room.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
                  Hosted by <span className="font-semibold">@{room.host}</span> • {room.listeners} listening
                </p>
                <button
                  className="w-full py-2 rounded-xl text-sm font-semibold text-black"
                  style={{ backgroundColor: "var(--accent-green)" }}
                >
                  Join Room
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* People Tab */}
      {activeTab === "people" && (
        <div className="px-4 flex flex-col gap-4 pb-24">
          {suggestions.map((person) => (
            <div
              key={person.id}
              className="rounded-2xl p-4 flex items-center justify-between"
              style={{ backgroundColor: "var(--card)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    background: `linear-gradient(135deg, var(--accent-green), var(--accent-purple))`,
                  }}
                >
                  {person.name[0].toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: "var(--foreground)" }}>
                    @{person.name}
                  </h4>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {person.genres.join(", ")}
                  </p>
                </div>
              </div>
              <button
                className="px-4 py-2 rounded-full text-xs font-bold text-black"
                style={{ backgroundColor: "var(--accent-green)" }}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### app/onboarding/page.tsx
```typescript
"use client";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";

const genres = ["Indie", "Alt-Rock", "Hyperpop", "R&B", "Lo-fi", "Pop", "Jazz", "Metal", "Classical", "Hip-Hop"];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) return prev.filter((g) => g !== genre);
      if (prev.length >= 5) return prev;
      return [...prev, genre];
    });
  };

  const handleSignUp = async () => {
    if (!email) return;
    const { data, error } = await supabase.auth.signUp({
      email,
      password: "spoton2026!",
    });
    if (error) {
      alert(error.message);
    } else {
      setUserId(data.user?.id ?? null);
      setStep(3);
    }
  };

  const handleFinish = async () => {
    if (!userId) {
      alert("Session error — please try again");
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        display_name: displayName,
        top_genres: selectedGenres.join(","),
      });
    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/";
    }
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
            connect with people through music.
            no real name. no phone number.
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
          by continuing you agree to our terms.
          we never sell your data. ever.
        </p>
      </div>
    );
  }

  // Step 2 — Email
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">what's your email?</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            we'll keep it safe. you can delete your account anytime.
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
          <button
            onClick={handleSignUp}
            disabled={!email}
            className="w-full py-4 rounded-2xl font-bold text-black text-sm disabled:opacity-40"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            continue
          </button>
        </div>
      </div>
    );
  }

  // Step 3 — Profile Setup
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">complete your profile</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          this is how others will know you. no real name needed.
        </p>
      </div>

      <div className="w-full flex flex-col gap-6">
        {/* Display Name */}
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

        {/* Genre Selection */}
        <div>
          <label className="text-xs font-semibold uppercase mb-3 block" style={{ color: "var(--muted)" }}>
            Top 5 Genres ({selectedGenres.length}/5)
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  selectedGenres.includes(genre)
                    ? "text-black"
                    : ""
                }`}
                style={{
                  backgroundColor: selectedGenres.includes(genre)
                    ? "var(--accent-green)"
                    : "transparent",
                  borderColor: "var(--border)",
                  color: selectedGenres.includes(genre) ? "#000" : "var(--muted)",
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Finish Button */}
        <button
          onClick={handleFinish}
          disabled={!displayName.trim() || selectedGenres.length === 0}
          className="w-full py-4 rounded-2xl font-bold text-black text-sm disabled:opacity-40"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          finish setup
        </button>
      </div>
    </div>
  );
}
```

### app/profile/page.tsx
```typescript
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
          🌙
        </button>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 rounded-2xl p-6"
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{
              background: `linear-gradient(135deg, var(--accent-green), var(--accent-purple))`,
            }}
          >
            {initials}
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              {displayName}
            </h2>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              @{displayName.toLowerCase().replace(/\s/g, "")}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4" style={{ backgroundColor: "var(--border)", height: "1px" }} />

        {/* Genres */}
        <div>
          <p className="text-xs font-semibold uppercase mb-3" style={{ color: "var(--muted)" }}>
            Top Genres
          </p>
          {genres.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "var(--accent-green)", color: "#000" }}
                >
                  {genre}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              No genres selected yet
            </p>
          )}
        </div>
      </motion.div>

      {/* Logout */}
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/";
        }}
        className="mt-6 mx-4 w-full px-6 py-3 rounded-2xl font-semibold border text-sm"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        Log Out
      </button>
    </main>
  );
}
```

---

## Components

### app/components/BottomNav.tsx
```typescript
"use client";

import { Home, Compass, PlusCircle, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Discover", href: "/discover" },
  { icon: PlusCircle, label: "Create", href: "/create" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: User, label: "Profile", href: "/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t z-50"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
      <div className="max-w-md mx-auto flex items-center justify-around py-3">
        {tabs.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1">
              <Icon
                size={22}
                style={{ color: isActive ? "var(--accent-green)" : "var(--muted)" }}
              />
              <span className="text-xs" style={{ color: isActive ? "var(--accent-green)" : "var(--muted)" }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### app/components/SplashScreen.tsx
```typescript
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) {
      const timer = setTimeout(onDone, 600);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  const logoSize    = 120;
  const textVisualH = Math.round(logoSize * 0.66);
  const textImgH    = Math.round(textVisualH / 0.22);
  const textWidth   = Math.round(textImgH * 0.58);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--background)" }}
        >
          {/* S + POTON same line */}
          <motion.div
            style={{ display: "flex", alignItems: "center" }}
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: [0.1, 1.15, 0.95, 1], opacity: 1 }}
            transition={{
              duration: 0.8,
              times: [0, 0.6, 0.8, 1],
              ease: "easeOut",
            }}
          >
            {/* S circle */}
            <img
              src="/logo.png"
              alt="S"
              style={{
                width: logoSize,
                height: logoSize,
                objectFit: "contain",
                display: "block",
              }}
            />

            {/* POTON */}
            <div
              style={{
                height: textVisualH,
                width: textWidth,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginLeft: -90,
                marginTop: 12,
              }}
            >
              <img
                src="/logo-text.png"
                alt="POTON"
                style={{
                  height: textImgH,
                  width: "auto",
                  display: "block",
                  flexShrink: 0,
                }}
              />
            </div>
          </motion.div>

          {/* Soundwave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="flex items-center gap-1 mt-8"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ backgroundColor: "var(--accent-green)" }}
                animate={{ height: ["8px", "24px", "8px"] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## Library

### app/lib/supabase.ts
```typescript
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## End of Archive

This archive contains all the code from the SPOTON project as of May 23, 2026.
All files are included for reference purposes only.
