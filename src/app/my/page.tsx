"use client";

import {
  Crown, Download, Heart, Clock, Settings, ChevronRight,
  Bell, HelpCircle, LogOut, FileText, Gift, Star,
} from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { mockItems } from "@/lib/mockData";
import { useRouter } from "next/navigation";

const stats = [
  { label: "다운로드", value: "47", icon: Download, path: "/my/downloads" },
  { label: "찜 목록", value: "128", icon: Heart, path: "/like" },
  { label: "최근 본", value: "23", icon: Clock, path: "/my/recent" },
];

type MenuItem = { icon: React.ElementType; label: string; badge: string | null; danger?: boolean; path: string | null };
import type React from "react";

const menuGroups: { items: MenuItem[] }[] = [
  {
    items: [
      { icon: Download, label: "다운로드 이력", badge: null, path: "/my/downloads" },
      { icon: Heart, label: "찜한 콘텐츠", badge: "128", path: "/like" },
      { icon: Clock, label: "최근 본 콘텐츠", badge: null, path: "/my/recent" },
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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between">
        <h1 className="text-base font-bold text-gray-900">MY</h1>
        <button className="p-1">
          <Settings size={20} className="text-gray-600" />
        </button>
      </header>

      {/* 프로필 */}
      <div className="bg-white px-5 pt-5 pb-5 mb-3">
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--ck-primary), var(--ck-primary-dark))" }}
          >
            박
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-gray-900">박초롬님</p>
            <p className="text-xs text-gray-400 truncate">example@email.com</p>
          </div>
          <button
            className="text-xs font-semibold px-3 py-1.5 rounded-full border flex-shrink-0"
            style={{ borderColor: "var(--ck-primary)", color: "var(--ck-primary)" }}
          >
            프로필 편집
          </button>
        </div>

        {/* 멤버십 뱃지 */}
        <button
          onClick={() => router.push("/membership")}
          className="w-full rounded-2xl p-3.5 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #F1E9FD, #E9DAFB)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--ck-primary)" }}
            >
              <Crown size={15} fill="white" className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold" style={{ color: "var(--ck-primary-dark)" }}>무료 회원</p>
              <p className="text-[11px]" style={{ color: "var(--ck-primary)" }}>멤버십 시작하고 무제한 이용하기 →</p>
            </div>
          </div>
          <Star size={16} style={{ color: "var(--ck-primary)" }} />
        </button>
      </div>

      {/* 활동 통계 */}
      <div className="bg-white mx-0 mb-3 px-5 py-4">
        <div className="flex items-center justify-around">
          {stats.map(({ label, value, icon: Icon, path }) => (
            <button key={label} onClick={() => router.push(path)} className="flex flex-col items-center gap-1">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center mb-0.5"
                style={{ backgroundColor: "#F1E9FD" }}
              >
                <Icon size={18} style={{ color: "var(--ck-primary)" }} />
              </div>
              <span className="text-base font-bold text-gray-900">{value}</span>
              <span className="text-[11px] text-gray-400">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 최근 찜한 콘텐츠 미리보기 */}
      <div className="bg-white mb-3 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-800">찜한 콘텐츠</p>
          <button onClick={() => router.push("/like")} className="text-xs font-medium" style={{ color: "var(--ck-primary)" }}>전체보기</button>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {likedItems.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(`/content/${item.id}`)}
              className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              {item.isPremium && (
                <div className="absolute top-1 right-1 bg-black/60 rounded-full px-1 py-0.5">
                  <span className="text-[8px] text-white font-bold">PRO</span>
                </div>
              )}
            </button>
          ))}
          <button className="flex-shrink-0 w-20 h-20 rounded-xl bg-gray-100 flex flex-col items-center justify-center gap-1">
            <span className="text-[11px] text-gray-400 font-medium">+124</span>
            <span className="text-[10px] text-gray-400">더보기</span>
          </button>
        </div>
      </div>

      {/* 메뉴 그룹 */}
      {menuGroups.map((group, gi) => (
        <div key={gi} className="bg-white mb-3">
          {group.items.map(({ icon: Icon, label, badge, danger, path }, i) => (
            <button
              key={label}
              onClick={() => path && router.push(path)}
              className={`w-full flex items-center gap-3 px-5 py-4 ${
                i < group.items.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <Icon
                size={18}
                className={danger ? "text-red-400" : "text-gray-500"}
              />
              <span className={`flex-1 text-sm text-left ${danger ? "text-red-400" : "text-gray-700"}`}>
                {label}
              </span>
              {badge && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: "var(--ck-primary)" }}
                >
                  {badge}
                </span>
              )}
              {!danger && <ChevronRight size={15} className="text-gray-300" />}
            </button>
          ))}
        </div>
      ))}

      <p className="text-center text-[11px] text-gray-300 py-4">v1.0.0 · 클립아트코리아</p>

      <BottomNav />
    </div>
  );
}
