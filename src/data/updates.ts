// 주차별 업데이트 — PC 웹 www.clipartkorea.co.kr/update 의 주차 아카이브 모사.
// 메인 /update 는 세로 리스트(월별 sticky 헤더), /update/[weekId] 가 상세.
//
// 데이터는 2023.01.01(일) ~ 2026.05.10(일) 까지 일요일 단위로 주차를 모두 생성.
// 월별 1주차는 "해당 월의 1일이 포함된 주" 규칙(주 = 일~토).
// 테마는 themePool 에서 결정적으로 4~7개씩 회전 선택.

export type Theme = {
  id: string;
  title: string;
  cover: string;
  /** 커버 이미지의 width/height 비율 — 마소너리 레이아웃 미리 잡아 CLS 방지 */
  aspect: number;
  count: number;
  category: string;
  seq: number;
};

export type WeeklyUpdate = {
  id: string;
  year: number;
  month: number;
  week: number;
  dateRange: string;
  themes: Theme[];
};

// picsum 으로부터 받을 커버 후보 비율들 — 마소너리 그리드에서 자연 비율 다양성 확보
const SHAPES: ReadonlyArray<{ w: number; h: number }> = [
  { w: 600, h: 800 }, // 3:4 (portrait)
  { w: 600, h: 600 }, // 1:1 (square)
  { w: 600, h: 450 }, // 4:3 (landscape)
  { w: 600, h: 900 }, // 2:3 (tall)
  { w: 600, h: 750 }, // 4:5
];

const themePool: ReadonlyArray<{ title: string; category: string }> = [
  { title: "힘내라 대한민국", category: "국내포토" },
  { title: "summer letter", category: "합성.편집" },
  { title: "이제 핏을 바꿀 시간", category: "합성.편집" },
  { title: "반려동물 동반법", category: "국내일러스트" },
  { title: "스몰웨딩 트렌드", category: "국내포토" },
  { title: "비타민 듬뿍 과일", category: "국내포토" },
  { title: "캠핑 라이프", category: "국내일러스트" },
  { title: "AI 시그니처 캐릭터", category: "AI이미지" },
  { title: "어버이날 감사장", category: "국내일러스트" },
  { title: "봄날의 산책", category: "해외포토" },
  { title: "오피스 인포그래픽", category: "PPT" },
  { title: "라인 아이콘 200", category: "아이콘" },
  { title: "한식 일러스트", category: "국내일러스트" },
  { title: "비즈니스 인물 PNG", category: "PNG" },
  { title: "어린이날 축하", category: "국내일러스트" },
  { title: "근로자의 날", category: "웹.모바일" },
  { title: "3D 캘린더 오브젝트", category: "3D" },
  { title: "사이버 시큐리티", category: "해외일러스트" },
  { title: "여행 가방 패턴", category: "해외포토" },
  { title: "벚꽃 엔딩", category: "국내포토" },
  { title: "세계 책의 날", category: "국내일러스트" },
  { title: "지구의 날 캠페인", category: "웹.모바일" },
  { title: "친환경 폰트 5종", category: "합성.편집" },
  { title: "여름맞이 룩북", category: "해외포토" },
  { title: "재택근무 PPT", category: "PPT" },
  { title: "스포츠 아이콘 100", category: "아이콘" },
  { title: "꽃다발 누끼", category: "PNG" },
  { title: "도시 야경", category: "해외포토" },
  { title: "AI 풍경 셋", category: "AI이미지" },
  { title: "감성 캘리그래피", category: "국내일러스트" },
  { title: "신학기 캠퍼스", category: "국내포토" },
  { title: "헬스 트레이너", category: "해외포토" },
  { title: "3D 비즈니스 캐릭터", category: "3D" },
  { title: "리뉴얼 인포그래픽", category: "PPT" },
  { title: "크리스마스 마켓", category: "해외포토" },
  { title: "겨울 눈꽃 패턴", category: "국내일러스트" },
  { title: "수능 응원", category: "합성.편집" },
  { title: "가을 단풍 풍경", category: "국내포토" },
  { title: "추석 명절", category: "국내일러스트" },
  { title: "할로윈 호박", category: "해외일러스트" },
];

