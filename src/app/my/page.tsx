"use client";

import {
  Crown, Download, Heart, Settings, ChevronRight,
  Bell, HelpCircle, LogOut, FileText, Gift, Star,
} from "lucide-react";
import type React from "react";
import BottomNav from "@/components/layout/BottomNav";
import { mockItems } from "@/lib/mockData";
import { useRouter } from "next/navigation";

const stats = [
  { label: "다운로드", value: "47", icon: Download, path: "/my/downloads" },
  { label: "찜 목록", value: "128", icon: Heart, path: "/like" },
];

type MenuItem = { icon: React.ElementType; label: string; badge: string | null; danger?: boolean; path: string | null };

const menuGroups: { items: MenuItem[] }[] = [
  {
    items: [
      { icon: Download, label: "다운로드 이력", badge: null, path: "/my/downloads" },
      { icon: Heart, label: "찜한 콘텐츠", badge: "128", path: "/like" },
      { icon: Gift, label: "쿠폰 / 포인트", badge: "2", path: "/my/coupons" },
    ],
  },
  {
    items: [
      { icon: Bell, label: "알림 설정", badge: null, path: "/my/settings" },
      { icon: Settings, label: "계정 설정", badge: null, path: "/my/settings" },
      { icon: FileText, label: "이용약관 / 개인정보", badge: null, path: null },
      { icon: HelpCircle, label: "고객센터", badge: null, path: null },
    ],
  },
  {
    items: [
      { icon: LogOut, label: "로그아웃", badge: null, danger: true, path: null },
    ],
  },
];

const likedItems = mockItems.filter((_, i) => i % 3 === 0).slice(0, 4);

export default function MyPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <header
        className="pt-safe sticky top-0 z-40 border-b border-line"
        style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)" }}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className="text-[16px] font-bold text-ink">MY</h1>
          <button aria-label="설정" onClick={() => router.push("/my/settings")} className="-mr-2 p-2.5 text-ink-soft">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* 프로필 */}
      <div className="mx-4 mt-4 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[20px] font-bold text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            박
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-bold text-ink">박초롬님</p>
            <p className="truncate text-[12px] text-ink-mute">example@email.com</p>
          </div>
          <button
            className="shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold"
            style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
          >
            프로필 편집
          </button>
        </div>

        <button
          onClick={() => router.push("/membership")}
          className="mt-4 flex w-full items-center justify-between rounded-xl p-3.5"
          style={{ backgroundColor: "var(--brand-soft)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{ backgroundColor: "var(--brand)" }}
            >
              <Crown size={15} fill="white" className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-[12px] font-bold" style={{ color: "var(--brand-strong)" }}>무료 회원</p>
              <p className="text-[11px]" style={{ color: "var(--brand)" }}>멤버십 시작하고 무제한 이용하기 →</p>
            </div>
          </div>
          <Star size={16} style={{ color: "var(--brand)" }} />
        </button>
      </div>

      {/* 활동 통계 */}
      <div className="mx-4 mt-3 rounded-2xl border border-line bg-surface px-5 py-4">
        <div className="flex items-center justify-around">
          {stats.map(({ label, value, icon: Icon, path }) => (
            <button key={label} onClick={() => router.push(path)} className="flex flex-col items-center gap-1">
              <div
                className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "var(--brand-soft)" }}
              >
                <Icon size={18} style={{ color: "var(--brand)" }} />
              </div>
              <span className="text-[16px] font-bold text-ink">{value}</span>
              <span className="text-[11px] text-ink-mute">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 찜한 콘텐츠 미리보기 */}
      <div className="mx-4 mt-3 rounded-2xl border border-line bg-surface px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[14px] font-bold text-ink">찜한 콘텐츠</p>
          <button onClick={() => router.push("/like")} className="text-[13px] font-medium text-ink-mute">전체 보기</button>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {likedItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(`/content/${item.id}`)}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
              {item.isPremium && (
                <div className="absolute right-1 top-1 rounded-full bg-black/55 px-1 py-0.5">
                  <span className="text-[8px] font-bold text-white">PRO</span>
                </div>
              )}
            </button>
          ))}
          <button
            onClick={() => router.push("/like")}
            className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl bg-surface-muted"
          >
            <span className="text-[11px] font-semibold text-ink-soft">+124</span>
            <span className="text-[10px] text-ink-mute">더보기</span>
          </button>
        </div>
      </div>

      {/* 메뉴 그룹 */}
      {menuGroups.map((group, gi) => (
        <div key={gi} className="mx-4 mt-3 overflow-hidden rounded-2xl border border-line bg-surface">
          {group.items.map(({ icon: Icon, label, badge, danger, path }, i) => (
            <button
              key={label}
              onClick={() => path && router.push(path)}
              className={`flex w-full items-center gap-3 px-5 py-4 ${i < group.items.length - 1 ? "border-b border-line" : ""}`}
            >
              <Icon size={18} className={danger ? "text-danger" : "text-ink-mute"} />
              <span className={`flex-1 text-left text-[14px] ${danger ? "text-danger" : "text-ink-soft"}`}>{label}</span>
              {badge && (
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: "var(--brand)" }}>
                  {badge}
                </span>
              )}
              {!danger && <ChevronRight size={15} className="text-ink-mute" />}
            </button>
          ))}
        </div>
      ))}

      <p className="py-5 text-center text-[11px] text-ink-mute">v1.0.0 · 클립아트코리아</p>

      <BottomNav />
    </div>
  );
}
