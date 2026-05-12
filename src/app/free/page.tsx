import PageHeader from "@/components/layout/PageHeader";
import PinGrid from "@/components/home/PinGrid";
import BottomNav from "@/components/layout/BottomNav";

// TODO: 무료콘텐츠 신규 서비스 오픈 후 실제 구성으로 교체 예정 (현재는 기본 형태)
export default function FreeContentPage() {
  return (
    <div className="min-h-dvh bg-surface-muted pb-28">
      <PageHeader title="무료 콘텐츠" subtitle="회원가입만 해도 무료로 받는 콘텐츠" fallbackHref="/" />

      <main className="px-3 pb-2 pt-4">
        <div className="px-1 pb-3">
          <span className="text-[13px] text-ink-mute">매주 신규 업데이트 · K-이미지 · 폰트 3,000종 · PPT 템플릿</span>
        </div>
        <PinGrid />
      </main>

      <BottomNav />
    </div>
  );
}
