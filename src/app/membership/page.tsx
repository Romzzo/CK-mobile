"use client";

import { Check, Crown, ChevronRight, Sparkles, Image, Download, Zap, Pencil, Bot } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";

const PC_MEMBERSHIP_URL = "https://www.clipartkorea.co.kr/membership";

// ─── 타입 ──────────────────────────────────────────────────────────────────
type Plan = {
  id: string;
  name: string;
  tag: string;
  scaleLabel?: string;
  period: string;
  price: string;
  originalPrice?: string;
  perMonth?: string;
  discount?: string;
  recommended?: boolean;
  features: string[];
};

type AIPlan = {
  id: string;
  name: string;
  credits: string;
  price: string;
  period: string;
  recommended?: boolean;
  custom?: boolean;
};

// ─── 라이선스 탭 (2종) ───────────────────────────────────────────────────────
const LICENSE_TABS = [
  { id: "standard", label: "스탠다드" },
  { id: "special",  label: "스페셜" },
] as const;
type LicenseTab = (typeof LICENSE_TABS)[number]["id"];

const USAGE_TYPES = [
  { id: "own",   label: "자사용" },
  { id: "third", label: "타사납품" },
] as const;
type UsageType = (typeof USAGE_TYPES)[number]["id"];

// ─── 스탠다드 플랜 (자사/타사 기준 flat list) ────────────────────────────────
const STANDARD_PLANS: Record<UsageType, Plan[]> = {
  own: [
    {
      id: "std33", name: "스탠다드 33", tag: "이미지 50컷/일 제한형",
      scaleLabel: "개인·중소기업",
      period: "6/12개월", price: "330,000",
      features: ["이미지 50컷/일", "영상·음원 150개/월", "에디터 무제한"],
    },
    {
      id: "std55", name: "스탠다드 55", tag: "이미지·영상·음원 무제한",
      scaleLabel: "개인·중소기업",
      period: "12개월", price: "412,500", originalPrice: "550,000",
      discount: "25%", recommended: true,
      features: ["이미지·영상·음원 무제한", "AI 스튜디오 3,000C/월", "에디터 무제한"],
    },
    {
      id: "std55plus", name: "스탠다드 55+", tag: "무제한 + SNS·입점몰 허용",
      scaleLabel: "개인·중소기업",
      period: "12개월", price: "550,000", originalPrice: "990,000",
      discount: "44%",
      features: ["이미지·영상·음원 무제한", "SNS·블로그·유튜브 허용", "입점몰 상세페이지 허용", "에디터 무제한"],
    },
    {
      id: "std132", name: "스탠다드 132", tag: "이미지 50컷/일 제한형",
      scaleLabel: "관공서·공공기관",
      period: "12개월", price: "990,000",
      features: ["이미지 50컷/일", "영상·음원 150개/월", "관공서·공공기관 자사 사용"],
    },
    {
      id: "std132plus", name: "스탠다드 132+", tag: "무제한 + SNS·입점몰 허용",
      scaleLabel: "관공서·공공기관",
      period: "12개월", price: "1,320,000", recommended: true,
      features: ["이미지·영상·음원 무제한", "SNS·블로그·유튜브 허용", "관공서·공공기관 자사 사용"],
    },
  ],
  third: [
    {
      id: "std88", name: "스탠다드 88", tag: "타사 납품 기본형",
      scaleLabel: "개인·중소기업",
      period: "12개월", price: "660,000", originalPrice: "880,000",
      discount: "25%",
      features: ["타사 납품 허용", "이미지·영상·음원 무제한", "에디터 무제한"],
    },
    {
      id: "std88plus", name: "스탠다드 88+", tag: "납품 + 입점몰 상세페이지",
      scaleLabel: "개인·중소기업",
      period: "12개월", price: "880,000", originalPrice: "1,650,000",
      discount: "47%", recommended: true,
      features: ["타사 납품 + 입점몰 상세페이지", "이미지·영상·음원 무제한", "에디터 무제한"],
    },
    {
      id: "std165", name: "스탠다드 165", tag: "납품 기본형",
      scaleLabel: "관공서·공공기관",
      period: "12개월", price: "1,237,500",
      features: ["타사 납품 허용", "이미지·영상·음원 무제한", "관공서·공공기관 납품"],
    },
    {
      id: "std165plus", name: "스탠다드 165+", tag: "납품 + 입점몰 상세페이지",
      scaleLabel: "관공서·공공기관",
      period: "12개월", price: "1,650,000", recommended: true,
      features: ["납품 + 입점몰 상세페이지", "이미지·영상·음원 무제한"],
    },
  ],
};

