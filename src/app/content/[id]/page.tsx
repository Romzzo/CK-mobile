import DetailHeader from "@/components/detail/DetailHeader";
import DetailActions from "@/components/detail/DetailActions";
import { mockItems } from "@/lib/mockData";
import { Heart, Eye, Download, Tag } from "lucide-react";

const relatedItems = mockItems.slice(0, 6);

export default async function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = mockItems.find((i) => i.id === Number(id)) ?? mockItems[0];

  const tags = ["일러스트", "여름", "자연", "풍경", "배경", "수채화", "무료"];

  return (
    <div className="min-h-screen bg-surface">
      <DetailHeader />

      {/* 이미지 */}
      <div className="relative aspect-square w-full bg-surface-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />

        {item.isPremium && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
            <div className="rounded-2xl bg-white/90 px-5 py-3 text-center backdrop-blur-sm">
              <p className="mb-0.5 text-[12px] text-ink-soft">멤버십 전용 콘텐츠</p>
              <p className="text-[14px] font-bold text-brand">미리보기만 가능해요</p>
            </div>
          </div>
        )}
      </div>

      {/* 콘텐츠 정보 */}
      <div className="px-5 py-4">
        <div className="mb-3">
          <span
            className="mb-2 inline-block rounded-full px-2.5 py-1 text-[12px] font-semibold"
            style={{ backgroundColor: "var(--brand-soft)", color: "var(--brand)" }}
          >
            {item.type}
          </span>
          <h1 className="text-[17px] font-bold leading-snug text-ink">{item.title}</h1>
        </div>

        {/* 작가 */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ backgroundColor: "var(--brand)" }}>
            {item.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[12px] font-medium text-ink">@{item.author}</p>
            <p className="text-[10px] text-ink-mute">크리에이터</p>
          </div>
          <button
            className="ml-auto rounded-full border px-3 py-1.5 text-[12px] font-semibold"
            style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
          >
            팔로우
          </button>
        </div>

        {/* 통계 */}
        <div className="mb-4 flex items-center gap-5 border-y border-line py-3">
          {[
            { icon: Eye, label: "조회", value: "12.4K" },
            { icon: Download, label: "다운로드", value: "3.2K" },
            { icon: Heart, label: "찜", value: "891" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={14} className="text-ink-mute" />
              <span className="text-[12px] text-ink-mute">{label}</span>
              <span className="text-[12px] font-semibold text-ink-soft">{value}</span>
            </div>
          ))}
        </div>

        {/* 태그 */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-1.5">
            <Tag size={12} className="text-ink-mute" />
            <span className="text-[12px] font-semibold text-ink-soft">태그</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-surface-muted px-2.5 py-1 text-[12px] text-ink-soft">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 관련 콘텐츠 */}
        <div>
          <h2 className="mb-3 text-[15px] font-bold text-ink">관련 콘텐츠</h2>
          <div className="grid grid-cols-3 gap-1.5">
            {relatedItems.map((rel) => (
              <a key={rel.id} href={`/content/${rel.id}`} className="relative aspect-square overflow-hidden rounded-xl bg-surface-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={rel.imageUrl} alt={rel.title} className="h-full w-full object-cover" />
                {rel.isPremium && (
                  <div className="absolute right-1 top-1 rounded-full bg-black/55 px-1.5 py-0.5">
                    <span className="text-[9px] font-bold text-white">PRO</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-24" />

      <DetailActions isPremium={item.isPremium} />
    </div>
  );
}
