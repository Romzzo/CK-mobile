"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";

export default function DetailActions() {
  const { isLoggedIn, mounted } = useAuth();
  const [liked, setLiked] = useState(false);

  const onToggle = () => {
    if (mounted && !isLoggedIn) {
      alert("로그인을 해주세요.");
      return;
    }
    setLiked((v) => !v);
  };

  return (
    <div
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-line bg-surface px-4 py-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
    >
      <button
        onClick={onToggle}
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
        {liked ? "좋아요 취소" : "좋아요"}
      </button>
    </div>
  );
}
