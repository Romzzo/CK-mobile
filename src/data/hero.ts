// 홈 히어로 배경 이미지 — 페이지 로드마다 이 배열에서 랜덤 1개 선택
// 사용법: 1) public/hero/ 에 jpg/png/webp 파일 업로드  2) 아래에 "/hero/파일명" 추가
export const HERO_IMAGES: string[] = [
  "/hero/hero-00.jpg",
  "/hero/hero-01.jpg",
  "/hero/hero-02.jpg",
  "/hero/hero-03.jpg",
  "/hero/hero-04.jpg",
  "/hero/hero-05.jpg",
  "/hero/hero-06.jpg",
  "/hero/hero-07.jpg",
];

// HERO_IMAGES가 비어 있거나 로딩(SSR) 시 사용되는 폴백
// 실제 폴백 파일 추가 후 "/hero/fallback.jpg" 등으로 교체 예정
export const HERO_FALLBACK = "https://picsum.photos/seed/ck-hero-fallback/1200/720";
