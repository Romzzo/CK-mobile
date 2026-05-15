"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const notices = [
  "AI 인물 콘텐츠는 신체·얼굴의 변형, 합성과 편집이 가능합니다.",
  "일부 피사체는 초상권·재산권·지적재산권 확인이 필요할 수 있습니다.",
  "키워드 및 콘텐츠 내 문구의 정확성은 보증하지 않습니다.",
  "AI 학습용 데이터 제공, NFT, 빅데이터 분석·가공 등에는 사용을 금합니다.",
  "콘텐츠 내 폰트는 이미지 요소로만 제공됩니다.",
];

interface DetailInfoProps {
  contentNo: string;
  type: string;
  isPremium: boolean;
  isNew?: boolean;
  format: string;
  dimensions: string;
  extraFormats: string[];
}

export default function DetailInfo({ contentNo, type, isPremium, isNew, format, dimensions, extraFormats }: DetailInfoProps) {
  const [showFormats, setShowFormats] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className="px-5 pt-4">
      {/* 메타 */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[12px] font-medium text-ink-soft">{contentNo}</span>
        <span className="text-[12px] text-ink-mute">·</span>
        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">{type}</span>
        {isPremium ? (
          <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[11px] font-semibold text-ink-soft">멤버십 전용</span>
        ) : null}
        {isNew ? (
          <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">NEW</span>
        ) : null}
      </div>

      <div className="my-4 h-px bg-line" />

      {/* 스펙 */}
      <div className="flex items-baseline gap-2">
        <span className="rounded-md bg-surface-muted px-1.5 py-0.5 text-[11px] font-bold text-ink-soft">{format}</span>
        <span className="text-[14px] font-semibold text-ink">{dimensions}</span>
      </div>
      {extraFormats.length > 0 ? (
        <div className="mt-2">
          {showFormats ? (
            <p className="text-[13px] text-ink-soft">{[format, ...extraFormats].join(" · ")}</p>
          ) : (
            <button onClick={() => setShowFormats(true)} className="text-[12px] font-medium text-ink-mute">
              추가 포맷 {extraFormats.length}개 더 보기 ∨
            </button>
          )}
        </div>
      ) : null}

      {/* 유의사항 아코디언 */}
      <button
        onClick={() => setShowNotice((v) => !v)}
        className="mt-5 flex w-full items-center justify-between rounded-xl border border-line bg-surface px-4 py-3"
      >
        <span className="text-[13px] font-semibold text-ink">유의사항 보기</span>
        <ChevronDown
          size={15}
          className="text-ink-mute"
          style={{ transform: showNotice ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        />
      </button>
      {showNotice ? (
        <ul className="mt-2 flex flex-col gap-2 rounded-xl bg-surface-muted p-4">
          {notices.map((n) => (
            <li key={n} className="flex gap-2 text-[12px] leading-relaxed text-ink-soft">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-mute" />
              {n}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
