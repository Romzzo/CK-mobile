"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

export default function DetailActions() {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-line bg-surface px-4 py-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
    >
      <button
        onClick={() => setLiked((v) => !v)}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-[15px] font-semibold transition-colors"
        style={
          liked
            ? { borderColor: "var(--danger)", color: "var(--danger)", backgroundColor: "rgba(240,51,75,0.06)" }
            : { borderColor: "var(--line)", color: "var(--ink-soft)", backgroundColor: "var(--surface)" }
        }
      >
        <Heart
          size={18}
          fill={liked ? "var(--danger)" : "none"}
          style={liked ? { color: "var(--danger)" } : undefined}
        />
        {liked ? "찜했어요" : "찜하기"}
      </button>
    </div>
  );
}
