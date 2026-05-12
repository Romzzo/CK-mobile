import DetailHeader from "@/components/detail/DetailHeader";
import DetailInfo from "@/components/detail/DetailInfo";
import DetailActions from "@/components/detail/DetailActions";
import { mockItems } from "@/lib/mockData";

const dimensionsByRatio: Record<string, string> = {
  tall: "3584×5120",
  wide: "5120×3413",
  square: "4096×4096",
};
const aspectByRatio: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};
const vectorTypes = new Set(["일러스트", "아이콘"]);

const tags = ["AI인물", "경제", "민생안정", "소비쿠폰", "소상공인", "안내", "의료뷰티", "지원금", "쿠폰", "활력", "회복"];

export default async function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = mockItems.find((i) => i.id === Number(id)) ?? mockItems[0];

  const contentNo = `tai${String(item.id).padStart(11, "0")}`;
  const dimensions = dimensionsByRatio[item.aspectRatio] ?? "4096×4096";
  const extraFormats = vectorTypes.has(item.type) ? ["AI", "EPS", "PSD"] : [];

  const sameType = mockItems.filter((i) => i.type === item.type && i.id !== item.id);
  const relatedItems = (sameType.length >= 3 ? sameType : mockItems.filter((i) => i.id !== item.id)).slice(0, 6);

  return (
    <div className="min-h-screen bg-surface pb-24">
      <DetailHeader />

      {/* 풀블리드 이미지 */}
      <div className={`relative w-full ${aspectByRatio[item.aspectRatio] ?? "aspect-square"} bg-surface-muted`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
      </div>
      <h1 className="sr-only">{item.title}</h1>

      <DetailInfo
        contentNo={contentNo}
        type={item.type}
        isPremium={item.isPremium}
        isNew={item.isNew}
        format="JPG"
        dimensions={dimensions}
        extraFormats={extraFormats}
      />

      {/* 동일 테마 콘텐츠 */}
      <section className="px-5 pt-7">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[15px] font-bold text-ink">동일 테마 콘텐츠</h2>
          <a href={`/search?q=${encodeURIComponent(item.type)}`} className="text-[13px] font-medium text-ink-mute">
            모두 보기
          </a>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {relatedItems.map((rel) => (
            <a key={rel.id} href={`/content/${rel.id}`} className="relative aspect-square overflow-hidden rounded-xl bg-surface-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={rel.imageUrl} alt={rel.title} className="h-full w-full object-cover" />
              {rel.isPremium ? (
                <div className="absolute right-1 top-1 rounded-full bg-black/55 px-1.5 py-0.5">
                  <span className="text-[9px] font-bold text-white">PRO</span>
                </div>
              ) : null}
            </a>
          ))}
        </div>
      </section>

      {/* 키워드 */}
      <section className="px-5 pt-7">
        <h2 className="text-[15px] font-bold text-ink">키워드</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="rounded-full bg-surface-muted px-2.5 py-1 text-[12px] text-ink-soft">
              {t}
            </a>
          ))}
        </div>
      </section>

      <div className="h-6" />
      <DetailActions />
    </div>
  );
}
