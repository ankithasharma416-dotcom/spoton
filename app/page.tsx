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
                    <div className="flex flex-wrap gap-2">
                      {post.mood_tags.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: "var(--background)", color: "var(--accent-green)" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
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