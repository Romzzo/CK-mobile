import PageHeader from "@/components/layout/PageHeader";
import PinGrid from "@/components/home/PinGrid";
import BottomNav from "@/components/layout/BottomNav";

const categoryMeta: Record<string, { label: string; desc: string }> = {
  illust: { label: "일러스트", desc: "수채화·라인·캐릭터까지" },
  photo: { label: "사진", desc: "인물·풍경·음식·비즈니스" },
  icon: { label: "아이콘", desc: "라인·플랫·3D 아이콘 세트" },
  ai: { label: "AI 이미지", desc: "AI로 생성한 무한 변형 소스" },
  ppt: { label: "PPT 템플릿", desc: "발표 자료·인포그래픽" },
  font: { label: "폰트", desc: "한글·영문 무료 폰트" },
  video: { label: "영상·모션", desc: "배경 영상·모션 그래픽" },
};

export default async function CategoryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const meta = categoryMeta[type] ?? { label: type, desc: "" };

  return (
    <div className="min-h-screen bg-surface-muted">
      <PageHeader title={meta.label} subtitle={meta.desc} fallbackHref="/category" />

      <main className="px-3 pb-28 pt-4">
        <div className="px-1 pb-3">
          <span className="text-[13px] text-ink-mute">
            <span className="font-bold text-ink">{meta.label}</span> 1,234개
          </span>
        </div>
        <PinGrid />
      </main>

      <BottomNav />
    </div>
  );
}
