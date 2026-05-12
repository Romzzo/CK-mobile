"use client";

import { ArrowLeft, Tag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CouponsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-14 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900">쿠폰 / 포인트</h1>
      </header>

      <div className="flex flex-col items-center justify-center py-32 gap-4 px-8">
        <div
          className="w-16 h-16 rounded-3xl flex items-center justify-center mb-2"
          style={{ backgroundColor: "#F1E9FD" }}
        >
          <Tag size={28} style={{ color: "var(--ck-primary)" }} />
        </div>
        <p className="text-base font-bold text-gray-800">준비 중인 서비스예요</p>
        <p className="text-sm text-gray-400 text-center leading-relaxed">
          쿠폰·포인트 기능은 현재 준비 중이에요.{"\n"}
          조금만 기다려 주세요!
        </p>
        <button
          onClick={() => router.back()}
          className="mt-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white"
          style={{ backgroundColor: "var(--ck-primary)" }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
