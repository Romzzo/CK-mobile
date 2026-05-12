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
      <div
        className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-line bg-surface px-4 py-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line"
          >
            <Heart
              size={20}
              style={liked ? { color: "var(--danger)" } : undefined}
              className={liked ? "" : "text-ink-mute"}
              fill={liked ? "var(--danger)" : "none"}
            />
          </button>

          {isPremium ? (
            <>
              <button
                onClick={() => setShowPlanSheet(true)}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white"
                style={{ backgroundColor: "var(--brand)" }}
              >
                <Crown size={16} fill="currentColor" />
                멤버십으로 다운로드
              </button>
              <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line text-ink-soft">
                <ShoppingCart size={20} />
              </button>
            </>
          ) : (
            <button
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              <Download size={18} />
              무료 다운로드
            </button>
          )}
        </div>
      </div>

      {showPlanSheet && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowPlanSheet(false)}
          />
          <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 rounded-t-2xl bg-surface px-5 pb-10 pt-5">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" />
            <h3 className="mb-1 text-[16px] font-bold text-ink">무제한 다운로드</h3>
            <p className="mb-5 text-[14px] text-ink-soft">멤버십 가입 후 이용해보세요</p>

            {[
              { name: "1개월", price: "19,900원", sub: "/월", badge: null as string | null, monthly: undefined as string | undefined },
              { name: "6개월", price: "14,900원", sub: "/월", badge: "25% 할인", monthly: "89,400원 결제" },
              { name: "12개월", price: "9,900원", sub: "/월", badge: "50% 할인", monthly: "118,800원 결제" },
            ].map((plan) => (
              <button
                key={plan.name}
                className="mb-2.5 flex w-full items-center justify-between rounded-2xl border-2 p-4 transition-colors last:mb-0"
                style={{ borderColor: plan.badge ? "var(--brand)" : "var(--line)" }}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-ink">{plan.name}</span>
                    {plan.badge && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: "var(--brand)" }}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  {plan.monthly && <p className="mt-0.5 text-[12px] text-ink-mute">{plan.monthly}</p>}
                </div>
                <div className="text-right">
                  <span className="text-[16px] font-bold" style={{ color: "var(--brand)" }}>{plan.price}</span>
                  <span className="text-[12px] text-ink-mute">{plan.sub}</span>
                </div>
              </button>
            ))}

            <button
              className="mt-4 h-12 w-full rounded-xl text-[15px] font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              멤버십 시작하기
            </button>
          </div>
        </>
      )}
    </>
  );
}