// ─── 스페셜 플랜 ────────────────────────────────────────────────────────────
const SPECIAL_PLANS: Plan[] = [
  {
    id: "creator", name: "크리에이터", tag: "유튜버 · SNS · 선생님",
    period: "6개월", price: "132,000", originalPrice: "198,000",
    perMonth: "22,000", discount: "33%", recommended: true,
    features: ["이미지 500컷/월", "영상·음원 150개/월", "5,000종 폰트", "숏폼 세로형 영상", "에디터 무제한"],
  },
  {
    id: "startup", name: "스타트업", tag: "초기창업자 · 1인기업",
    period: "12개월", price: "330,000", originalPrice: "550,000",
    perMonth: "27,500", discount: "40%",
    features: ["이미지 50컷/일", "영상·음원 무제한", "AI 스튜디오 1,000C/월", "에디터 무제한"],
  },
  {
    id: "school", name: "스쿨 라이선스", tag: "학교 · 교육기관",
    period: "12개월", price: "330,000",
    features: ["동시접속 100대", "교육 목적 사용", "이미지·영상·음원 무제한", "에디터 무제한"],
  },
];

// ─── AI 스튜디오 플랜 ──────────────────────────────────────────────────────
const AI_PLANS: AIPlan[] = [
  { id: "lite",   name: "LITE PACK",   credits: "8,000C",  price: "11,000", period: "1개월" },
  { id: "plus",   name: "PLUS PACK",   credits: "25,000C", price: "33,000", period: "1개월", recommended: true },
  { id: "pro",    name: "PRO PACK",    credits: "43,000C", price: "55,000", period: "3개월" },
  { id: "custom", name: "CUSTOM PACK", credits: "협의",    price: "협의",   period: "협의",  custom: true },
];

// ─── 무료 혜택 ─────────────────────────────────────────────────────────────
const FREE_BENEFITS = [
  { icon: Image,    label: "K-이미지 무료",   desc: "한국관광공사 공식 이미지" },
  { icon: Download, label: "매주 무료 업데이트", desc: "포토·일러스트 신규 추가" },
  { icon: Pencil,   label: "3,000종 폰트",    desc: "한글·영문 다양한 폰트" },
  { icon: Zap,      label: "PPT 템플릿",      desc: "업무 효율 높이는 템플릿" },
];

const SHARED_BENEFITS = [
  "에디터 편집 — 별도 프로그램 불필요",
  "AI 스튜디오 크레딧 매달 자동 지급",
  "모션·동영상·음원 전 콘텐츠 사용",
  "저작권 안전 보장 상업적 이용 가능",
];

// ─── 플랜 카드 컴포넌트 ────────────────────────────────────────────────────
function PlanCard({ plan, selected, onSelect }: { plan: Plan; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="relative rounded-2xl border-2 bg-surface p-4 text-left transition-colors"
      style={{ borderColor: selected ? "var(--brand)" : "var(--line)" }}
    >
      {plan.recommended && (
        <span
          className="absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
          style={{ backgroundColor: "var(--brand)" }}
        >
          추천
        </span>
      )}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <div
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
            style={{
              borderColor: selected ? "var(--brand)" : "var(--line)",
              backgroundColor: selected ? "var(--brand)" : "transparent",
            }}
          >
            {selected && <Check size={11} className="text-white" strokeWidth={3} />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[14px] font-bold text-ink">{plan.name}</p>
              {plan.scaleLabel && (
                <span
                  className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                  style={{ backgroundColor: "var(--brand-soft)", color: "var(--brand)" }}
                >
                  {plan.scaleLabel}
                </span>
              )}
            </div>
            <p className="text-[10px] text-ink-mute">{plan.tag}</p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          {plan.originalPrice && (
            <p className="text-[10px] text-ink-mute line-through">{plan.originalPrice}원</p>
          )}
          <p className="text-[15px] font-bold leading-tight" style={{ color: "var(--brand)" }}>
            {plan.price}원
          </p>
          <p className="text-[10px] text-ink-mute">{plan.period}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1.5 pl-7">
        {plan.features.map((f) => (
          <div key={f} className="flex items-center gap-1.5">
            <Check size={10} style={{ color: "var(--brand)" }} strokeWidth={2.5} className="shrink-0" />
            <span className="text-[11px] text-ink-soft">{f}</span>
          </div>
        ))}
      </div>
      {plan.discount && (
        <div className="mt-3 flex justify-end pl-7">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{ backgroundColor: "rgba(240,51,75,0.1)", color: "var(--danger)" }}
          >
            {plan.discount} 할인
          </span>
        </div>
      )}
    </button>
  );
}

