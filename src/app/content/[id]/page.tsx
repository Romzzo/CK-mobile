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
    <div className="min-h-screen bg-white">
      <DetailHeader />

      {/* 이미지 */}
      <div className="relative bg-gray-100 w-full aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />

        {item.isPremium && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
              <p className="text-xs text-gray-500 mb-0.5">멤버십 전용 콘텐츠</p>
              <p className="text-sm font-bold" style={{ color: "var(--ck-primary)" }}>미리보기만 가능해요</p>
            </div>
          </div>
        )}
      </div>

      {/* 콘텐츠 정보 */}
      <div className="px-5 py-4">
        {/* 타입 뱃지 + 제목 */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span
              className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2"
              style={{ backgroundColor: "#F1E9FD", color: "var(--ck-primary)" }}
            >
              {item.type}
            </span>
            <h1 className="text-base font-bold text-gray-900 leading-snug">{item.title}</h1>
          </div>
        </div>

        {/* 작가 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            {item.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-800">@{item.author}</p>
            <p className="text-[10px] text-gray-400">크리에이터</p>
          </div>
          <button
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{ borderColor: "var(--ck-primary)", color: "var(--ck-primary)" }}
          >
            팔로우
          </button>
        </div>

        {/* 통계 */}
        <div className="flex items-center gap-5 py-3 border-y border-gray-100 mb-4">
          {[
            { icon: Eye, label: "조회", value: "12.4K" },
            { icon: Download, label: "다운로드", value: "3.2K" },
            { icon: Heart, label: "찜", value: "891" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-xs font-semibold text-gray-700">{value}</span>
            </div>
          ))}
        </div>

        {/* 태그 */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-2">
            <Tag size={12} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">태그</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 rounded-full text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 관련 콘텐츠 */}
        <div>
          <h2 className="text-sm font-bold text-gray-800 mb-3">관련 콘텐츠</h2>
          <div className="grid grid-cols-3 gap-1.5">
            {relatedItems.map((rel) => (
              <a key={rel.id} href={`/content/${rel.id}`} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover" />
                {rel.isPremium && (
                  <div className="absolute top-1 right-1 bg-black/60 rounded-full px-1.5 py-0.5">
                    <span className="text-[9px] text-white font-bold">PRO</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 여백 (DetailActions 높이) */}
      <div className="h-24" />

      <DetailActions isPremium={item.isPremium} />
    </div>
  );
}
