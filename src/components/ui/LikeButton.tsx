"use client";

import { Heart } from "lucide-react";

/**
 * 콘텐츠 카드 우하단 좋아요 토글 버튼.
 * PinGrid, /update/detail 콘텐츠 타일 등에서 공통으로 사용.
 *
 * 상위 Link 안에서 쓸 땐 클릭 이벤트 버블/네비게이션 막기 위해
 * 내부에서 preventDefault + stopPropagation 처리.
 */
export default function LikeButton({
  liked,
  onToggle,
}: {
  liked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      aria-pressed={liked}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-white/60 shadow-sm before:absolute before:-inset-2 before:content-['']"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <Heart
        size={15}
        className={liked ? "" : "text-ink-soft"}
        style={liked ? { color: "var(--danger)" } : undefined}
        fill={liked ? "var(--danger)" : "none"}
      />
    </button>
  );
}
