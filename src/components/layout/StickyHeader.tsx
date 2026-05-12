"use client";

import { Search, Bell, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface StickyHeaderProps {
  showSearch: boolean;
}

export default function StickyHeader({ showSearch }: StickyHeaderProps) {
  const router = useRouter();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: showSearch ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: showSearch ? "blur(12px)" : "none",
        borderBottom: showSearch ? "1px solid rgba(0,0,0,0.06)" : "none",
        boxShadow: showSearch ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="flex items-center gap-3 px-4 h-14">
        {/* 로고 */}
        <span
          className="flex-shrink-0 text-sm font-bold tracking-tight transition-colors duration-300"
          style={{ color: showSearch ? "#111" : "#fff" }}
        >
          CLIPART<span className="font-light">KOREA</span>
        </span>

        {/* 검색바 — showSearch 일 때만 확장 */}
        <button
          onClick={() => router.push("/search")}
          className="flex-1 flex items-center gap-2 rounded-full px-3.5 h-9 text-sm transition-all duration-300 overflow-hidden"
          style={{
            opacity: showSearch ? 1 : 0,
            pointerEvents: showSearch ? "auto" : "none",
            backgroundColor: "#F3F4F6",
          }}
        >
          <Search size={14} className="text-gray-400 flex-shrink-0" />
          <span className="text-gray-400 text-xs truncate">이미지, 아이콘, 폰트 검색</span>
        </button>

        {/* 아이콘 */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button className="relative p-2">
            <Bell
              size={20}
              className="transition-colors duration-300"
              style={{ color: showSearch ? "#374151" : "#fff" }}
            />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400" />
          </button>
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={showSearch
              ? { backgroundColor: "var(--ck-primary)", color: "#fff" }
              : { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }
            }
          >
            <User size={13} />
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
