"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, AlertTriangle, Sparkles, Image, Type, MapPin } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import { useAuth } from "@/lib/useAuth";

const benefits = [
  {
    icon: Sparkles,
    title: "AI 이미지",
    desc: "매일 갱신되는 멤버십 전용 AI 이미지를 무료로",
    badge: "매일 1컷 무료",
    href: "/category/ai",
    thumb: "https://picsum.photos/seed/free-ai/400/300",
  },
  {
    icon: Image,
    title: "무료 이미지",
    desc: "포토·일러스트·PPT 등 5만+ 무료 전용 콘텐츠",
    badge: "매일 5컷 무료",
    href: "/category/illust",
    thumb: "https://picsum.photos/seed/free-img/400/300",
  },
  {
    icon: Type,
    title: "폰트",
    desc: "저작권 클린 폰트, 상업적으로 안심하고 사용",
    badge: "무제한 무료",
    href: "/search?q=폰트",
    thumb: "https://picsum.photos/seed/free-font/400/300",
  },
  {
    icon: MapPin,
    title: "K-이미지",
    desc: "한국관광공사 제공 공식 K-이미지 컬렉션",
    badge: "매일 20컷 무료",
    href: "/search?q=K-이미지",
    thumb: "https://picsum.photos/seed/free-kimg/400/300",
  },
];

const notices = [
  "무료콘텐츠 검색 및 다운로드는 PC(m.clipartkorea.co.kr)에서 가능합니다.",
  "무료 다운로드는 매일 자정 초기화됩니다.",
  "상업적 목적 사용 가능하나, 제품 패키지·재판매 등은 별도 라이선스가 필요합니다.",
  "자세한 이용 범위는 PC에서 이용약관을 확인해 주세요.",
];

export default function FreeContentPage() {
  const [openNotice, setOpenNotice] = useState(true);
  const { isLoggedIn, mounted } = useAuth();

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title="무료 콘텐츠" subtitle="가입만 해도 매일 무료" fallbackHref="/" />

      {/* ── 무료회원 혜택 ── */}
      <section className="px-4 pt-5">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-ink">무료회원 혜택</h2>
          <span className="text-[12px] text-ink-mute">평생 무료, 매일 충전</span>
        </div>
        <p className="mb-3.5 text-[12px] text-ink-mute">매일 자정 충전 · 상업적 이용 가능</p>

        <div className="grid grid-cols-2 gap-2.5">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <Link
                key={b.title}
                href={b.href}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.thumb}
                  alt=""
                  loading="lazy"
                  className="h-[90px] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-4">
                  <div
                    className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "#F3EEFD" }}
                  >
                    <Icon size={17} style={{ color: "#7A3DEA" }} />
                  </div>
                  <p className="text-[13px] font-bold leading-snug text-ink">{b.title}</p>
                  <p className="mt-1 text-[11px] leading-snug text-ink-soft">{b.desc}</p>
                  <span
                    className="mt-3 inline-block self-start rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{ backgroundColor: "#F3EEFD", color: "#7A3DEA" }}
                  >
                    {b.badge}
                  </span>
                </div>
                <ChevronRight
                  size={12}
                  className="absolute bottom-3 right-3 text-ink-mute"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 에디터 30일 무료 프로모션 ──
          비로그인: 가입 유도. 로그인 상태: 에디터 직행.
          mounted=false 인 짧은 동안엔 깜빡임 방지로 비로그인 fallback 안 그림 */}
      {!mounted ? null : isLoggedIn ? (
        <a
          href="https://editor.clipartkorea.co.kr/editor"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mt-4 flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5"
        >
          <div>
            <p className="text-[13px] font-bold text-ink">에디터로 바로 편집하기</p>
            <p className="mt-0.5 text-[11px] text-ink-mute">설치 없이 브라우저에서 바로</p>
          </div>
          <div className="flex items-center gap-0.5 text-[13px] font-semibold" style={{ color: "#7A3DEA" }}>
            열기 <ChevronRight size={15} />
          </div>
        </a>
      ) : (
        <Link
          href="/signup"
          className="mx-4 mt-4 flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5"
        >
          <div>
            <p className="text-[13px] font-bold text-ink">에디터 30일 무료 체험</p>
            <p className="mt-0.5 text-[11px] text-ink-mute">설치 없이 브라우저에서 바로</p>
          </div>
          <div className="flex items-center gap-0.5 text-[13px] font-semibold" style={{ color: "#7A3DEA" }}>
            시작하기 <ChevronRight size={15} />
          </div>
        </Link>
      )}

      {/* ── PC 안내 배너 (이용 안내 위로 이동) ── */}
      <div className="mx-4 mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
        <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
        <p className="text-[12px] leading-relaxed text-amber-800">
          무료 콘텐츠 다운로드는 <strong>PC 웹</strong>에서 가능합니다. 모바일에서는 콘텐츠를 찜하고 PC에서 다운로드하세요.
        </p>
      </div>

      {/* ── 이용 안내 아코디언 (기본 열림) ── */}
      <div className="mx-4 mt-4">
        <button
          onClick={() => setOpenNotice((v) => !v)}
          className="flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-5 py-3.5"
        >
          <span className="text-[13px] font-semibold text-ink">이용 안내</span>
          <ChevronRight
            size={15}
            className="text-ink-mute transition-transform duration-200"
            style={{ transform: openNotice ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </button>
        {openNotice && (
          <ul className="mt-1.5 flex flex-col gap-2.5 rounded-2xl border border-line bg-surface px-5 py-4">
            {notices.map((n) => (
              <li key={n} className="flex gap-2 text-[12px] leading-relaxed text-ink-mute">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-mute" />
                {n}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── 하단 CTA ── 비로그인 한정 (로그인 상태에서는 가입/로그인 CTA 무의미)
          mounted=false 동안엔 안 그림 → "보였다 사라지는" 깜빡임 방지 */}
      {mounted && !isLoggedIn ? (
        <div className="flex flex-col gap-2.5 px-4 pt-6">
          <Link
            href="/signup"
            className="flex items-center justify-center gap-1.5 rounded-2xl py-3.5 text-[14px] font-semibold text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            지금 시작하기 <ChevronRight size={15} />
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-1.5 rounded-2xl border border-line py-3.5 text-[14px] font-semibold text-ink-soft"
          >
            이미 회원이에요
          </Link>
        </div>
      ) : null}

      <BottomNav />
    </div>
  );
}
