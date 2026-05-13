// 주차별 업데이트 — 각 주차에 여러 "테마 컬렉션"이 들어 있는 구조.
// PC 웹 m.clipartkorea.co.kr/update 의 화면 패턴(주차 단일 표시 + 테마 카드 2열 그리드)을
// 모바일 디자인 시스템으로 재구성한 더미 데이터.

export type Theme = {
  id: string;
  title: string;
  cover: string;
  count: number;
  category: string; // 국내일러스트 | 해외일러스트 | 아이콘 | 포토 | AI이미지 | PPT | 폰트 | 3D | PNG | 합성·웹
  pcUrl: string;
};

export type WeeklyUpdate = {
  id: string;
  year: number;
  month: number;
  week: number;
  dateRange: string;
  themes: Theme[];
};

const pcUrl = "https://m.clipartkorea.co.kr/update";
const cover = (seed: string) => `https://picsum.photos/seed/upd-${seed}/600/800`;

export const updates: WeeklyUpdate[] = [
  {
    id: "2026-05-w3",
    year: 2026, month: 5, week: 3,
    dateRange: "05.10~05.16",
    themes: [
      { id: "26w3-1", title: "힘내라 대한민국", cover: cover("26w3-1"), count: 7, category: "포토", pcUrl },
      { id: "26w3-2", title: "summer letter", cover: cover("26w3-2"), count: 16, category: "합성·웹", pcUrl },
      { id: "26w3-3", title: "이제 핏을 바꿀 시간", cover: cover("26w3-3"), count: 11, category: "합성·웹", pcUrl },
      { id: "26w3-4", title: "반려동물 동반법", cover: cover("26w3-4"), count: 9, category: "국내일러스트", pcUrl },
      { id: "26w3-5", title: "스몰웨딩 트렌드", cover: cover("26w3-5"), count: 12, category: "포토", pcUrl },
      { id: "26w3-6", title: "비타민 듬뿍 과일", cover: cover("26w3-6"), count: 14, category: "포토", pcUrl },
      { id: "26w3-7", title: "캠핑 라이프", cover: cover("26w3-7"), count: 18, category: "국내일러스트", pcUrl },
      { id: "26w3-8", title: "AI 시그니처 캐릭터", cover: cover("26w3-8"), count: 22, category: "AI이미지", pcUrl },
    ],
  },
  {
    id: "2026-05-w2",
    year: 2026, month: 5, week: 2,
    dateRange: "05.03~05.09",
    themes: [
      { id: "26w2-1", title: "어버이날 감사장", cover: cover("26w2-1"), count: 10, category: "국내일러스트", pcUrl },
      { id: "26w2-2", title: "봄날의 산책", cover: cover("26w2-2"), count: 15, category: "포토", pcUrl },
      { id: "26w2-3", title: "오피스 인포그래픽", cover: cover("26w2-3"), count: 8, category: "PPT", pcUrl },
      { id: "26w2-4", title: "라인 아이콘 200", cover: cover("26w2-4"), count: 200, category: "아이콘", pcUrl },
      { id: "26w2-5", title: "한식 일러스트", cover: cover("26w2-5"), count: 13, category: "국내일러스트", pcUrl },
      { id: "26w2-6", title: "비즈니스 인물 PNG", cover: cover("26w2-6"), count: 24, category: "PNG", pcUrl },
    ],
  },
  {
    id: "2026-05-w1",
    year: 2026, month: 5, week: 1,
    dateRange: "04.26~05.02",
    themes: [
      { id: "26w1-1", title: "어린이날 축하", cover: cover("26w1-1"), count: 11, category: "국내일러스트", pcUrl },
      { id: "26w1-2", title: "근로자의 날", cover: cover("26w1-2"), count: 6, category: "합성·웹", pcUrl },
      { id: "26w1-3", title: "3D 캘린더 오브젝트", cover: cover("26w1-3"), count: 9, category: "3D", pcUrl },
      { id: "26w1-4", title: "사이버 시큐리티", cover: cover("26w1-4"), count: 14, category: "해외일러스트", pcUrl },
      { id: "26w1-5", title: "여행 가방 패턴", cover: cover("26w1-5"), count: 12, category: "포토", pcUrl },
    ],
  },
  {
    id: "2026-04-w4",
    year: 2026, month: 4, week: 4,
    dateRange: "04.19~04.25",
    themes: [
      { id: "26-04w4-1", title: "벚꽃 엔딩", cover: cover("2604w4-1"), count: 17, category: "포토", pcUrl },
      { id: "26-04w4-2", title: "세계 책의 날", cover: cover("2604w4-2"), count: 8, category: "국내일러스트", pcUrl },
      { id: "26-04w4-3", title: "지구의 날 캠페인", cover: cover("2604w4-3"), count: 10, category: "합성·웹", pcUrl },
      { id: "26-04w4-4", title: "친환경 폰트 5종", cover: cover("2604w4-4"), count: 5, category: "폰트", pcUrl },
      { id: "26-04w4-5", title: "여름맞이 룩북", cover: cover("2604w4-5"), count: 19, category: "포토", pcUrl },
    ],
  },
  {
    id: "2026-04-w3",
    year: 2026, month: 4, week: 3,
    dateRange: "04.12~04.18",
    themes: [
      { id: "26-04w3-1", title: "재택근무 PPT", cover: cover("2604w3-1"), count: 12, category: "PPT", pcUrl },
      { id: "26-04w3-2", title: "스포츠 아이콘 100", cover: cover("2604w3-2"), count: 100, category: "아이콘", pcUrl },
      { id: "26-04w3-3", title: "꽃다발 누끼", cover: cover("2604w3-3"), count: 16, category: "PNG", pcUrl },
      { id: "26-04w3-4", title: "도시 야경", cover: cover("2604w3-4"), count: 9, category: "포토", pcUrl },
      { id: "26-04w3-5", title: "AI 풍경 셋", cover: cover("2604w3-5"), count: 18, category: "AI이미지", pcUrl },
      { id: "26-04w3-6", title: "감성 캘리그래피", cover: cover("2604w3-6"), count: 7, category: "국내일러스트", pcUrl },
    ],
  },
  {
    id: "2026-04-w2",
    year: 2026, month: 4, week: 2,
    dateRange: "04.05~04.11",
    themes: [
      { id: "26-04w2-1", title: "신학기 캠퍼스", cover: cover("2604w2-1"), count: 14, category: "포토", pcUrl },
      { id: "26-04w2-2", title: "헬스 트레이너", cover: cover("2604w2-2"), count: 11, category: "포토", pcUrl },
      { id: "26-04w2-3", title: "3D 비즈니스 캐릭터", cover: cover("2604w2-3"), count: 13, category: "3D", pcUrl },
      { id: "26-04w2-4", title: "리뉴얼 인포그래픽", cover: cover("2604w2-4"), count: 6, category: "PPT", pcUrl },
    ],
  },
];

export const UPDATE_CATEGORIES = [
  "전체",
  "국내일러스트",
  "해외일러스트",
  "아이콘",
  "포토",
  "AI이미지",
  "PPT",
  "폰트",
  "3D",
  "PNG",
  "합성·웹",
] as const;
