"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  AlertTriangle,
  Sparkles,
  Image,
  Type,
  MapPin,
  Pencil,
  UserCheck,
  Search,
  Download,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";

const benefits = [
  {
    icon: Sparkles,
    title: "AI 이미지",
    desc: "매일 갱신되는 멤버십 전용 AI 이미지를 무료로",
    badge: "1컷 / 일",
    color: "#7A3DEA",
    bg: "#F3EEFD",
  },
  {
    icon: Image,
    title: "무료 이미지",
    desc: "포토·일러스트·PPT 등 5만+ 무료 전용 콘텐츠",
    badge: "5컷 / 일",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    icon: Type,
    title: "폰트",
    desc: "저작권 클린 폰트, 상업적으로 안심하고 사용",
    badge: "무제한",
    color: "#16A34A",
    bg: "#F0FDF4",
  },
  {
    icon: MapPin,
    title: "K-이미지",
    desc: "한국관광공사 제공 공식 K-이미지 컬렉션",
    badge: "20컷 / 일",
    color: "#DC2626",
    bg: "#FEF2F2",
  },
];

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "무료 회원가입",
    desc: "이메일 또는 소셜 계정으로 30초 만에 가입",
  },
  {
    step: "02",
    icon: Search,
    title: "콘텐츠 검색",
    desc: "원하는 이미지·폰트·K-이미지를 검색 (PC 권장)",
  },
  {
    step: "03",
    icon: Download,
    title: "무료 다운로드",
    desc: "일별 무료 한도 내에서 즉시 다운로드",
  },
];

const notices = [
  "무료콘텐츠 검색 및 다운로드는 PC(m.clipartkorea.co.kr)에서 가능합니다.",
  "무료 다운로드는 매일 자정 초기화됩니다.",
  "상업적 목적 사용 가능하나, 제품 패키지·재판매 등은 별도 라이선스가 필요합니다.",
  "자세한 이용 범위는 PC에서 이용약관을 확인해 주세요.",
];

export default function FreeContentPage() {
  const [openNotice, setOpenNotice] = useState(false);

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title="무료 콘텐츠" fallbackHref="/" />

      {/* ── 히어로 배너 ── */}
      <section
        className="relative overflow-hidden px-5 pb-8 pt-8"
        style={{ background: "linear-gradient(135deg, #1E1040 0%, #3B1580 60%, #7A3DEA 100%)" }}
      >
        {/* 배경 데코 */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
        />

        <span
          className="inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-widest text-white/70"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          FREE MEMBERSHIP
        </span>
        <h1 className="mt-2.5 text-[22px] font-bold leading-snug text-white">
          매일 무료로 받는<br />
          <span style={{ color: "#C4A8FF" }}>프리미엄 콘텐츠</span>
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-white/70">
          회원가입 한 번으로 AI 이미지·폰트·K-이미지를 매일 무료로
        </p>
        <Link
          href="/signup"
          className="mt-5 inline-flex items-center gap-1.5 rounded-2xl px-5 py-3 text-[14px] font-bold"
          style={{ backgroundColor: "#7A3DEA", color: "#fff" }}
        >
          무료 시작하기 <ChevronRight size={15} />
        </Link>
      </section>

      {/* ── PC 안내 배너 ── */}
      <div className="mx-4 mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
        <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
        <p className="text-[12px] leading-relaxed text-amber-800">
          무료 콘텐츠 다운로드는 <strong>PC 웹</strong>에서 가능합니다. 모바일에서는 콘텐츠를 찜하고 PC에서 다운로드하세요.
        </p>
      </div>

      {/* ── 무료회원 혜택 4종 ── */}
      <section className="px-4 pt-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-ink">무료회원 혜택</h2>
          <span className="text-[12px] text-ink-mute">가입만 해도 평생 무료</span>
        </div>
        <p className="mb-3.5 text-[12px] text-ink-mute">매일 초기화, 상업적 이용 가능</p>

        <div className="grid grid-cols-2 gap-2.5">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="flex flex-col rounded-2xl border border-line bg-surface p-4"
              >
                <div
                  className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: b.bg }}
                >
                  <Icon size={17} style={{ color: b.color }} />
                </div>
                <p className="text-[13px] font-bold leading-snug text-ink">{b.title}</p>
                <p className="mt-1 text-[11px] leading-snug text-ink-soft">{b.desc}</p>
                <span
                  className="mt-3 inline-block self-start rounded-full px-2.5 py-1 text-[10px] font-bold"
                  style={{ backgroundColor: b.bg, color: b.color }}
                >
                  {b.badge}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 에디터 30일 무료 프로모션 배너 ── */}
      <Link
        href="/signup"
        className="relative mx-4 mt-6 flex items-center justify-between overflow-hidden rounded-3xl p-5 text-white"
        style={{ background: "linear-gradient(135deg, #7A3DEA 0%, #5029D2 100%)" }}
      >
        {/* 배경 데코 */}
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-4 right-16 h-16 w-16 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />
        <div className="relative">
          <div className="flex items-center gap-1.5">
            <Pencil size={13} className="text-white/80" />
            <span className="text-[11px] font-semibold text-white/80">에디터 무료 체험</span>
          </div>
          <p className="mt-1 text-[17px] font-bold leading-snug">
            지금 가입하면<br />
            <span style={{ color: "#C4A8FF" }}>30일 무료</span> 사용 가능!
          </p>
          <p className="mt-1 text-[12px] text-white/70">별도 앱 없이 브라우저에서 바로 편집</p>
        </div>
        <div
          className="relative flex shrink-0 items-center gap-1 rounded-2xl px-3.5 py-2.5 text-[12px] font-bold"
          style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#fff" }}
        >
          체험하기 <ChevronRight size={13} />
        </div>
      </Link>

      {/* ── 사용 가이드 (3스텝) ── */}
      <section className="px-4 pt-6">
        <h2 className="mb-3.5 text-[16px] font-bold text-ink">이용 방법</h2>
        <div className="flex flex-col gap-0">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="flex gap-3">
                {/* 스텝 타임라인 */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    {s.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-1 h-8 w-px" style={{ backgroundColor: "var(--line)" }} />
                  )}
                </div>
                {/* 내용 */}
                <div className="pb-5 pt-1.5">
                  <div className="flex items-center gap-1.5">
                    <Icon size={13} className="text-ink-mute" />
                    <p className="text-[13px] font-semibold text-ink">{s.title}</p>
                  </div>
                  <p className="mt-0.5 text-[12px] leading-snug text-ink-mute">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 이용 안내 아코디언 ── */}
      <div className="mx-4 mt-1">
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

      {/* ── 하단 CTA ── */}
      <section className="px-4 pt-7">
        <div className="rounded-3xl border border-line bg-surface px-5 py-6 text-center">
          <p className="text-[15px] font-bold text-ink">지금 바로 시작해보세요</p>
          <p className="mt-1 text-[12px] text-ink-mute">가입 후 즉시 무료 혜택 사용 가능</p>
          <Link
            href="/signup"
            className="mt-4 flex items-center justify-center gap-1.5 rounded-2xl py-3.5 text-[14px] font-semibold text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            무료 회원가입 <ChevronRight size={15} />
          </Link>
          <Link
            href="/login"
            className="mt-2.5 flex items-center justify-center gap-1.5 rounded-2xl border border-line py-3.5 text-[14px] font-semibold text-ink-soft"
          >
            이미 회원이에요
          </Link>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
