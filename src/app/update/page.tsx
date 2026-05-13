"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronDown, Check, Layers } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import { updates, UPDATE_CATEGORIES } from "@/data/updates";

type SheetKey = "week" | "category" | null;

export default function UpdatePage() {
  const [weekId, setWeekId] = useState(updates[0].id);
  const [category, setCategory] = useState<string>("전체");
  const [sheet, setSheet] = useState<SheetKey>(null);

  const week = useMemo(
    () => updates.find((u) => u.id === weekId) ?? updates[0],
    [weekId],
  );

  const themes =
    category === "전체"
      ? week.themes
      : week.themes.filter((t) => t.category === category);

  const weekLabel = `${week.year}년 ${String(week.month).padStart(2, "0")}월 ${week.week}주차`;

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
            <span className="truncate text-[13px] font-semibold text-ink">{weekLabel}</span>
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

      {/* ── 주차 헤딩 ── */}
      <div className="px-4 pt-2">
        <p className="text-[15px] font-bold text-ink">
          {weekLabel}{" "}
          <span className="text-[13px] font-medium text-ink-mute">{week.dateRange}</span>
        </p>
      </div>

      {/* ── 테마 카드 2열 그리드 ── */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-4 pt-4">
        {themes.length === 0 ? (
          <div className="col-span-2 rounded-2xl border border-line bg-surface px-5 py-12 text-center">
            <p className="text-[14px] font-semibold text-ink">이 주차에는 해당 카테고리 업데이트가 없어요</p>
            <p className="mt-1 text-[12px] text-ink-mute">다른 카테고리를 선택해 보세요.</p>
          </div>
        ) : (
          themes.map((t) => (
            <a
              key={t.id}
              href={t.pcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="overflow-hidden rounded-2xl bg-surface-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.cover}
                  alt=""
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="min-w-0 truncate text-[13px] font-bold text-ink">{t.title}</p>
                <span className="flex shrink-0 items-center gap-1 text-[12px] text-ink-mute">
                  <Layers size={13} />
                  {t.count}
                </span>
              </div>
            </a>
          ))
        )}
      </div>

      <BottomNav />

      {/* ── 바텀시트 ── */}
      {sheet ? (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => setSheet(null)}
          />
          <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 rounded-t-2xl bg-surface px-4 pb-8 pt-4">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
            <p className="mb-1 text-[15px] font-bold text-ink">
              {sheet === "week" ? "주차 선택" : "카테고리"}
            </p>

            <div className="max-h-[60vh] overflow-y-auto">
              {sheet === "week"
                ? updates.map((u) => {
                    const label = `${u.year}년 ${String(u.month).padStart(2, "0")}월 ${u.week}주차`;
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
                          <span className="text-[14px] text-ink-soft">{label}</span>
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
