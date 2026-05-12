"use client";

import { Home, Search, Heart, Crown, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "홈", icon: Home, path: "/" },
  { label: "검색", icon: Search, path: "/search" },
  { label: "찜", icon: Heart, path: "/like" },
  { label: "멤버십", icon: Crown, path: "/membership" },
  { label: "MY", icon: User, path: "/my" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 border-t border-line"
      style={{ backgroundColor: "rgba(255,255,255,0.96)", backdropFilter: "blur(16px)" }}
    >
      <div className="flex items-stretch px-1" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = path === "/" ? pathname === "/" : pathname.startsWith(path);
          return (
            <Link
              key={path}
              href={path}
              className="flex h-[58px] flex-1 flex-col items-center justify-center gap-0.5"
            >
              <Icon
                size={21}
                strokeWidth={active ? 2.4 : 1.8}
                className={active ? "" : "text-ink-mute"}
                style={active ? { color: "var(--brand)" } : undefined}
                fill={active && label === "찜" ? "var(--brand)" : "none"}
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: active ? "var(--brand)" : "var(--ink-mute)" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
