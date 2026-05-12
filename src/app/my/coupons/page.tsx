"use client";

import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";

export default function CouponsPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-surface-muted">
      <PageHeader title="쿠폰 / 포인트" fallbackHref="/my" />

      <div className="flex flex-col items-center justify-center gap-4 px-8 py-32">
        <div
          className="mb-2 flex h-16 w-16 items-center justify-center rounded-3xl"
          style={{ backgroundColor: "var(--brand-soft)" }}
        >
          <Tag size={28} style={{ color: "var(--brand)" }} />
        </div>
        <p className="text-[16px] font-bold text-ink">준비 중인 서비스예요</p>
        <p className="whitespace-pre-line text-center text-[14px] leading-relaxed text-ink-mute">
          {"쿠폰·포인트 기능은 현재 준비 중이에요.\n조금만 기다려 주세요!"}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-white"
          style={{ backgroundColor: "var(--brand)" }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
