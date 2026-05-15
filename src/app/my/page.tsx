"use client";

import { ChevronRight, Crown, Zap, Pencil, Heart, HelpCircle, LogOut, User } from "lucide-react";
import type React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import { useAuth } from "@/lib/useAuth";

type MenuItem = { icon: React.ElementType; label: string; danger?: boolean; path: string | null };

const menuGroups: { items: MenuItem[] }[] = [
  {
    items: [
      { icon: Heart, label: "좋아요한 콘텐츠", path: "/like" },
      { icon: Pencil, label: "회원정보 수정", path: "/my/settings" },
      { icon: HelpCircle, label: "고객센터", path: "/help" },
    ],
  },
  {
    items: [{ icon: LogOut, label: "로그아웃", danger: true, path: null }],
  },
];

const licenseScopes = [
  { type: "무료 회원", scope: "이미지 탐색 · 찜하기 가능" },
  { type: "크리에이터", scope: "이미지 월 500컷 · 모션·음원 150개/월" },
  { type: "스탠다드", scope: "무제한 다운로드 · 모션·음원 150개/월" },
  { type: "특약", scope: "계약 범위에 따른 사용 (담당자 문의)" },
];

function CreditBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-4 mt-3 flex gap-3 rounded-2xl border border-line bg-surface px-5 py-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--brand-soft)" }}>
        <Zap size={16} style={{ color: "var(--brand)" }} />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export default function MyPage() {
  const router = useRouter();
  const { isLoggedIn, mounted, logout } = useAuth();

  const handleMenuClick = (item: MenuItem) => {
    if (item.label === "로그아웃") {
      logout();
      router.push("/");
      return;
    }
    if (item.path) router.push(item.path);
  };

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title="MY" fallbackHref="/" />

      {!mounted ? (
        /* ── 하이드레이션 직후, 인증 상태 확정 전: 깜빡임 방지용 빈 영역 ── */
        <div aria-hidden className="min-h-[40vh]" />
      ) : !isLoggedIn ? (
        /* ── 비로그인 상태 ── */
        <>
          <div className="flex flex-col items-center px-8 pt-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl" style={{ backgroundColor: "var(--brand-soft)" }}>
              <User size={28} style={{ color: "var(--brand)" }} />
            </div>
            <p className="mt-4 text-[17px] font-bold text-ink">로그인하고 내 정보를 확인하세요</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-mute">
              찜한 콘텐츠 · 라이선스 · AI 크레딧을 한 곳에서 관리할 수 있어요
            </p>
          </div>

          <div className="mt-7 px-4">
            <Link
              href="/login"
              className="flex items-center justify-center rounded-xl py-3.5 text-[15px] font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              로그인
            </Link>
            <p className="mt-3 text-center text-[13px] text-ink-mute">
              아직 회원이 아니신가요?{" "}
              <Link href="/signup" className="font-bold text-brand">무료 회원가입</Link>
            </p>
          </div>

          {/* 비로그인에서도 가능한 메뉴 */}
          <div className="mx-4 mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
            <Link href="/help" className="flex w-full items-center gap-3 px-5 py-4">
              <HelpCircle size={18} className="text-ink-mute" />
              <span className="flex-1 text-left text-[14px] text-ink-soft">고객센터</span>
              <ChevronRight size={15} className="text-ink-mute" />
            </Link>
          </div>
        </>
      ) : (
        /* ── 로그인 상태 ── */
        <>
          {/* 프로필 카드 */}
          <div className="mx-4 mt-4 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[20px] font-bold text-white" style={{ backgroundColor: "var(--brand)" }}>
              박
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[16px] font-bold text-ink">박초롬</p>
                <span className="text-[12px] text-ink-mute">|</span>
                <span className="shrink-0 text-[12px] font-semibold text-ink-soft">무료 회원</span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-ink-mute">example@email.com</p>
            </div>
            <button
              className="inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-semibold"
              style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
            >
              <Pencil size={12} />
              정보 수정
            </button>
          </div>

          {/* 멤버십 배너 */}
          {/* 무료 회원 */}
          <Link
            href="/membership"
            className="mx-4 mt-3 flex items-center gap-3 rounded-2xl px-5 py-4"
            style={{ backgroundColor: "var(--brand-soft)" }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--brand)" }}>
              <Crown size={16} fill="white" className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold" style={{ color: "var(--brand-strong)" }}>무료 회원</p>
              <p className="mt-0.5 text-[12px]" style={{ color: "var(--brand)" }}>멤버십 시작하고 무제한 이용하기 →</p>
            </div>
          </Link>

          {/* 유료 회원 */}
          <Link
            href="/membership"
            className="mx-4 mt-3 flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-white"
            style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <Crown size={16} fill="white" className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold">스탠다드 55</p>
                <p className="mt-0.5 text-[11px] text-white/80">2026.08.31 만료 · D-80</p>
              </div>
            </div>
            <span className="shrink-0 text-[12px] font-semibold">멤버십 보기 →</span>
          </Link>

          {/* AI 스튜디오 크레딧 — mock 3종. 충전·구매는 PC 웹에서. */}
          {/* 크레딧 있음 (무료/유료 공통) */}
          <CreditBlock>
            <p className="text-[14px] font-bold text-ink">AI 스튜디오 크레딧</p>
            <p className="mt-0.5 text-[12px] text-ink-soft">잔여 2,450 C</p>
          </CreditBlock>
          {/* 크레딧 없음 */}
          <CreditBlock>
            <p className="text-[14px] font-bold text-ink">AI 스튜디오 크레딧</p>
            <p className="mt-0.5 text-[12px] text-ink-mute">잔여 크레딧이 없습니다.</p>
          </CreditBlock>
          {/* 유료 회원 (자동 지급) */}
          <CreditBlock>
            <p className="text-[14px] font-bold text-ink">AI 스튜디오 크레딧</p>
            <p className="mt-0.5 text-[12px] text-ink-soft">잔여 2,450 C</p>
            <p className="mt-0.5 text-[11px] text-ink-mute">매월 3,000C 자동 지급 · 다음 지급일 06.01</p>
          </CreditBlock>

          {/* 라이선스 사용범위 */}
          <div className="mx-4 mt-3 rounded-2xl border border-line bg-surface px-5 py-4">
            <p className="text-[14px] font-bold text-ink">라이선스 사용범위</p>
            <div className="mt-3 flex flex-col gap-2">
              {licenseScopes.map(({ type, scope }) => (
                <div key={type} className="flex gap-2 text-[12px]">
                  <span className="w-16 shrink-0 font-bold text-ink">{type}</span>
                  <span className="min-w-0 flex-1 text-ink-soft">{scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 메뉴 그룹 */}
          {menuGroups.map((group, gi) => (
            <div key={gi} className="mx-4 mt-3 overflow-hidden rounded-2xl border border-line bg-surface">
              {group.items.map(({ icon: Icon, label, danger, path }, i) => (
                <button
                  key={label}
                  onClick={() => handleMenuClick({ icon: Icon, label, danger, path })}
                  className={`flex w-full items-center gap-3 px-5 py-4 ${i < group.items.length - 1 ? "border-b border-line" : ""}`}
                >
                  <Icon size={18} className={danger ? "text-danger" : "text-ink-mute"} />
                  <span className={`flex-1 text-left text-[14px] ${danger ? "text-danger" : "text-ink-soft"}`}>{label}</span>
                  {!danger && <ChevronRight size={15} className="text-ink-mute" />}
                </button>
              ))}
            </div>
          ))}

          <p className="py-5 text-center text-[11px] text-ink-mute">v1.0.0 · 클립아트코리아</p>
        </>
      )}

      <BottomNav />
    </div>
  );
}
