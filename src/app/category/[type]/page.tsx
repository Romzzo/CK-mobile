import { redirect } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import PinGrid from "@/components/home/PinGrid";
import ScrollRestore from "@/components/common/ScrollRestore";
import ScrollTopButton from "@/components/common/ScrollTopButton";
import BottomNav from "@/components/layout/BottomNav";

const categoryMeta: Record<string, { label: string; desc: string }> = {
  update: { label: "업데이트", desc: "이번 주 새로 올라온 콘텐츠" },
  illust: { label: "일러스트", desc: "수채화·라인·캐릭터까지" },
  photo: { label: "사진", desc: "인물·풍경·음식·비즈니스" },
  icon: { label: "아이콘", desc: "라인·플랫·3D 아이콘 세트" },
  ai: { label: "AI 이미지", desc: "AI로 생성한 무한 변형 소스" },
  ppt: { label: "PPT 템플릿", desc: "발표 자료·인포그래픽" },
  composite: { label: "합성·웹", desc: "웹 배너·상세페이지용 합성 소스" },
  "3d": { label: "3D", desc: "리얼한 3D 렌더 오브젝트" },
  png: { label: "PNG", desc: "배경 없는 누끼 PNG 소스" },
  video: { label: "영상·모션", desc: "배경 영상·모션 그래픽" },
};

export default async function CategoryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  // "업데이트"는 카테고리 PinGrid 가 아니라 전용 주차 아카이브 /update 로 보냄.
  if (type === "update") redirect("/update");
  const meta = categoryMeta[type] ?? { label: type, desc: "" };

  return (
    <div className="min-h-dvh bg-surface-muted">
      <PageHeader title={meta.label} subtitle={meta.desc} fallbackHref="/category" />

      <main className="pb-28 pt-4">
        <ScrollRestore />
        <div className="px-4 pb-3">
          <span className="text-[13px] text-ink-mute">
            <span className="font-bold text-ink">{meta.label}</span> 1,234개
          </span>
        </div>
        <PinGrid />
      </main>

      <ScrollTopButton />

      <BottomNav />
    </div>
  );
}
