"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronDown, Check, Square } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import ScrollTopButton from "@/components/common/ScrollTopButton";
import { updates, UPDATE_CATEGORIES, type WeeklyUpdate } from "@/data/updates";

type SheetKey = "week" | "category" | null;

const labelOf = (w: WeeklyUpdate) =>
  `${w.year}년 ${String(w.month).padStart(2, "0")}월 ${w.week}주차`;

export default function UpdatePage() {
  const [weekId, setWeekId] = useState(updates[0].id);
  const [category, setCategory] = useState<string>("전체 업데이트");
  const [sheet, setSheet] = useState<SheetKey>(null);
  // 선택된 주차 이전으로 추가 로딩한 주차 수
  const [extra, setExtra] = useState(0);

  // 주차 변경 시 더보기 카운트 초기화
  useEffect(() => {
    setExtra(0);
  }, [weekId]);

  // 바텀시트 ESC 닫기 (a11y)
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  const selectedIdx = useMemo(
    () => Math.max(0, updates.findIndex((u) => u.id === weekId)),
    [weekId],
  );

  const visibleWeeks = updates.slice(selectedIdx, selectedIdx + 1 + extra);
  const hasMore = selectedIdx + 1 + extra < updates.length;

  const filterThemes = (w: WeeklyUpdate) =>
    category === "전체 업데이트" ? w.themes : w.themes.filter((t) => t.category === category);

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title="업데이트" fallbackHref="/" />

      {/* ── 상단 필터: 주차 / 카테고리 ── */}
      <div className="flex gap-2 px-4 pb-3 pt-4">
        <button
          onClick={() => setSheet("week")}
          className="flex flex-1 items-center justify-between gap-1.5 rounded-xl border border-line bg-surface px-3.5 py-2.5"
        >
          <span className="flex min-w-0 items-center gap-2">
            <Calendar size={14} className="shrink-0 text-ink-mute" />
            <span className="truncate text-[13px] font-semibold text-ink">
              {labelOf(visibleWeeks[0])}
            </span>
          </span>
          <ChevronDown size={15} className="shrink-0 text-ink-mute" />
        </button>
        <button
          onClick={() => setSheet("category")}
          className="flex w-[42%] items-center justify-between gap-1.5 rounded-xl border border-line bg-surface px-3.5 py-2.5"
        >
          <span className="truncate text-[13px] font-semibold text-ink">{category}</span>
          <ChevronDown size={15} className="shrink-0 text-ink-mute" />
        </button>
      </div>

      {/* ── 주차 섹션들 ── */}
      {visibleWeeks.map((w, i) => {
        const themes = filterThemes(w);
        return (
          <section key={w.id} className={i === 0 ? "pt-2" : "pt-8"}>
            <div className="px-4">
              <p className="text-[15px] font-bold text-ink">
                {labelOf(w)}{" "}
                <span className="text-[13px] font-medium text-ink-mute">{w.dateRange}</span>
              </p>
            </div>

            {themes.length === 0 ? (
              <div className="px-3 pt-5">
                <div className="bg-surface px-5 py-12 text-center">
                  <p className="text-[13px] font-semibold text-ink-soft">업데이트된 콘텐츠가 없어요.</p>
                </div>
              </div>
            ) : (
              <div className="columns-2 gap-2.5 px-3 pt-3">
                {themes.map((t) => (
                  <Link
                    key={t.id}
                    href={`/update/detail/${t.seq}`}
                    className="mb-2.5 block break-inside-avoid"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.cover}
                      alt=""
                      className="block w-full bg-surface-muted"
                      style={{ aspectRatio: t.aspect }}
                    />
                    <div className="flex items-center justify-between gap-2 px-2 py-1.5">
                      <p className="min-w-0 truncate text-[13px] font-semibold text-ink">{t.title}</p>
                      <span className="flex shrink-0 items-center gap-1 text-[11px] text-ink-mute">
                        <Square size={10} strokeWidth={2} />
                        {t.count}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}

      {/* ── 이전 주 더보기 ── */}
      {hasMore ? (
        <div className="px-4 pt-8">
          <button
            onClick={() => setExtra((n) => n + 1)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-line bg-surface py-3 text-[13px] font-semibold text-ink-soft"
          >
            이전 주 더보기
            <ChevronDown size={14} />
          </button>
        </div>
      ) : (
        <div className="px-4 pt-8 text-center text-[12px] text-ink-mute">
          더 이상 이전 주차가 없습니다
        </div>
      )}

      <ScrollTopButton />

      <BottomNav />

      {/* ── 바텀시트 ── */}
      {sheet ? (
        <>
          <div
            className="fixed inset-0 z-[55]"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => setSheet(null)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-sheet-title"
            className="fixed bottom-0 left-1/2 z-[60] w-full max-w-[480px] -translate-x-1/2 rounded-t-2xl bg-surface px-4 pt-4"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
            <p id="update-sheet-title" className="mb-1 text-[15px] font-bold text-ink">
              {sheet === "week" ? "주차 선택" : "카테고리"}
            </p>

            <div className="max-h-[60vh] overflow-y-auto">
              {sheet === "week"
                ? updates.map((u) => {
                    const active = u.id === weekId;
                    return (
                      <button
                        key={u.id}
                        onClick={() => {
                          setWeekId(u.id);
                          setSheet(null);
                        }}
                        className="flex w-full items-center justify-between border-b border-line py-3.5 text-left last:border-0"
                      >
                        <div className="min-w-0">
                          <span className="text-[14px] text-ink-soft">{labelOf(u)}</span>
                          <span className="ml-2 text-[12px] text-ink-mute">{u.dateRange}</span>
                        </div>
                        {active ? (
                          <span
                            className="grid h-5 w-5 place-items-center rounded-full"
                            style={{ backgroundColor: "var(--brand)" }}
                          >
                            <Check size={11} className="text-white" strokeWidth={3} />
                          </span>
                        ) : null}
                      </button>
                    );
                  })
                : UPDATE_CATEGORIES.map((c) => {
                    const active = c === category;
                    return (
                      <button
                        key={c}
                        onClick={() => {
                          setCategory(c);
                          setSheet(null);
                        }}
                        className="flex w-full items-center justify-between border-b border-line py-3.5 text-left last:border-0"
                      >
                        <span className="text-[14px] text-ink-soft">{c}</span>
                        {active ? (
                          <span
                            className="grid h-5 w-5 place-items-center rounded-full"
                            style={{ backgroundColor: "var(--brand)" }}
                          >
                            <Check size={11} className="text-white" strokeWidth={3} />
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
