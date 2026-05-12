"use client";

import { ArrowLeft, Check, Crown, Image, Download, Zap, Pencil, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      "5,000종 한글·영문 폰트",
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
  { icon: Pencil, label: "3,000종 폰트 무료", desc: "한글·영문 다양한 폰트" },
  { icon: Zap, label: "PPT 템플릿 무료", desc: "업무 효율을 높이는 템플릿" },
];

export default function MembershipPage() {
  const [selected, setSelected] = useState("creator");
  const router = useRouter();
  const currentPlan = plans.find((p) => p.id === selected)!;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <header className="flex items-center px-4 h-14 bg-white border-b border-gray-100 flex-shrink-0">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900 ml-3">멤버십 & 라이선스</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-36">

        {/* 웰컴 할인 배너 */}
        <div
          className="mx-4 mt-4 rounded-2xl p-4 flex items-center justify-between overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #7A3DEA, #5029D2)" }}
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
          <div>
            <span className="text-purple-200 text-[10px] font-bold tracking-widest">WELCOME OFFER</span>
            <p className="text-white font-bold text-sm mt-0.5">첫 구매 <span className="text-yellow-300 text-lg">94% OFF</span></p>
            <p className="text-purple-200 text-xs">5컷 15만원 → <span className="text-white font-semibold">9,000원</span></p>
          </div>
          <button className="flex-shrink-0 bg-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1" style={{ color: "var(--ck-primary)" }}>
            신청 <ChevronRight size={12} />
          </button>
        </div>

        {/* 무료회원 혜택 */}
        <div className="mt-5 px-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-900">무료회원 평생혜택</p>
            <span className="text-xs text-gray-400">회원가입만 해도 무료</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {freeBenefits.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white rounded-2xl p-3.5 border border-gray-100">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: "#F1E9FD" }}>
                  <Icon size={16} style={{ color: "var(--ck-primary)" }} />
                </div>
                <p className="text-xs font-semibold text-gray-800 mb-0.5">{label}</p>
                <p className="text-[11px] text-gray-400 leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 유료 플랜 선택 */}
        <div className="mt-6 px-4">
          <p className="text-sm font-bold text-gray-900 mb-1">유료 라이선스</p>
          <p className="text-xs text-gray-400 mb-3">신규 가입 시 프로모션 할인 적용</p>

          <div className="flex flex-col gap-3">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className="relative text-left rounded-2xl border-2 p-4 transition-all bg-white"
                style={{ borderColor: selected === plan.id ? "var(--ck-primary)" : "#E5E7EB" }}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: "var(--ck-primary)" }}>
                    추천
                  </span>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: selected === plan.id ? "var(--ck-primary)" : "#D1D5DB",
                        backgroundColor: selected === plan.id ? "var(--ck-primary)" : "transparent",
                      }}
                    >
                      {selected === plan.id && <Check size={11} className="text-white" strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">{plan.tag}</p>
                      <p className="text-sm font-bold text-gray-900">{plan.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400 line-through">{plan.originalPrice}원</p>
                    <p className="text-base font-bold" style={{ color: "var(--ck-primary)" }}>{plan.price}원</p>
                    <p className="text-[10px] text-gray-400">{plan.period} / 월 {plan.perMonth}원</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  {plan.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-1.5">
                      <Check size={11} style={{ color: "var(--ck-primary)" }} strokeWidth={2.5} className="flex-shrink-0" />
                      <span className="text-xs text-gray-600">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{plan.period} 계약 · 부가세 별도</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>
                    {plan.discount} 할인
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 공통 혜택 강조 */}
        <div className="mt-5 mx-4 rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #0D0820, #1E0A4A)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-purple-300" />
            <span className="text-purple-300 text-xs font-semibold tracking-wide">유료 공통 혜택</span>
          </div>
          {[
            "에디터로 바로 편집 — 별도 프로그램 불필요",
            "AI 스튜디오 크레딧 매달 자동 지급",
            "모션·동영상·음원 포함 전 콘텐츠 사용",
            "저작권 안전 보장 상업적 이용 가능",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 mb-2 last:mb-0">
              <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
              <span className="text-gray-300 text-xs">{item}</span>
            </div>
          ))}
        </div>

        {/* 문의 */}
        <div className="mt-4 mx-4 bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100">
          <div>
            <p className="text-xs font-semibold text-gray-800">구매 문의</p>
            <p className="text-xs text-gray-400 mt-0.5">평일 09:00–18:00 (점심 12–13시)</p>
          </div>
          <a href="tel:02-2270-1730" className="text-sm font-bold" style={{ color: "var(--ck-primary)" }}>
            02-2270-1730
          </a>
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
        <button
          className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, var(--ck-primary), var(--ck-primary-dark))" }}
        >
          <Crown size={15} fill="white" />
          {currentPlan.name} 구매하기 — {currentPlan.price}원
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-1.5">
          {currentPlan.period} 계약 · 부가세 별도 · 프로모션 할인 적용
        </p>
      </div>
    </div>
  );
}
