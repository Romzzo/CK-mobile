"use client";

import { Check, Crown, Image, Download, Zap, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";

const plans = [
  {
    id: "creator",
    tag: "유튜버 · 선생님 · 초기창업자",
    name: "크리에이터 라이선스",
    period: "6개월",
    originalPrice: "198,000",
    price: "132,000",
    perMonth: "22,000",
    discount: "33%",
    popular: true,
    benefits: [
      "1,500만+ 이미지·영상·음원 다운로드",
      "에디터 편집 무제한",
      "숏폼 세로형 영상 제공",
      "저작권 걱정 없는 안전한 사용",
    ],
  },
  {
    id: "standard",
    tag: "개인 · 중소기업",
    name: "스탠다드 라이선스",
    period: "12개월",
    originalPrice: "550,000",
    price: "412,500",
    perMonth: "34,375",
    discount: "25%",
    popular: false,
    benefits: [
      "1,500만+ 이미지·영상·음원 무제한",
      "기업계정 5명 동시 접속",
      "에디터 편집 무제한",
      "AI 스튜디오 3,000C 매달 지급",
      "SNS·블로그·유튜브 추가 사용 가능",
    ],
  },
];

const freeBenefits = [
  { icon: Image, label: "K-이미지 무료 제공", desc: "한국관광공사 공식 이미지" },
  { icon: Download, label: "매주 무료 업데이트", desc: "포토·일러스트 매주 신규 추가" },
  { icon: Zap, label: "PPT 템플릿 무료", desc: "업무 효율을 높이는 템플릿" },
];

const sharedBenefits = [
  "에디터로 바로 편집 — 별도 프로그램 불필요",
  "AI 스튜디오 크레딧 매달 자동 지급",
  "모션·동영상·음원 포함 전 콘텐츠 사용",
  "저작권 안전 보장 상업적 이용 가능",
];

const PC_MEMBERSHIP_URL = "https://www.clipartkorea.co.kr/membership";

export default function MembershipPage() {
  const [selected, setSelected] = useState("creator");
  const currentPlan = plans.find((p) => p.id === selected)!;

  return (
    <div className="flex min-h-dvh flex-col bg-surface-muted">
      <PageHeader title="멤버십 & 라이선스" />

      <div className="flex-1 overflow-y-auto pb-36">
        {/* 웰컴 할인 배너 */}
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
          <div className="grid grid-cols-2 gap-2.5">
            {freeBenefits.map(({ icon: Icon, label, desc }) => (
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

        {/* 유료 플랜 선택 */}
        <div className="mt-7 px-4">
          <p className="mb-1 text-[15px] font-bold text-ink">유료 라이선스</p>
          <p className="mb-3 text-[12px] text-ink-mute">신규 가입 시 프로모션 할인 적용</p>

          <div className="flex flex-col gap-3">
            {plans.map((plan) => {
              const active = selected === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelected(plan.id)}
                  className="relative rounded-2xl border-2 bg-surface p-4 text-left transition-colors"
                  style={{ borderColor: active ? "var(--brand)" : "var(--line)" }}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: "var(--brand)" }}>
                      추천
                    </span>
                  )}

                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                        style={{
                          borderColor: active ? "var(--brand)" : "var(--line)",
                          backgroundColor: active ? "var(--brand)" : "transparent",
                        }}
                      >
                        {active && <Check size={11} className="text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <p className="text-[10px] text-ink-mute">{plan.tag}</p>
                        <p className="text-[14px] font-bold text-ink">{plan.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-ink-mute line-through">{plan.originalPrice}원</p>
                      <p className="text-[16px] font-bold" style={{ color: "var(--brand)" }}>{plan.price}원</p>
                      <p className="text-[10px] text-ink-mute">{plan.period} / 월 {plan.perMonth}원</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {plan.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-1.5">
                        <Check size={11} style={{ color: "var(--brand)" }} strokeWidth={2.5} className="shrink-0" />
                        <span className="text-[12px] text-ink-soft">{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-ink-mute">{plan.period} 계약 · 부가세 별도</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{ backgroundColor: "rgba(240,51,75,0.1)", color: "var(--danger)" }}
                    >
                      {plan.discount} 할인
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 유료 공통 혜택 */}
        <div className="mx-4 mt-5 rounded-2xl border border-line bg-surface p-4">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={14} style={{ color: "var(--brand)" }} />
            <span className="text-[13px] font-bold text-ink">유료 공통 혜택</span>
          </div>
          {sharedBenefits.map((item) => (
            <div key={item} className="mb-2 flex items-center gap-2 last:mb-0">
              <div className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--brand)" }} />
              <span className="text-[12px] text-ink-soft">{item}</span>
            </div>
          ))}
        </div>

        {/* 문의 */}
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
          PC에서 {currentPlan.name} 신청
        </a>
        <p className="mt-1.5 text-center text-[11px] text-ink-mute">
          {currentPlan.price}원 · {currentPlan.period} 계약 · 결제는 PC 웹에서 진행됩니다
        </p>
      </div>
    </div>
  );
}
