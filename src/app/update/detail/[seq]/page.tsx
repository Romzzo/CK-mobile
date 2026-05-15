"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import BottomNav from "@/components/layout/BottomNav";
import ScrollTopButton from "@/components/common/ScrollTopButton";
import LikeButton from "@/components/ui/LikeButton";
import { MASONRY } from "@/components/ui/masonry";
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
  const idsParam = contents.map((c) => c.id).join(",");

  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title={theme.title} fallbackHref="/update" />

      {/* ── 서브 헤더: 카테고리 핀 + 콘텐츠 수 + 날짜 ── */}
      <div className="flex items-center justify-between bg-surface px-4 py-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-[13px] font-semibold"
            style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
          >
            {theme.category}
          </span>
          <span className="text-[13px] text-ink-soft">총 {theme.count}컷</span>
        </div>
        <span className="text-[14px] text-ink-mute">{endDate}</span>
      </div>

      {/* ── 콘텐츠 마소너리 (MASONRY.tight = 1px 여백, R 없음) ── */}
      <div className={`${MASONRY.tight.grid} bg-surface-muted`}>
        {contents.map((c, i) => (
          <ContentTile
            key={c.id}
            id={c.id}
            url={c.url}
            aspect={c.aspect}
            index={i}
            idsParam={idsParam}
          />
        ))}
      </div>

      <ScrollTopButton />

      <BottomNav />
    </div>
  );
}

function ContentTile({
  id,
  url,
  aspect,
  index,
  idsParam,
}: {
  id: number;
  url: string;
  aspect: number;
  index: number;
  idsParam: string;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <Link
      href={`/content/${id}?ids=${idsParam}&idx=${index}`}
      className={`relative block ${MASONRY.tight.item}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt=""
        loading="lazy"
        className="block w-full bg-surface-muted"
        style={{ aspectRatio: aspect }}
      />
      <LikeButton liked={liked} onToggle={() => setLiked((v) => !v)} />
    </Link>
  );
}
