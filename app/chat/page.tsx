"use client";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "Ashli",
    lastMessage: "omg this playlist is everything 😭",
    time: "2m ago",
    unread: 2,
    playlistForMe: "Late Night Drive",
    coverFrom: "#0f3460",
    coverTo: "#1DB954",
  },
  {
    id: 2,
    name: "Adi",
    lastMessage: "made you something 🎵",
    time: "1h ago",
    unread: 1,
    playlistForMe: "hyperpop brain rot",
    coverFrom: "#1a1a2e",
    coverTo: "#e94560",
  },
  {
    id: 3,
    name: "Deepa",
    lastMessage: "listen to this rn trust",
    time: "3h ago",
    unread: 0,
    playlistForMe: "Serotonin Boost",
    coverFrom: "#4a0e8f",
    coverTo: "#9B59B6",
  },
];

const mockMessages = [
  { id: 1, from: "them", text: "hey! made you a playlist 🎵" },
  { id: 2, from: "me", text: "wait already?? let me listen" },
  { id: 3, from: "them", text: "it's giving late night drive vibes" },
  { id: 4, from: "me", text: "this is so accurate omg" },
  { id: 5, from: "them", text: "i KNOW you 😭" },
];

export default function Chat() {
  const [activeChat, setActiveChat] = useState<null | typeof conversations[0]>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: messages.length + 1, from: "me", text: message }]);
    setMessage("");
  };

  if (activeChat) {
    return (
      <div className="min-h-screen flex flex-col">

        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b"
          style={{ borderColor: "var(--border)" }}>
          <button onClick={() => setActiveChat(null)}
            className="text-xl" style={{ color: "var(--muted)" }}>
            ←
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: "var(--accent-purple)" }}>
            {activeChat.name[0]}
          </div>
          <span className="font-semibold">{activeChat.name}</span>
        </div>

        {/* Playlist Banner — the signature feature! */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden border"
          style={{ borderColor: "var(--border)" }}>
          <div className="h-16 flex items-center gap-3 px-4"
            style={{ background: `linear-gradient(135deg, ${activeChat.coverFrom}, ${activeChat.coverTo})` }}>
            <span className="text-2xl">🎵</span>
            <div className="flex-1">
              <p className="text-white text-xs font-semibold">
                {activeChat.name} made this for you
              </p>
              <p className="text-white font-bold">{activeChat.playlistForMe}</p>
            </div>
            <button className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              ▶ play
            </button>
          </div>
        </div>

        {/* Make them a playlist button */}
        <div className="mx-4 mt-2">
          <button className="w-full py-2.5 rounded-xl border border-dashed text-sm font-medium"
            style={{ borderColor: "var(--accent-purple)", color: "var(--accent-purple)" }}>
            🎵 make a playlist for {activeChat.name}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-xs px-4 py-2.5 rounded-2xl text-sm"
                style={{
                  backgroundColor: msg.from === "me" ? "var(--accent-green)" : "var(--card)",
                  color: msg.from === "me" ? "#000" : "var(--foreground)",
                  borderRadius: msg.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-4 pb-6 flex gap-2 items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="say something..."
            className="flex-1 px-4 py-3 rounded-full text-sm outline-none border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
            style={{ backgroundColor: "var(--accent-green)" }}
          >
            ↑
          </button>
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
          style={{ backgroundColor: "var(--accent-purple)20", color: "var(--accent-purple)" }}>
          messages
        </span>
      </div>

      {/* Conversation List */}
      <div className="px-4 flex flex-col gap-3">
        {conversations.map((convo) => (
          <button
            key={convo.id}
            onClick={() => setActiveChat(convo)}
            className="flex items-center gap-3 p-4 rounded-2xl border w-full text-left"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          >
            {/* Avatar with playlist color */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${convo.coverFrom}, ${convo.coverTo})` }}>
                {convo.name[0]}
              </div>
              {convo.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-black font-bold"
                  style={{ backgroundColor: "var(--accent-green)" }}>
                  {convo.unread}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{convo.name}</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>{convo.time}</span>
              </div>
              <p className="text-xs truncate" style={{ color: "var(--muted)" }}>
                🎵 {convo.playlistForMe} · {convo.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}