"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ScrollTopButton from "@/components/common/ScrollTopButton";
import {
  AGREEMENT_CHAPTERS,
  AGREEMENT_TLDR,
  AGREEMENT_EFFECTIVE,
} from "@/data/agreementContent";

export default function ServiceAgreementPage() {
  // 챕터별 펼침 상태 — 기본 모두 열림
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(AGREEMENT_CHAPTERS.map((c) => [c.id, true])),
  );

  const toggle = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    // 닫혀 있던 챕터는 같이 열어줌
    setOpen((p) => ({ ...p, [id]: true }));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-dvh bg-surface-muted">
      <PageHeader title="이용약관" fallbackHref="/" />

      <main className="px-4 pb-16 pt-5">
        {/* ── TL;DR 한눈에 보기 ── */}
        <section className="rounded-2xl bg-surface p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-mute">
            한눈에 보기
          </p>
          <ul className="flex flex-col gap-2">
            {AGREEMENT_TLDR.map((t) => (
              <li
                key={t}
                className="flex gap-2 text-[13px] leading-relaxed text-ink-soft"
              >
                <span
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--brand)" }}
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 챕터 pill 내비게이션 ── */}
        <nav
          aria-label="목차"
          className="mt-4 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        >
          {AGREEMENT_CHAPTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => scrollTo(c.id)}
              className="shrink-0 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-ink-soft"
            >
              {c.label}
            </button>
          ))}
        </nav>

        {/* ── 챕터 섹션들 ── */}
        <div className="mt-4 overflow-hidden rounded-2xl bg-surface">
          {AGREEMENT_CHAPTERS.map((c, i) => (
            <section
              key={c.id}
              id={c.id}
              className={i > 0 ? "border-t border-line" : ""}
              style={{ scrollMarginTop: "calc(60px + env(safe-area-inset-top, 0px))" }}
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
