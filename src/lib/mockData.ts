export type ContentType = "일러스트" | "사진" | "아이콘" | "AI이미지" | "PPT" | "폰트" | "영상";

export interface ContentItem {
  id: number;
  title: string;
  type: ContentType;
  isPremium: boolean;
  author: string;
  imageUrl: string;
  aspectRatio: "tall" | "wide" | "square";
  isNew?: boolean;
}

export const categories: { id: string; label: string; emoji: string }[] = [
  { id: "all", label: "전체", emoji: "✦" },
  { id: "illust", label: "일러스트", emoji: "🎨" },
  { id: "photo", label: "사진", emoji: "📷" },
  { id: "icon", label: "아이콘", emoji: "💎" },
  { id: "ai", label: "AI이미지", emoji: "✨" },
  { id: "ppt", label: "PPT", emoji: "📊" },
  { id: "font", label: "폰트", emoji: "Aa" },
  { id: "video", label: "영상", emoji: "🎬" },
];

export const trendingKeywords = [
  "가정의달", "5월", "쿠폰", "봄", "의료뷰티",
  "이벤트", "ai", "선물", "카네이션", "여름",
];

export const mockItems: ContentItem[] = [
  { id: 1, title: "여름 해변 풍경 일러스트", type: "일러스트", isPremium: false, author: "studio_a", imageUrl: "https://picsum.photos/seed/ck1/300/400", aspectRatio: "tall" },
  { id: 2, title: "비즈니스 아이콘 세트", type: "아이콘", isPremium: true, author: "iconlab", imageUrl: "https://picsum.photos/seed/ck2/300/300", aspectRatio: "square" },
  { id: 3, title: "꽃과 나비 수채화", type: "일러스트", isPremium: false, author: "watercolor_j", imageUrl: "https://picsum.photos/seed/ck3/300/450", aspectRatio: "tall", isNew: true },
  { id: 4, title: "도시 야경 사진", type: "사진", isPremium: true, author: "photo_k", imageUrl: "https://picsum.photos/seed/ck4/300/200", aspectRatio: "wide" },
  { id: 5, title: "AI 생성 판타지 배경", type: "AI이미지", isPremium: false, author: "ai_studio", imageUrl: "https://picsum.photos/seed/ck5/300/400", aspectRatio: "tall", isNew: true },
  { id: 6, title: "음식 플랫레이 사진", type: "사진", isPremium: false, author: "food_photo", imageUrl: "https://picsum.photos/seed/ck6/300/300", aspectRatio: "square" },
  { id: 7, title: "귀여운 캐릭터 스티커팩", type: "일러스트", isPremium: true, author: "cute_lab", imageUrl: "https://picsum.photos/seed/ck7/300/350", aspectRatio: "tall" },
  { id: 8, title: "미니멀 라인 아이콘", type: "아이콘", isPremium: false, author: "linedesign", imageUrl: "https://picsum.photos/seed/ck8/300/300", aspectRatio: "square" },
  { id: 9, title: "가을 단풍 배경", type: "사진", isPremium: false, author: "nature_s", imageUrl: "https://picsum.photos/seed/ck9/300/420", aspectRatio: "tall" },
  { id: 10, title: "비즈니스 PPT 템플릿", type: "PPT", isPremium: true, author: "ppt_pro", imageUrl: "https://picsum.photos/seed/ck10/300/200", aspectRatio: "wide", isNew: true },
  { id: 11, title: "AI 로고 디자인", type: "AI이미지", isPremium: false, author: "logoai", imageUrl: "https://picsum.photos/seed/ck11/300/300", aspectRatio: "square" },
  { id: 12, title: "봄 꽃 패턴", type: "일러스트", isPremium: false, author: "pattern_m", imageUrl: "https://picsum.photos/seed/ck12/300/400", aspectRatio: "tall" },
];
