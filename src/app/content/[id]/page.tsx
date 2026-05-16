import DetailHeader from "@/components/detail/DetailHeader";
import DetailInfo from "@/components/detail/DetailInfo";
import DetailActions from "@/components/detail/DetailActions";
import DetailSwiper from "@/components/detail/DetailSwiper";
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

type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  alt: string;
  src: { large: string; large2x: string; medium: string; original: string };
  photographer: string;
};

// PinGrid 등에서 넘어온 id 가 실제 Pexels 사진이면 가져와 mockItem 위에 덮어씀.
// 테마 상세 seq*1000+i 처럼 Pexels 에 없는 id 는 404 → null → mockItem 폴백.
async function fetchPexelsPhoto(id: number): Promise<PexelsPhoto | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey || !Number.isFinite(id) || id <= 0) return null;
  try {
    const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      headers: { Authorization: apiKey },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return (await res.json()) as PexelsPhoto;
  } catch {
    return null;
  }
}

function ratioKeyOf(w: number, h: number): "tall" | "wide" | "square" {
  if (h > w * 1.15) return "tall";
  if (w > h * 1.15) return "wide";
  return "square";
}

type SP = { [key: string]: string | string[] | undefined };

function parseSwipeState(sp: SP, currentId: number) {
  const raw = typeof sp.ids === "string" ? sp.ids : "";
  let ids = raw
    .split(",")
    .map((s) => parseInt(s, 10))
    .filter((n) => Number.isFinite(n));
  if (ids.length === 0 || !ids.includes(currentId)) ids = [currentId];

  let idx = typeof sp.idx === "string" ? parseInt(sp.idx, 10) : NaN;
  if (!Number.isFinite(idx) || idx < 0 || idx >= ids.length || ids[idx] !== currentId) {
    idx = ids.indexOf(currentId);
    if (idx < 0) idx = 0;
  }

  const dir: "next" | "prev" | null = sp.dir === "next" ? "next" : sp.dir === "prev" ? "prev" : null;
  return { ids, idx, dir };
}

export default async function ContentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SP>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const item = mockItems.find((i) => i.id === Number(id)) ?? mockItems[0];

  // Pexels 사진이면 가져와 표시 (검색·카테고리에서 진입한 케이스 연결성 유지)
  const pexels = await fetchPexelsPhoto(Number(id));
  const heroSrc = pexels?.src.large2x ?? pexels?.src.large ?? item.imageUrl;
  const heroAlt = pexels?.alt || item.title;
  const aspectKey = pexels ? ratioKeyOf(pexels.width, pexels.height) : item.aspectRatio;
  const dimensions = pexels
    ? `${pexels.width}×${pexels.height}`
    : dimensionsByRatio[item.aspectRatio] ?? "4096×4096";

  const { ids, idx, dir } = parseSwipeState(sp, Number(id));

  const contentNo = `tai${String(item.id).padStart(11, "0")}`;
  const extraFormats = vectorTypes.has(item.type) ? ["AI", "EPS", "PSD"] : [];

  const sameType = mockItems.filter((i) => i.type === item.type && i.id !== item.id);
  const relatedItems = (sameType.length >= 3 ? sameType : mockItems.filter((i) => i.id !== item.id)).slice(0, 6);
  const relatedIds = relatedItems.map((r) => r.id).join(",");

  return (
    <div className="min-h-dvh bg-surface pb-24">
      <DetailHeader pageCount={ids.length > 1 ? { current: idx + 1, total: ids.length } : undefined} />

      <DetailSwiper key={String(id)} ids={ids} idx={idx} dir={dir}>
        {/* 풀블리드 이미지 */}
        <div className={`relative w-full ${aspectByRatio[aspectKey] ?? "aspect-square"} bg-surface-muted`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroSrc} alt={heroAlt} className="h-full w-full object-cover" />
        </div>
        <h1 className="sr-only">{heroAlt}</h1>

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
            {relatedItems.map((rel, j) => (
              <a
                key={rel.id}
                href={`/content/${rel.id}?ids=${relatedIds}&idx=${j}`}
                className="relative aspect-square overflow-hidden rounded-xl bg-surface-muted"
              >
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
      </DetailSwiper>

      <DetailActions />
    </div>
  );
}