function fmtMD(d: Date): string {
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${mm}.${dd}`;
}

function buildWeeks(): WeeklyUpdate[] {
  // 2023-01-01 (일) ~ 2026-05-10 (일) — 일요일 시작 주차.
  const start = Date.UTC(2023, 0, 1);
  const end = Date.UTC(2026, 4, 10);

  const buckets: Record<string, WeeklyUpdate[]> = {};
  let weekIndex = 0;

  for (let t = start; t <= end; t += 7 * 86_400_000) {
    const sun = new Date(t);
    const sat = new Date(t + 6 * 86_400_000);

    // 주(일~토)가 두 달에 걸치면 "다음 달 1일이 포함된 주 = 다음 달 1주차" 규칙으로 다음 달에 귀속.
    let mYear: number, mMonth: number;
    if (sun.getUTCMonth() === sat.getUTCMonth()) {
      mYear = sun.getUTCFullYear();
      mMonth = sun.getUTCMonth() + 1;
    } else {
      mYear = sat.getUTCFullYear();
      mMonth = sat.getUTCMonth() + 1;
    }

    const monthKey = `${mYear}-${String(mMonth).padStart(2, "0")}`;
    buckets[monthKey] = buckets[monthKey] ?? [];
    const weekN = buckets[monthKey].length + 1;

    const id = `${monthKey}-w${weekN}`;
    const dateRange = `${fmtMD(sun)}~${fmtMD(sat)}`;

    const themeCount = 4 + (weekIndex % 4); // 4~7
    const themes: Theme[] = [];
    for (let i = 0; i < themeCount; i++) {
      const p = themePool[(weekIndex * 7 + i * 11) % themePool.length];
      const shape = SHAPES[(weekIndex * 3 + i * 2) % SHAPES.length];
      themes.push({
        id: `${id}-t${i + 1}`,
        title: p.title,
        cover: `https://picsum.photos/seed/upd-${id}-${i + 1}/${shape.w}/${shape.h}`,
        aspect: shape.w / shape.h,
        count: 5 + ((weekIndex * 3 + i * 5) % 36),
        category: p.category,
        seq: 70000 + weekIndex * 10 + i,
      });
    }

    buckets[monthKey].push({
      id,
      year: mYear,
      month: mMonth,
      week: weekN,
      dateRange,
      themes,
    });

    weekIndex++;
  }

  const all = Object.values(buckets).flat();
  // 최신 주차가 앞으로 (연 → 월 → 주차 내림차순)
  all.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.month !== b.month) return b.month - a.month;
    return b.week - a.week;
  });
  return all;
}

export const updates: WeeklyUpdate[] = buildWeeks();

export function findThemeBySeq(seq: number): { theme: Theme; week: WeeklyUpdate } | null {
  for (const week of updates) {
    const theme = week.themes.find((t) => t.seq === seq);
    if (theme) return { theme, week };
  }
  return null;
}

export function getThemeContents(
  seq: number,
  count: number,
): { id: number; url: string; aspect: number }[] {
  // 마소너리 효과를 위해 비율 분산 (결정적)
  const SHAPES: ReadonlyArray<{ w: number; h: number }> = [
    { w: 400, h: 500 },
    { w: 400, h: 400 },
    { w: 400, h: 600 },
    { w: 400, h: 450 },
    { w: 400, h: 350 },
    { w: 400, h: 550 },
  ];
  return Array.from({ length: count }, (_, i) => {
    const s = SHAPES[(seq + i * 3) % SHAPES.length];
    return {
      id: seq * 1000 + i,
      url: `https://picsum.photos/seed/tc-${seq}-${i}/${s.w}/${s.h}`,
      aspect: s.w / s.h,
    };
  });
}

export const UPDATE_CATEGORIES = [
  "전체 업데이트",
  "국내일러스트",
  "해외일러스트",
  "아이콘",
  "국내포토",
  "해외포토",
  "합성.편집",
  "웹.모바일",
  "3D",
  "PNG",
  "AI이미지",
  "PPT",
] as const;
