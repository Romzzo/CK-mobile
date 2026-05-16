"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ScrollTopButton from "@/components/common/ScrollTopButton";
import {
  AGREEMENT_CHAPTERS,
  AGREEMENT_EFFECTIVE,
} from "@/data/agreementContent";

export default function ServiceAgreementPage() {
  // 챕터별 펼침 상태 — 기본 모두 열림
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(AGREEMENT_CHAPTERS.map((c) => [c.id, true])),
  );

  const toggle = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="min-h-dvh bg-surface-muted">
      <PageHeader title="이용약관" fallbackHref="/" />

      <main className="px-4 pb-16 pt-5">
        {/* ── 챕터 섹션들 ── */}
        <div className="overflow-hidden rounded-2xl bg-surface">
          {AGREEMENT_CHAPTERS.map((c, i) => (
            <section
              key={c.id}
              id={c.id}
              className={i > 0 ? "border-t border-line" : ""}
            >
              <button
                type="button"
                onClick={() => toggle(c.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                aria-expanded={open[c.id]}
                aria-controls={`${c.id}-body`}
              >
                <h2 className="text-[15px] font-bold text-ink">{c.title}</h2>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-ink-mute"
                  style={{
                    transform: open[c.id] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
              {open[c.id] ? (
                <div
                  id={`${c.id}-body`}
                  className="agreement-body px-4 pb-5"
                  dangerouslySetInnerHTML={{ __html: c.html }}
                />
              ) : null}
            </section>
          ))}
        </div>

        {/* ── 발효일 푸터 ── */}
        <p className="mt-6 pb-4 text-[11px] text-ink-mute">
          - {AGREEMENT_EFFECTIVE}
        </p>
      </main>

      <ScrollTopButton />
    </div>
  );
}
