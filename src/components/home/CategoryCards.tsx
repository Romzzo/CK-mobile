"use client";

import { useRouter } from "next/navigation";

const categories = [
  { label: "일러스트", count: "320만+", img: "https://picsum.photos/seed/cat1/200/200", type: "illust" },
  { label: "사진", count: "580만+", img: "https://picsum.photos/seed/cat2/200/200", type: "photo" },
  { label: "아이콘", count: "80만+", img: "https://picsum.photos/seed/cat3/200/200", type: "icon" },
  { label: "AI이미지", count: "신규", img: "https://picsum.photos/seed/cat4/200/200", type: "ai" },
  { label: "PPT", count: "12만+", img: "https://picsum.photos/seed/cat5/200/200", type: "ppt" },
  { label: "폰트", count: "8천+", img: "https://picsum.photos/seed/cat6/200/200", type: "font" },
];

export default function CategoryCards() {
  const router = useRouter();

  return (
    <div className="mt-6 px-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-sm font-bold text-gray-800">카테고리</span>
        <button className="text-xs font-medium" style={{ color: "var(--ck-primary)" }}>전체보기</button>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => router.push(`/category/${cat.type}`)}
            className="relative rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-end pb-2.5"
          >
            {/* 이미지 배경 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cat.img}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* 그라디언트 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* 텍스트 */}
            <div className="relative z-10 text-center">
              <p className="text-white text-xs font-bold">{cat.label}</p>
              <p className="text-white/70 text-[10px]">{cat.count}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
