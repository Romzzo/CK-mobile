"use client";

import { Home, Search, Heart, Flame, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";

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

// 현재 경로가 해당 탭 섹션 안인지 판정.
// 홈("/")만 정확히 매칭, 나머지는 자신 또는 자식 경로 매칭.
function isInSection(pathname: string, path: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(path + "/");
}

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // "같은 탭 다시 누르면 섹션 루트로 reset, 이미 루트면 스크롤 최상단"
  // 다른 섹션으로 이동할 땐 Link 기본 동작(push) 유지 → 브라우저 back 동선은 그대로.
  const onTabClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!isInSection(pathname, path)) return; // 다른 섹션이면 Link 기본 동작
    e.preventDefault();
    if (pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // 섹션 내 하위 페이지에서 루트로 — replace 로 history 누적 없이 정리
      router.replace(path);
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-nav w-full max-w-[480px] -translate-x-1/2 border-t border-line"
      style={{ backgroundColor: "rgba(255,255,255,0.96)", backdropFilter: "blur(16px)" }}
    >
      <div className="flex items-stretch px-1" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = isInSection(pathname, path);
          return (
            <Link
              key={path}
              href={path}
              onClick={(e) => onTabClick(e, path)}
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

