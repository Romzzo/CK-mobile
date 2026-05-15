"use client";

import { Home, Search, Heart, Flame, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 2번째 슬롯은 "업데이트(/update)" 와 "카테고리(/category)" 중 택1.
// 카테고리 페이지는 /category 로 살아 있으므로(홈 CategoryCards "전체 보기" 로 진입 가능),
// 필요할 때 SECONDARY_TAB 만 교체해 되돌릴 수 있음.
// 카테고리 버전으로 돌리려면:
//   1) 위 lucide import 에 LayoutGrid 추가
//   2) 아래 SECONDARY_TAB 를 { label: "카테고리", icon: LayoutGrid, path: "/category" } 로 교체
const SECONDARY_TAB = { label: "업데이트", icon: Flame, path: "/update" };

const navItems = [
  { label: "홈", icon: Home, path: "/" },
  SECONDARY_TAB,
  { label: "검색", icon: Search, path: "/search" },
  { label: "좋아요", icon: Heart, path: "/like" },
  { label: "MY", icon: User, path: "/my" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-nav w-full max-w-[480px] -translate-x-1/2 border-t border-line"
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
                fill={active && label === "좋아요" ? "var(--brand)" : "none"}
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