// ─── 메인 컴포넌트 ─────────────────────────────────────────────────────────
export default function MembershipPage() {
  const [licenseTab, setLicenseTab] = useState<LicenseTab>("standard");
  const [usage, setUsage] = useState<UsageType>("own");
  const [stdSelected, setStdSelected] = useState("std55");
  const [spSelected,  setSpSelected]  = useState("creator");
  const [aiSelected,  setAiSelected]  = useState("plus");

  const stdPlans = STANDARD_PLANS[usage];

  function switchUsage(u: UsageType) {
    setUsage(u);
    const plans = STANDARD_PLANS[u];
    setStdSelected((plans.find(p => p.recommended) ?? plans[0]).id);
  }

  // 하단 CTA는 라이선스 탭 기준
  const ctaName =
    licenseTab === "special"
      ? (SPECIAL_PLANS.find(p => p.id === spSelected)?.name ?? "멤버십")
      : (stdPlans.find(p => p.id === stdSelected)?.name ?? "멤버십");

  const ctaPrice =
    licenseTab === "special"
      ? SPECIAL_PLANS.find(p => p.id === spSelected)?.price
      : stdPlans.find(p => p.id === stdSelected)?.price;

  const ctaPeriod =
    licenseTab === "special"
      ? SPECIAL_PLANS.find(p => p.id === spSelected)?.period
      : stdPlans.find(p => p.id === stdSelected)?.period;

  return (
    <div className="flex min-h-dvh flex-col bg-surface-muted">
      <PageHeader title="멤버십 & 라이선스" />

      <div className="flex-1 overflow-y-auto pb-36">
        {/* 웰컴 배너 */}
        <div
          className="relative mx-4 mt-4 flex items-center justify-between overflow-hidden rounded-2xl p-4"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
          <div className="relative">
            <span className="text-[10px] font-bold tracking-widest text-white/65">WELCOME OFFER</span>
            <p className="mt-0.5 text-[14px] font-bold text-white">첫 구매 <span className="text-[18px]">94% OFF</span></p>
            <p className="text-[12px] text-white/80">5컷 15만원 → <span className="font-semibold text-white">9,000원</span></p>
          </div>
          <a
            href={PC_MEMBERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex shrink-0 items-center gap-1 rounded-xl bg-white px-3.5 py-2 text-[12px] font-bold text-brand"
          >
            PC에서 신청 <ChevronRight size={13} />
          </a>
        </div>

        {/* 무료회원 혜택 */}
        <div className="mt-6 px-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[15px] font-bold text-ink">무료회원 평생혜택</p>
            <span className="text-[12px] text-ink-mute">회원가입만 해도 무료</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {FREE_BENEFITS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-2xl border border-line bg-surface p-3.5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--brand-soft)" }}>
                  <Icon size={16} style={{ color: "var(--brand)" }} />
                </div>
                <p className="mb-0.5 text-[12px] font-semibold text-ink">{label}</p>
                <p className="text-[11px] leading-snug text-ink-mute">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 유료 라이선스 섹션 ─────────────────────────────────────────── */}
        <div className="mt-8 px-4">
          <p className="mb-1 text-[18px] font-bold text-ink">유료 라이선스</p>
          <p className="mb-4 text-[12px] text-ink-mute">이미지·영상·음원을 상업적으로 사용할 수 있는 구독 라이선스</p>

          {/* 라이선스 탭 */}
          <div className="mb-4 flex gap-1.5 rounded-2xl border border-line bg-surface p-1.5">
            {LICENSE_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setLicenseTab(t.id)}
                className="flex-1 rounded-xl py-2 text-[12px] font-semibold transition-colors"
                style={licenseTab === t.id
                  ? { backgroundColor: "var(--brand)", color: "white" }
                  : { color: "var(--ink-mute)" }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── 스탠다드 ── */}
          {licenseTab === "standard" && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 rounded-xl border border-line bg-surface p-1">
                {USAGE_TYPES.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => switchUsage(u.id)}
                    className="flex-1 rounded-lg py-2 text-[13px] font-semibold transition-colors"
                    style={usage === u.id
                      ? { backgroundColor: "var(--brand-soft)", color: "var(--brand)" }
                      : { color: "var(--ink-mute)" }}
                  >
                    {u.label}
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-line bg-surface px-4 py-3">
                {usage === "own" ? (
                  <p className="text-[11px] leading-relaxed text-ink-mute">
                    <span className="font-semibold text-ink">자사용</span> — 내 사이트·채널에 직접 게시하는 경우. SNS·입점몰 업로드는 <span className="font-semibold text-ink">+ 플랜</span> 필요.
                  </p>
                ) : (
                  <p className="text-[11px] leading-relaxed text-ink-mute">
                    <span className="font-semibold text-ink">타사납품</span> — 고객사에 결과물을 납품하거나 외부 플랫폼에 업로드하는 경우.
                  </p>
                )}
              </div>

              {stdPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={stdSelected === plan.id}
                  onSelect={() => setStdSelected(plan.id)}
                />
              ))}

              <div className="flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5">
                <div>
                  <p className="text-[13px] font-bold text-ink">특약 라이선스</p>
                  <p className="mt-0.5 text-[11px] text-ink-mute">대기업·프랜차이즈·출판·제품패키지</p>
                </div>
                <a
                  href="tel:02-2270-1730"
                  className="flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-[12px] font-bold"
                  style={{ backgroundColor: "var(--brand-soft)", color: "var(--brand)" }}
                >
                  문의 <ChevronRight size={12} />
                </a>
              </div>
            </div>
          )}

          {/* ── 스페셜 ── */}
          {licenseTab === "special" && (
            <div className="flex flex-col gap-2.5">
              {SPECIAL_PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={spSelected === plan.id}
                  onSelect={() => setSpSelected(plan.id)}
                />
              ))}
            </div>
          )}

          {/* 공통 혜택 */}
          <div className="mt-5 rounded-2xl border border-line bg-surface p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={14} style={{ color: "var(--brand)" }} />
              <span className="text-[13px] font-bold text-ink">유료 공통 혜택</span>
            </div>
            {SHARED_BENEFITS.map((item) => (
              <div key={item} className="mb-2 flex items-center gap-2 last:mb-0">
                <div className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--brand)" }} />
                <span className="text-[12px] text-ink-soft">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── AI 스튜디오 크레딧 섹션 ────────────────────────────────────── */}
        <div className="mt-8 px-4">
          <div className="mb-1 flex items-center gap-2">
            <Bot size={18} style={{ color: "var(--brand)" }} />
            <p className="text-[18px] font-bold text-ink">AI 스튜디오 크레딧</p>
          </div>
          <p className="mb-4 text-[12px] text-ink-mute">멤버십과 별도로 구매 가능한 AI 이미지 생성·편집 크레딧</p>

          <div className="flex flex-col gap-2.5">
            {AI_PLANS.map((plan) =>
              plan.custom ? (
                <div
                  key={plan.id}
                  className="flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5"
                >
                  <div>
                    <p className="text-[13px] font-bold text-ink">{plan.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-mute">크레딧·금액·기간 맞춤 협의</p>
                  </div>
                  <a
                    href="tel:02-2270-1730"
                    className="flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-[12px] font-bold"
                    style={{ backgroundColor: "var(--brand-soft)", color: "var(--brand)" }}
                  >
                    문의 <ChevronRight size={12} />
                  </a>
                </div>
              ) : (
                <button
                  key={plan.id}
                  onClick={() => setAiSelected(plan.id)}
                  className="relative rounded-2xl border-2 bg-surface p-4 text-left transition-colors"
                  style={{ borderColor: aiSelected === plan.id ? "var(--brand)" : "var(--line)" }}
                >
                  {plan.recommended && (
                    <span
                      className="absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                      style={{ backgroundColor: "var(--brand)" }}
                    >
                      추천
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
                        style={{
                          borderColor: aiSelected === plan.id ? "var(--brand)" : "var(--line)",
                          backgroundColor: aiSelected === plan.id ? "var(--brand)" : "transparent",
                        }}
                      >
                        {aiSelected === plan.id && <Check size={11} className="text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-ink">{plan.name}</p>
                        <p className="text-[11px] text-ink-mute">{plan.period} 사용 가능</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[20px] font-bold leading-tight" style={{ color: "var(--brand)" }}>
                        {plan.credits}
                      </p>
                      <p className="text-[12px] font-semibold text-ink">{plan.price}원</p>
                    </div>
                  </div>
                </button>
              )
            )}
          </div>

          <a
            href={PC_MEMBERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-line bg-surface py-3.5 text-[13px] font-semibold"
            style={{ color: "var(--brand)" }}
          >
            <Bot size={14} style={{ color: "var(--brand)" }} />
            AI 스튜디오 크레딧 PC에서 구매
            <ChevronRight size={13} />
          </a>
        </div>

        {/* 구매 문의 */}
        <div className="mx-4 mt-6 flex items-center justify-between rounded-2xl border border-line bg-surface p-4">
          <div>
            <p className="text-[12px] font-semibold text-ink">구매 문의</p>
            <p className="mt-0.5 text-[12px] text-ink-mute">평일 09:00–18:00 (점심 12–13시)</p>
          </div>
          <a href="tel:02-2270-1730" className="text-[14px] font-bold text-brand">
            02-2270-1730
          </a>
        </div>
      </div>

      {/* 하단 CTA — 라이선스 선택 기준 */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[480px] -translate-x-1/2 border-t border-line bg-surface px-4 py-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
      >
        <a
          href={PC_MEMBERSHIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <Crown size={15} fill="white" />
          PC에서 {ctaName} 신청
        </a>
        {ctaPrice && (
          <p className="mt-1.5 text-center text-[11px] text-ink-mute">
            {ctaPrice}원 · {ctaPeriod} · 결제는 PC 웹에서 진행됩니다
          </p>
        )}
      </div>
    </div>
  );
}
