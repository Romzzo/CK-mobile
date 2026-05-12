"use client";

import { Heart, Download, ShoppingCart, Crown } from "lucide-react";
import { useState } from "react";

interface DetailActionsProps {
  isPremium: boolean;
}

export default function DetailActions({ isPremium }: DetailActionsProps) {
  const [liked, setLiked] = useState(false);
  const [showPlanSheet, setShowPlanSheet] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 py-3 safe-area-pb">
        <div className="flex items-center gap-2">
          {/* 찜 버튼 */}
          <button
            onClick={() => setLiked(!liked)}
            className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center flex-shrink-0"
          >
            <Heart
              size={20}
              style={liked ? { color: "var(--ck-danger)" } : undefined}
              className={liked ? "" : "text-gray-400"}
              fill={liked ? "var(--ck-danger)" : "none"}
            />
          </button>

          {isPremium ? (
            /* 유료 콘텐츠 */
            <>
              <button
                onClick={() => setShowPlanSheet(true)}
                className="flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm text-white"
                style={{ background: "linear-gradient(135deg, var(--ck-primary), var(--ck-primary-dark))" }}
              >
                <Crown size={16} fill="currentColor" />
                멤버십으로 다운로드
              </button>
              <button className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={20} className="text-gray-600" />
              </button>
            </>
          ) : (
            /* 무료 콘텐츠 */
            <button
              className="flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm text-white"
              style={{ backgroundColor: "var(--ck-primary)" }}
            >
              <Download size={18} />
              무료 다운로드
            </button>
          )}
        </div>
      </div>

      {/* 멤버십 플랜 바텀시트 */}
      {showPlanSheet && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowPlanSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl px-5 pt-5 pb-10">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <h3 className="text-base font-bold text-gray-900 mb-1">무제한 다운로드</h3>
            <p className="text-sm text-gray-500 mb-5">멤버십 가입 후 이용해보세요</p>

            {[
              { name: "1개월", price: "19,900원", sub: "/월", badge: null },
              { name: "6개월", price: "14,900원", sub: "/월", badge: "25% 할인", monthly: "89,400원 결제" },
              { name: "12개월", price: "9,900원", sub: "/월", badge: "50% 할인", monthly: "118,800원 결제" },
            ].map((plan) => (
              <button
                key={plan.name}
                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 mb-2.5 last:mb-0 transition-all"
                style={{ borderColor: plan.badge ? "var(--ck-primary)" : "#E5E7EB" }}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800">{plan.name}</span>
                    {plan.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "var(--ck-primary)" }}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  {plan.monthly && <p className="text-xs text-gray-400 mt-0.5">{plan.monthly}</p>}
                </div>
                <div className="text-right">
                  <span className="text-base font-bold" style={{ color: "var(--ck-primary)" }}>{plan.price}</span>
                  <span className="text-xs text-gray-400">{plan.sub}</span>
                </div>
              </button>
            ))}

            <button
              className="w-full h-12 rounded-2xl mt-4 font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, var(--ck-primary), var(--ck-primary-dark))" }}
            >
              멤버십 시작하기
            </button>
          </div>
        </>
      )}
    </>
  );
}
