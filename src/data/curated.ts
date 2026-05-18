// 홈 카테고리 (9종) · 클립아트코리아 오리지널 (4종) 큐레이션 데이터
//
// 사용법:
//   1) public/category/ 또는 public/originals/ 에 jpg/png/webp 업로드
//   2) 아래 image 값을 "/category/파일명.jpg" / "/originals/파일명.jpg" 로 교체
//
// 지금은 picsum placeholder URL로 채워져 있어 라이브에서 깨지지 않음.

export type Category = {
  label: string;
  type: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { label: "업데이트",  type: "update",    image: "https://picsum.photos/seed/cat-update/400/500" },
  { label: "일러스트", type: "illust",    image: "/category/illust.jpg" },
  { label: "사진",     type: "photo",     image: "https://picsum.photos/seed/cat-photo/400/500" },
  { label: "아이콘",   type: "icon",      image: "https://picsum.photos/seed/cat-icon/400/500" },
  { label: "AI 이미지", type: "ai",        image: "/category/ai.jpg" },
  { label: "PPT", type: "ppt",      image: "https://picsum.photos/seed/cat-ppt/400/500" },
  { label: "합성·웹",  type: "composite", image: "https://picsum.photos/seed/cat-composite/400/500" },
  { label: "3D",       type: "3d",        image: "https://picsum.photos/seed/cat-3d/400/500" },
  { label: "PNG",      type: "png",       image: "https://picsum.photos/seed/cat-png/400/500" },
];

export type OriginalCollection = {
  title: string;
  sub: string;
  keyword: string;
  href: string;
  image: string;
};

export const ORIGINAL_COLLECTIONS: OriginalCollection[] = [
  { title: "AI캐릭터",     sub: "다양한 3D 캐릭터",        keyword: "AI캐릭터", href: "/category/ai",       image: "https://picsum.photos/seed/orig-ai-character/300/400" },
  { title: "킨포크 라이프", sub: "완벽하지 않아도 괜찮아요", keyword: "킨포크",   href: "/search?q=킨포크",   image: "https://picsum.photos/seed/orig-kinfolk/300/400" },
  { title: "결혼의계절",   sub: "눈부신 계절의 우리",      keyword: "결혼",     href: "/search?q=결혼",     image: "https://picsum.photos/seed/orig-wedding/300/400" },
  { title: "푸른 자연",    sub: "자연의 아름다움",         keyword: "자연",     href: "/search?q=자연",     image: "https://picsum.photos/seed/orig-nature/300/400" },
];
