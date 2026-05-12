import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImageGrid from "@/components/home/ImageGrid";
import BottomNav from "@/components/layout/BottomNav";

const categoryMeta: Record<string, { label: string; desc: string; color: string }> = {
  illust:  { label: "일러스트", desc: "다양한 스타일의 벡터 일러스트", color: "#7A3DEA" },
  photo:   { label: "사진", desc: "고퀄리티 스톡 포토", color: "#2563EB" },
  icon:    { label: "아이콘", desc: "깔끔한 아이콘 세트", color: "#059669" },
  ai:      { label: "AI이미지", desc: "AI로 생성된 창의적 이미지", color: "#DB2777" },
  ppt:     { label: "PPT", desc: "업무용 프레젠테이션 템플릿", color: "#D97706" },
  font:    { label: "폰트", desc: "한글·영문 다양한 폰트", color: "#7C3AED" },
  video:   { label: "영상·모션", desc: "숏폼·영상 편집용 소스", color: "#DC2626" },
};

export default async function CategoryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const meta = categoryMeta[type] ?? { label: type, desc: "", color: "#7A3DEA" };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-14 flex items-center gap-3">
        <Link href="/" className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-700" />
        </Link>
        <div>
          <h1 className="text-base font-bold text-gray-900">{meta.label}</h1>
          {meta.desc && <p className="text-[11px] text-gray-400">{meta.desc}</p>}
        </div>
      </header>

      {/* 카테고리 헤더 배너 */}
      <div
        className="px-5 py-6"
        style={{ background: `linear-gradient(135deg, ${meta.color}22, ${meta.color}08)` }}
      >
        <div
          className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-2"
          style={{ backgroundColor: meta.color }}
        >
          {meta.label}
        </div>
        <p className="text-sm text-gray-600">{meta.desc}</p>
      </div>

      <ImageGrid />
      <BottomNav />
    </div>
  );
}
