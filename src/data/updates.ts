// 주차별 업데이트 아카이브 더미 데이터
// 실서비스는 PC(m.clipartkorea.co.kr/update) 데이터를 따른다.

export type WeeklyUpdate = {
  id: string;
  year: number;
  month: number;
  week: number;
  dateRange: string;
  count: number;
  category: string;
  thumbnails: string[];
  pcUrl: string;
};

const pcUrl = "https://m.clipartkorea.co.kr/update";

const thumb = (seed: string) => `https://picsum.photos/seed/upd-${seed}/300/300`;

export const updates: WeeklyUpdate[] = [
  {
    id: "2026-05-w3",
    year: 2026, month: 5, week: 3,
    dateRange: "05.10~05.16",
    count: 1842,
    category: "국내일러스트",
    thumbnails: [thumb("2605w3a"), thumb("2605w3b"), thumb("2605w3c"), thumb("2605w3d")],
    pcUrl,
  },
  {
    id: "2026-05-w2",
    year: 2026, month: 5, week: 2,
    dateRange: "05.03~05.09",
    count: 2104,
    category: "AI이미지",
    thumbnails: [thumb("2605w2a"), thumb("2605w2b"), thumb("2605w2c"), thumb("2605w2d")],
    pcUrl,
  },
  {
    id: "2026-05-w1",
    year: 2026, month: 5, week: 1,
    dateRange: "04.26~05.02",
    count: 1567,
    category: "포토",
    thumbnails: [thumb("2605w1a"), thumb("2605w1b"), thumb("2605w1c"), thumb("2605w1d")],
    pcUrl,
  },
  {
    id: "2026-04-w4",
    year: 2026, month: 4, week: 4,
    dateRange: "04.19~04.25",
    count: 1320,
    category: "해외일러스트",
    thumbnails: [thumb("2604w4a"), thumb("2604w4b"), thumb("2604w4c"), thumb("2604w4d")],
    pcUrl,
  },
  {
    id: "2026-04-w3",
    year: 2026, month: 4, week: 3,
    dateRange: "04.12~04.18",
    count: 1985,
    category: "PPT",
    thumbnails: [thumb("2604w3a"), thumb("2604w3b"), thumb("2604w3c"), thumb("2604w3d")],
    pcUrl,
  },
  {
    id: "2026-04-w2",
    year: 2026, month: 4, week: 2,
    dateRange: "04.05~04.11",
    count: 1450,
    category: "아이콘",
    thumbnails: [thumb("2604w2a"), thumb("2604w2b"), thumb("2604w2c"), thumb("2604w2d")],
    pcUrl,
  },
  {
    id: "2026-04-w1",
    year: 2026, month: 4, week: 1,
    dateRange: "03.29~04.04",
    count: 1730,
    category: "3D",
    thumbnails: [thumb("2604w1a"), thumb("2604w1b"), thumb("2604w1c"), thumb("2604w1d")],
    pcUrl,
  },
  {
    id: "2026-03-w5",
    year: 2026, month: 3, week: 5,
    dateRange: "03.22~03.28",
    count: 1248,
    category: "PNG",
    thumbnails: [thumb("2603w5a"), thumb("2603w5b"), thumb("2603w5c"), thumb("2603w5d")],
    pcUrl,
  },
  {
    id: "2026-03-w4",
    year: 2026, month: 3, week: 4,
    dateRange: "03.15~03.21",
    count: 1612,
    category: "국내일러스트",
    thumbnails: [thumb("2603w4a"), thumb("2603w4b"), thumb("2603w4c"), thumb("2603w4d")],
    pcUrl,
  },
  {
    id: "2026-03-w3",
    year: 2026, month: 3, week: 3,
    dateRange: "03.08~03.14",
    count: 1390,
    category: "합성·웹",
    thumbnails: [thumb("2603w3a"), thumb("2603w3b"), thumb("2603w3c"), thumb("2603w3d")],
    pcUrl,
  },
  {
    id: "2026-03-w2",
    year: 2026, month: 3, week: 2,
    dateRange: "03.01~03.07",
    count: 1284,
    category: "폰트",
    thumbnails: [thumb("2603w2a"), thumb("2603w2b"), thumb("2603w2c"), thumb("2603w2d")],
    pcUrl,
  },
  {
    id: "2026-03-w1",
    year: 2026, month: 3, week: 1,
    dateRange: "02.22~02.28",
    count: 1505,
    category: "AI이미지",
    thumbnails: [thumb("2603w1a"), thumb("2603w1b"), thumb("2603w1c"), thumb("2603w1d")],
    pcUrl,
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
