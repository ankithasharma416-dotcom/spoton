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
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col pb-24"
      style={{ backgroundColor: "var(--background)" }}>

      {/* Header */}
      <div className="px-4 pt-14 pb-4 border-b"
        style={{ borderColor: "var(--border)" }}>
        <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
          Chat
        </h1>
      </div>

      {/* Playlist Banner — SPOTON signature feature */}
      <div className="mx-4 mt-4 rounded-2xl p-4 flex items-center justify-between"
        style={{ backgroundColor: "var(--card)" }}>
        <div>
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent-green)" }}>
            🎵 PLAYLIST CHAT
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Build a playlist for each other while you chat
          </p>
        </div>
        <button
          className="text-xs px-3 py-2 rounded-xl font-semibold text-white shrink-0 ml-3"
          style={{ backgroundColor: "var(--accent-purple)" }}
        >
          + Add Song
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12"
            style={{ color: "var(--muted)" }}>
            <p className="text-4xl mb-3">🎶</p>
            <p className="text-sm">No messages yet</p>
            <p className="text-xs mt-1">Say hi and share some music!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.sender_id === userId;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-xs px-4 py-2 rounded-2xl text-sm"
                  style={{
                    backgroundColor: isMine ? "var(--accent-green)" : "var(--card)",
                    color: isMine ? "#fff" : "var(--foreground)",
                  }}
                >
                  {msg.content}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 flex gap-2 items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
          style={{
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim() || sending}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0 disabled:opacity-40"
          style={{ backgroundColor: "var(--accent-green)" }}
        >
          ↑
        </button>
      </div>
    </main>
  );
}