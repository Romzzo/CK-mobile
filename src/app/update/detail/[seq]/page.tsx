"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { Bookmark } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import { findThemeBySeq, getThemeContents } from "@/data/updates";

export default function ThemeDetailPage({
  params,
}: {
  params: Promise<{ seq: string }>;
}) {
  const { seq: seqStr } = use(params);
  const seq = Number(seqStr);
  const result = findThemeBySeq(seq);

  if (!result) notFound();

  const { theme, week } = result;
  const endDate = `${week.year}.${week.dateRange.split("~")[1]}`;
  const contents = getThemeContents(seq, theme.count);

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title={theme.title} fallbackHref="/update" />

      {/* 서브 헤더 */}
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
        <span className="text-[13px] text-ink-mute">{theme.count} 것</span>
        <span className="text-[13px] text-ink-soft">
          {theme.category}
          <span className="ml-2 text-ink-mute">{endDate}</span>
        </span>
      </div>

      {/* 콘텐츠 2열 그리드 */}
      <div className="grid grid-cols-2 gap-px bg-line">
        {contents.map((url, i) => (
          <div key={i} className="relative bg-surface-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="aspect-square w-full object-cover"
            />
            <button
              aria-label="담기"
              className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full"
              style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            >
              <Bookmark size={13} className="text-white" strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
