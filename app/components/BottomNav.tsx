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

const HIDDEN_ON = ["/onboarding"];

export default function BottomNav() {
  const pathname = usePathname();

  if (HIDDEN_ON.includes(pathname)) return null;

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