"use client";

import { Home, Search, Heart, Crown, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { id: "home", label: "홈", icon: Home, path: "/" },
  { id: "search", label: "검색", icon: Search, path: "/search" },
  { id: "like", label: "찜", icon: Heart, path: "/like" },
  { id: "subscribe", label: "구독", icon: Crown, path: "/membership" },
  { id: "my", label: "MY", icon: User, path: "/my" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = pathname === path || (path !== "/" && pathname.startsWith(path));
          return (
            <button
              key={id}
              className="flex flex-col items-center gap-0.5 flex-1 py-2"
              onClick={() => router.push(path)}
            >
              <Icon
                size={22}
                style={isActive ? { color: "var(--ck-primary)" } : undefined}
                className={isActive ? "" : "text-gray-400"}
                strokeWidth={isActive ? 2.5 : 1.8}
                fill={isActive && id === "like" ? "var(--ck-primary)" : "none"}
              />
              <span
                className="text-[10px] font-medium"
                style={isActive ? { color: "var(--ck-primary)" } : { color: "#9CA3AF" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
