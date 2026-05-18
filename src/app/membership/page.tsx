"use client";

import { Check, Crown, Image, Download, Zap, Pencil, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";

const PC_MEMBERSHIP_URL = "https://www.clipartkorea.co.kr/membership";

type Plan = {
  id: string;
  name: string;
  tag: string;
  period: string;
  price: string;
  originalPrice?: string;
  perMonth?: string;
  discount?: string;
  recommended?: boolean;
  badge?: "자사용" | "타사납품";
  features: string[];
};

const TABS = [
  { id: "personal", label: "개인·소호" },
  { id: "business", label: "기업·납품" },
  { id: "edu", label: "교육·공공" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const PLANS: Record<TabId, Plan[]> = {
  personal: [
    {
      id: "creator",
      name: "크리에이터",
      tag: "유튜버 · SNS · 선생님",
      period: "6개월",
      price: "132,000",
      originalPrice: "198,000",
      perMonth: "22,000",
      discount: "33%",
      recommended: true,
      features: ["이미지 500컷/월", "영상·음원 150개/월", "5,000종 폰트", "숏폼 세로형 영상", "에디터 무제한"],
    },
    {
      id: "std33",
      name: "스탠다드 33",
      tag: "개인 · 소규모 사업자",
      period: "6/12개월",
      price: "330,000",
      features: ["이미지 50컷/일", "영상·음원 150개/월", "에디터 무제한"],
    },
    {
      id: "std55",
      name: "스탠다드 55",
      tag: "개인 · 소규모 사업자",
      period: "12개월",
      price: "412,500",
      originalPrice: "550,000",
      perMonth: "34,375",
      discount: "25%",
      features: ["이미지·영상·음원 무제한", "AI 스튜디오 3,000C/월", "에디터 무제한"],
    },
  ],
  business: [
    {
      id: "startup",
      name: "스타트업",
      tag: "초기창업자 · 1인기업",
      period: "12개월",
      price: "330,000",
      originalPrice: "550,000",
      discount: "40%",
      perMonth: "27,500",
      recommended: true,
      features: ["이미지 50컷/일", "영상·음원 무제한", "AI 스튜디오 1,000C/월", "에디터 무제한"],
    },
    {
      id: "std55plus",
      name: "스탠다드 55+",
      tag: "자사 + SNS · 입점몰",
      period: "12개월",
      price: "550,000",
      originalPrice: "990,000",
      discount: "44%",
      badge: "자사용",
      features: ["이미지·영상·음원 무제한", "SNS·블로그·유튜브 허용", "입점몰 상세페이지 허용", "에디터 무제한"],
    },
    {
      id: "std88",
      name: "스탠다드 88",
      tag: "고객사 납품 · 대행사",
      period: "12개월",
      price: "660,000",
      originalPrice: "880,000",
      discount: "25%",
      badge: "타사납품",
      features: ["타사 납품 허용", "이미지·영상·음원 무제한", "에디터 무제한"],
    },
    {
      id: "std88plus",
      name: "스탠다드 88+",
      tag: "납품 + 입점몰 동시",
      period: "12개월",
      price: "880,000",
      originalPrice: "1,650,000",
      discount: "47%",
      badge: "타사납품",
      features: ["타사 납품 + 입점몰 상세페이지", "이미지·영상·음원 무제한", "에디터 무제한"],
    },
  ],
  edu: [
    {
      id: "school",
      name: "스쿨 라이선스",
      tag: "학교 · 교육기관",
      period: "12개월",
      price: "330,000",
      recommended: true,
      features: ["동시접속 100대", "교육 목적 사용", "이미지·영상·음원 무제한", "에디터 무제한"],
    },
    {
      id: "std132",
      name: "스탠다드 132",
      tag: "공공기관 자사 사용",
      period: "12개월",
      price: "990,000",
      badge: "자사용",
      features: ["이미지 50컷/일", "영상·음원 150개/월", "공공기관 자사 사용"],
    },
    {
      id: "std132plus",
      name: "스탠다드 132+",
      tag: "공공기관 자사 + SNS",
      period: "12개월",
      price: "1,320,000",
      badge: "자사용",
      features: ["이미지·영상·음원 무제한", "SNS·블로그·유튜브 허용", "공공기관 자사 사용"],
    },
    {
      id: "std165",
      name: "스탠다드 165",
      tag: "공공기관 납품",
      period: "12개월",
      price: "1,237,500",
      badge: "타사납품",
      features: ["타사 납품 허용", "이미지·영상·음원 무제한"],
    },
    {
      id: "std165plus",
      name: "스탠다드 165+",
      tag: "공공기관 납품 + 입점",
      period: "12개월",
      price: "1,650,000",
      badge: "타사납품",
      features: ["납품 + 입점몰 상세페이지", "이미지·영상·음원 무제한"],
    },
  ],
};

const FREE_BENEFITS = [
  { icon: Image, label: "K-이미지 무료", desc: "한국관광공사 공식 이미지" },
  { icon: Download, label: "매주 무료 업데이트", desc: "포토·일러스트 신규 추가" },
  { icon: Pencil, label: "3,000종 폰트", desc: "한글·영문 다양한 폰트" },
  { icon: Zap, label: "PPT 템플릿", desc: "업무 효율 높이는 템플릿" },
];

const SHARED_BENEFITS = [
  "에디터 편집 — 별도 프로그램 불필요",
  "AI 스튜디오 크레딧 매달 자동 지급",
  "모션·동영상·음원 전 콘텐츠 사용",
  "저작권 안전 보장 상업적 이용 가능",
];

const BADGE_STYLE = {
  자사용: { backgroundColor: "#EFF6FF", color: "#2563EB" },
  타사납품: { backgroundColor: "#FFF7ED", color: "#C2410C" },
};

export default function MembershipPage() {
  const [tab, setTab] = useState<TabId>("personal");
  const [selected, setSelected] = useState<string>("creator");

  const plans = PLANS[tab];
  const allPlans = Object.values(PLANS).flat();
  const currentPlan = allPlans.find((p) => p.id === selected);

  function handleTabChange(id: TabId) {
    setTab(id);
    setSelected(PLANS[id][0].id);
  }

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
            <p className="mt-0.5 text-[14px] font-bold text-white">
              첫 구매 <span className="text-[18px]">94% OFF</span>
            </p>
            <p className="text-[12px] text-white/80">
              5컷 15만원 → <span className="font-semibold text-white">9,000원</span>
            </p>
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
                <div
                  className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--brand-soft)" }}
                >
                  <Icon size={16} style={{ color: "var(--brand)" }} />
                </div>
                <p className="mb-0.5 text-[12px] font-semibold text-ink">{label}</p>
                <p className="text-[11px] leading-snug text-ink-mute">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 유료 라이선스 */}
        <div className="mt-7 px-4">
          <p className="mb-3 text-[15px] font-bold text-ink">유료 라이선스</p>

          {/* 탭 */}
          <div className="mb-4 flex gap-1.5 rounded-2xl border border-line bg-surface p-1.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className="flex-1 rounded-xl py-2 text-[12px] font-semibold transition-colors"
                style={
                  tab === t.id
                    ? { backgroundColor: "var(--brand)", color: "white" }
                    : { color: "var(--ink-mute)" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 기업 탭 자사/타사 안내 */}
          {tab === "business" && (
            <div className="mb-3 rounded-xl border border-line bg-surface px-4 py-3">
              <p className="text-[11px] leading-relaxed text-ink-mute">
                <span className="font-semibold" style={{ color: "#2563EB" }}>자사용</span>
                {" "}— 내 채널·사이트에 직접 사용
                <span className="mx-2 text-line">|</span>
                <span className="font-semibold" style={{ color: "#C2410C" }}>타사납품</span>
                {" "}— 고객사 납품·외부 플랫폼 업로드
              </p>
            </div>
          )}

          {/* 플랜 카드 */}
          <div className="flex flex-col gap-2.5">
            {plans.map((plan) => {
              const active = selected === plan.id;
              const bs = plan.badge ? BADGE_STYLE[plan.badge] : null;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelected(plan.id)}
                  className="relative rounded-2xl border-2 bg-surface p-4 text-left transition-colors"
                  style={{ borderColor: active ? "var(--brand)" : "var(--line)" }}
                >
                  {plan.recommended && (
                    <span
                      className="absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                      style={{ backgroundColor: "var(--brand)" }}
                    >
                      추천
                    </span>
                  )}

                  {/* 헤더 */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <div
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
                        style={{
                          borderColor: active ? "var(--brand)" : "var(--line)",
                          backgroundColor: active ? "var(--brand)" : "transparent",
                        }}
                      >
                        {active && <Check size={11} className="text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <p className="text-[14px] font-bold text-ink">{plan.name}</p>
                          {bs && (
                            <span
                              className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                              style={bs}
                            >
                              {plan.badge}
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

                  {/* 혜택 */}
                  <div className="mt-3 flex flex-col gap-1.5 pl-7">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <Check size={10} style={{ color: "var(--brand)" }} strokeWidth={2.5} className="shrink-0" />
                        <span className="text-[11px] text-ink-soft">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* 할인 뱃지 */}
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
            })}
          </div>

          {/* 특약 라이선스 */}
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5">
            <div>
              <p className="text-[13px] font-bold text-ink">특약 라이선스</p>
              <p className="mt-0.5 text-[11px] text-ink-mute">대기업 · 프랜차이즈 · 출판·제품패키지 협의</p>
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

        {/* 유료 공통 혜택 */}
        <div className="mx-4 mt-5 rounded-2xl border border-line bg-surface p-4">
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

        {/* 구매 문의 */}
        <div className="mx-4 mt-4 flex items-center justify-between rounded-2xl border border-line bg-surface p-4">
          <div>
            <p className="text-[12px] font-semibold text-ink">구매 문의</p>
            <p className="mt-0.5 text-[12px] text-ink-mute">평일 09:00–18:00 (점심 12–13시)</p>
          </div>
          <a href="tel:02-2270-1730" className="text-[14px] font-bold text-brand">
            02-2270-1730
          </a>
        </div>
      </div>

      {/* 하단 CTA */}
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
          PC에서 {currentPlan?.name ?? "멤버십"} 신청
        </a>
        {currentPlan && (
          <p className="mt-1.5 text-center text-[11px] text-ink-mute">
            {currentPlan.price}원 · {currentPlan.period} · 결제는 PC 웹에서 진행됩니다
          </p>
        )}
      </div>
    </div>
  );
}
