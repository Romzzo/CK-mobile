export interface EventItem {
  id: number;
  tag: string;
  title: string;
  desc: string;
  href: string;
}

export const events: EventItem[] = [
  { id: 1, tag: "신규 가입", title: "신규가입 50% 할인", desc: "1년 라이선스 기준가에서 반값", href: "/membership" },
  { id: 3, tag: "AI 이미지", title: "AI에 가치를 더하다", desc: "초상권 걱정 없는 AI 이미지 컬렉션", href: "/category/ai" },
  { id: 4, tag: "프리미엄 컬렉션", title: "170만 컷 프리미엄 컬렉션", desc: "클립아트코리아만의 특별한 멤버십 혜택", href: "/membership" },
  { id: 5, tag: "크리에이터", title: "크리에이터 라이선스", desc: "198,000원 → 132,000원 / 6개월", href: "/membership" },
  { id: 6, tag: "무료 회원", title: "무료회원 평생 혜택", desc: "K-이미지 · PPT · 콘텐츠 매일 무료", href: "/free" },
];
