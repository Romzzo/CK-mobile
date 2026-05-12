"use client";

import { useRouter } from "next/navigation";

const stats = [
  { value: "1,500만+", label: "총 콘텐츠 수" },
  { value: "300만+", label: "누적 회원" },
  { value: "20년+", label: "서비스 운영" },
  { value: "98%", label: "고객 만족도" },
];

export default function BrandStats() {
  const router = useRouter();

  return (
    <div
      className="mx-4 mt-6 rounded-3xl p-5 overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #1E1B4B, #312E81)" }}
    >
      {/* 배경 장식 */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/5" />

      <div className="relative z-10">
        <p className="text-purple-300 text-xs font-semibold mb-1">클립아트코리아는</p>
        <h3 className="text-white font-bold text-base mb-4 leading-snug">
          국내 최대 스톡이미지<br />플랫폼입니다
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white/10 rounded-2xl px-3 py-3">
              <p className="text-white font-bold text-lg leading-none mb-1">{value}</p>
              <p className="text-purple-300 text-xs">{label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/membership")}
          className="mt-4 w-full py-3 rounded-2xl text-sm font-semibold"
          style={{ backgroundColor: "var(--ck-primary)", color: "#fff" }}
        >
          지금 무료로 시작하기
        </button>
      </div>
    </div>
  );
}
