# CK-Mobile UI/UX 명세서

> 최초 작성: 2026-05-14  
> 최종 수정: 2026-05-14  
> 브랜치: `claude/redesign-clipart-mobile-VUFzp`  
> 실제 사이트: https://m.clipartkorea.co.kr

---

## 목차

1. [사이트맵](#1-사이트맵)
2. [바텀 네비게이션](#2-바텀-네비게이션)
3. [홈](#3-홈-)
4. [업데이트](#4-업데이트-update)
5. [테마 상세](#5-테마-상세-updatedetailseq)
6. [카테고리](#6-카테고리-category)
7. [검색 결과](#7-검색-결과-searchmulti)
8. [좋아요 (마이보드)](#8-좋아요-마이보드-like)
9. [이벤트](#9-이벤트-event)
10. [추후 확인 필요 사항](#10-추후-확인-필요-사항)

---

## 1. 사이트맵

### 실제 사이트 전체 구조 (m.clipartkorea.co.kr)

```
/                                홈
├── /update                      주간 업데이트 목록
│   └── /update/detail?seq=[n]   테마 상세
├── /category                    카테고리 홈
│   └── /submain/[type]          카테고리별 서브메인
│       (illust · photo · icon · ppt · aiimage · pngobj · 3d · sign)
├── /search/multi?keyword=...    검색 결과
├── /search_curation             큐레이션 검색 (에디터 컬렉션)
├── /event                       이벤트 목록
│   └── /event/detail/[id]       이벤트 상세
├── /myboard                     마이보드 — 좋아요 (로그인 필요)
├── /mypage                      마이페이지 (로그인 필요)
├── /free/sub                    무료 구독 안내
├── /notice                      공지사항
└── /service/*                   서비스 정책 (이용약관·개인정보·이용범위 등)
```

### 우리 구현 범위

```
/                          홈                       ✅ 구현
├── /update                업데이트 목록             ✅ 구현
│   └── /update/detail/[seq]  테마 상세             ❌ 미구현
├── /category              카테고리                 ✅ 구현
│   └── /category/[type]   카테고리별 목록           ✅ 구현
├── /search                검색                     🚧 부분 구현
├── /like                  좋아요 (/myboard 대체)   ✅ 구현
└── /my                    마이페이지               🚧 미구현
```

> 📌 참고: 실제 사이트는 `/submain/[type]` 패턴 사용.  
> 💡 변경 이유: `/category/[type]`으로 통일 — 바텀 네비 카테고리와 경로 일관성.

---

## 2. 바텀 네비게이션

### 우리 구현 (현재)

탭 순서: 홈 / 카테고리 / 검색 / 좋아요 / MY

> 📌 참고: 실제 사이트 바텀 네비는 홈 / 카테고리 / 아이디어피드 / 아이보드 4탭.

### 논의 중인 변경안

**카테고리 → 업데이트 교체 검토**
- 근거: 카테고리는 목적지가 아닌 탐색 수단. 홈 CategoryCards에서 이미 접근 가능.
- 업데이트는 주기적 재방문을 유도하는 핵심 행동.
- 조건: 홈에서 카테고리 탐색 동선 보완 필요.

**이벤트 탭 검토**
- 인스타그램 광고 유입 타겟 마케팅 수단으로 모바일웹 운영.
- 이벤트 상시 운영 예정.

**현재 결론:** 미확정. 업데이트 탭 우선 검토 중.

### 컴포넌트 스펙

- 위치: `fixed bottom-0`, `max-w-[480px]`, `z-50`
- 높이: `58px` + `env(safe-area-inset-bottom)`
- 배경: `rgba(255,255,255,0.96)` + `backdrop-blur(16px)`
- 활성 아이콘: `color: var(--brand)`, `strokeWidth: 2.4`
- 비활성 아이콘: `color: var(--ink-mute)`, `strokeWidth: 1.8`
- 좋아요 탭 활성 시: Heart 아이콘 `fill: var(--brand)`
- 레이블: `text-[10px] font-medium`

---

## 3. 홈 (`/`)

> 브랜드 진입점. 히어로 + 카테고리 탐색 + 온보딩.

### 레이아웃 구조

```
[히어로 배너]
[카테고리 카드 그리드]
[온보딩 배너 (비로그인)]
```

### 컴포넌트

#### 히어로 배너
- 배경: `public/hero/` 이미지에서 랜덤 1개 선택
- 카피: `일잘러의 필수 사이트`
- 이미지 추가 방법: `src/data/hero.ts` → `HERO_IMAGES` 배열에 경로 추가
- 권장 사이즈: 1200×720 이상, 가로형
- 현재 등록: `hero-01.jpg` ~ `hero-07.jpg` (7장)
- 상태: 이미지 로드 전 배경색 fallback

#### 카테고리 카드 그리드
- 탭 → `/category/[type]`
- 홈에서 카테고리 탐색 가능 (바텀 네비 카테고리 탭과 연계)

#### 온보딩 배너
- 비로그인 상태에서만 노출
- CTA: "가입하기"

### 구현 상태
- 히어로 배너: ✅
- 카테고리 카드: ✅
- 온보딩 배너: ✅

### 미확인
- [ ] 홈 추가 섹션 여부 (큐레이션·신규 콘텐츠 등) 추후 결정

---

## 4. 업데이트 (`/update`)

> 주차별 신규 콘텐츠를 테마 단위로 묶어 보여주는 페이지.

### URL
- 경로: `/update`

### 레이아웃 구조

```
[PageHeader: "업데이트"]
[필터 바: 주차 선택 | 카테고리 선택]
[주차 헤딩: YYYY년 MM월 N주차  MM.DD~MM.DD]
[테마 카드 2열 그리드]
[이전 주 더보기 버튼]
[BottomNav]
─ 바텀시트 (필터 조작 시 오버레이) ─
```

### 컴포넌트

#### 필터 바
- 주차 선택 버튼 + 카테고리 선택 버튼 나란히
- 스타일: `rounded-xl border border-line bg-surface px-3.5 py-2.5`
- 탭 시 바텀시트 진입
- 주 기준: 일~토, 월 1주차 = 해당 월 1일이 포함된 주

#### 주차 헤딩
- `YYYY년 MM월 N주차 MM.DD~MM.DD` 한 줄
- 주차명: `text-[15px] font-bold` / 날짜 범위: `text-[13px] text-ink-mute`

#### 테마 카드
- 2열 그리드 (`grid-cols-2 gap-x-3 gap-y-5`)
- 이미지: `aspect-[4/3]`, `rounded-2xl`, `object-cover`
- 카드 하단: 테마 제목 (`text-[13px] font-bold`, truncate) + `□ N` (우측, `text-[12px] text-ink-mute`)
- 탭 → `/update/detail/[seq]` (**미연결, 현재 외부 PC URL**)

#### 이전 주 더보기
- 탭 시 한 주차씩 누적 노출

#### 빈 상태
- "이 주차에는 해당 카테고리 업데이트가 없어요" + "다른 카테고리를 선택해 보세요."

#### 바텀시트
- 배경 딤: `rgba(0,0,0,0.4)`, 탭 시 닫힘
- 시트: `rounded-t-2xl bg-surface px-4 pb-8 pt-4`
- 핸들: `h-1 w-10 rounded-full bg-line`
- 주차 목록: 전체 주차 리스트, 활성에 브랜드 컬러 ✓
- 카테고리: 전체 / 국내일러스트 / 해외일러스트 / 아이콘 / 포토 / AI이미지 / PPT / 폰트 / 3D / PNG / 합성·웹

### 데이터 모델

```ts
type Theme = {
  id: string;
  title: string;    // 테마 제목
  cover: string;    // 커버 이미지 URL
  count: number;    // 포함 콘텐츠 수
  category: string;
  seq: number;      // 상세 페이지 ID (미추가)
  pcUrl: string;    // 임시 PC URL
}

type WeeklyUpdate = {
  id: string;       // "2026-05-w2" 형식
  year: number;
  month: number;
  week: number;
  dateRange: string; // "05.10~05.16"
  themes: Theme[];
}
```

### 구현 상태
- 필터 바 + 바텀시트: ✅
- 주차 헤딩: ✅
- 테마 카드 `aspect-[4/3]`: ✅
- 콘텐츠 수 `□ N`: ✅
- 이전 주 더보기: ✅
- 더미 데이터 (~178주): ✅
- `/update/detail/[seq]` 라우팅 연결: ❌
- `Theme.seq` 더미 데이터 추가: ❌

---

## 5. 테마 상세 (`/update/detail/[seq]`)

> 하나의 테마에 속한 개별 콘텐츠를 그리드로 보여주는 페이지.

### URL
- 우리 구현: `/update/detail/[seq]`
- 실제 사이트: `/update/detail?seq=71494` (쿼리스트링)
- Next.js: `/app/update/detail/[seq]/page.tsx`

### 레이아웃 구조

```
[헤더: ← | 테마 제목]
[서브 헤더: N 것  /  카테고리  날짜]
[콘텐츠 2열 그리드 (정사각형)]
[BottomNav]
```

### 컴포넌트

#### 헤더
- 좌: `<` 뒤로가기 → `/update`
- 중앙: 테마 제목 (예: "그날의 외침"), truncate
- 우: 없음

#### 서브 헤더
- 좌: `N 것` (콘텐츠 수, `text-[13px] text-ink-mute`)
- 우: `카테고리  YYYY.MM.DD` (`text-[13px] text-ink-soft`)

#### 콘텐츠 카드
- 2열 그리드 (`grid-cols-2`)
- 이미지: `aspect-square`, `object-cover`
- 텍스트 없음 (제목·번호 미표시)
- 이미지 우하단: 담기 아이콘 버튼 (오버레이, 소형)
  - 기능 미확인 (담기 / 장바구니 / 즐겨찾기 중 하나)
- 탭 → 개별 콘텐츠 상세 (URL 패턴 미확인)

### 구현 상태
- 페이지 자체: ❌ **미구현**

### 미확인
- [ ] 담기 아이콘 기능 확인 필요
- [ ] 개별 콘텐츠 탭 → 이동 URL 패턴 확인 필요
- [ ] `seq` 기반 실제 API 데이터 구조

---

## 6. 카테고리 (`/category`)

> 콘텐츠 유형별 탐색 진입점. 큐레이터's Choice 에디터 컬렉션.

### URL
- 홈: `/category`
- 서브: `/category/[type]` (illust · photo · icon · ppt · ai · png · 3d · font)

### 레이아웃 구조

```
[헤더: "카테고리"  ✕]
[유형 탭 바 (가로 스크롤)]
[CURATOR'S CHOICE 레이블]
[풀 와이드 에디터 컬렉션 카드 리스트]
```

### 컴포넌트

#### 유형 탭 바
- 가로 스크롤, pill 형태
- 항목: 일러스트 / 사진 / 아이콘 / 폰트 / 3D 등

#### 에디터 컬렉션 카드
- 풀 와이드 이미지 (에디터리얼 대형 사진)
- 이미지 위 컬렉션 이름 텍스트 오버레이
- 탭 → 해당 컬렉션 또는 `/category/[type]`

> 📌 참고: 실제 사이트는 `/submain/[type]` 패턴.  
> 💡 변경 이유: `/category/[type]`으로 통일 — 경로 일관성.

### 구현 상태
- 카테고리 홈: ✅
- 카테고리별 목록 `/category/[type]`: ✅

---

## 7. 검색 결과 (`/search/multi`)

> 키워드 기반 콘텐츠 검색 결과.

### URL
- 패턴: `/search/multi?keyword=[keyword]&sort=[n]&search_mode=multi&search_image_shape=...&search_image_type=...`
- 주요 파라미터:
  - `keyword`: 검색어
  - `sort`: 정렬 (3=관련도순 추정)
  - `search_image_shape`: 이미지 형태 필터 (`1|2|3|`)
  - `search_image_type`: 파일 형식 (`jpg|ai|eps|png|psd|ppt|pptx|`)

### 레이아웃 구조

```
[헤더: 검색창 (키워드 표시) + 필터]
[콘텐츠 수 / 정렬 바]
[검색 결과 2열 masonry 그리드]
```

### 컴포넌트

#### 결과 카드
- 2열 masonry (다양한 비율 혼재)
- 이미지만 표시, 타이틀 없음
- 유형 혼합 (일러스트·포토·아이콘 등)

### 구현 상태
- 기본 UI: 🚧 구현 중
- 실제 검색 API 연동: ❌

---

## 8. 좋아요 / 마이보드 (`/like`)

> 사용자가 좋아요한 개별 콘텐츠 목록. 실제 사이트의 `/myboard`에 대응.

### URL
- 우리 구현: `/like`
- 실제 사이트: `/myboard` (로그인 필요)

### 레이아웃 구조

```
[PageHeader: "좋아요한 콘텐츠"  N개  / 편집]
[유형 필터 바 (가로 스크롤 pill)]
[콘텐츠 2열 masonry 그리드]
[BottomNav]
```

### 컴포넌트

#### 헤더
- 타이틀: "좋아요한 콘텐츠"
- 서브타이틀: `N개` (전체 기준, 필터 무관)
- 우측 "편집" 버튼: 항목 있을 때만 노출

#### 유형 필터 바
- 가로 스크롤 pill, `border-b border-line bg-surface`
- 항목: 전체 / 일러스트 / 사진 / 아이콘 / AI이미지 / PPT
- 활성: `bg-ink text-white` / 비활성: `bg-surface-muted text-ink-soft`
- `rounded-full px-3.5 py-1.5 text-[13px]`

#### 콘텐츠 카드
- 2열 masonry (`columns-2 gap-2.5 px-3 pt-3`)
- 이미지 비율: 데이터 기준 (`tall`→`aspect-[3/4]`, `square`→`aspect-square`, `wide`→`aspect-[3/2]`)
- 카드 하단 (항상): 좌-콘텐츠 번호 `text-[11px] text-ink-mute` / 우-카테고리 뱃지 `text-[10px]`
- 프리미엄: 이미지 좌하단 `🔒 PRO` 오버레이 (`bg-black/65 backdrop-blur`)
- 일반 탭 → `/content/[id]?ids=...&idx=...`

#### 편집 모드
- "편집" 탭으로 진입, "완료"로 종료
- 카드 좌상단 `-` 버튼 (`h-7 w-7 rounded-full bg-white/95`)
- `-` 탭 → 즉시 제거, 확인 없음
- 편집 모드 중 카드 탭 → 상세 이동 X

#### 빈 상태
- Heart 아이콘 + "좋아요한 콘텐츠가 없어요"
- "콘텐츠 둘러보기" 버튼 (`rounded-full bg-brand text-white`) → `/`

### 데이터 모델

```ts
type LikedItem = {
  id: number;
  imageUrl: string;
  aspectRatio: 'tall' | 'square' | 'wide';
  type: string;        // "일러스트" | "사진" | "아이콘" | "AI이미지" | "PPT"
  isPremium: boolean;
}
```

### 구현 상태
- 기본 레이아웃: ✅
- 유형 필터: ✅
- 편집 모드: ✅
- PRO 뱃지: ✅
- 카테고리 뱃지 디자인: 🚧 미확정

### 미확인
- [ ] 카테고리 뱃지 색상·스타일 확정
- [ ] PRO 뱃지 최종 디자인 확정

---

## 9. 이벤트 (`/event`)

> 진행 중·예정 이벤트 목록 및 상세.

### URL
- 목록: `/event`
- 상세: `/event/detail/[id]`

### 레이아웃 구조 (상세)

```
[헤더: 이벤트 제목 + 기본 정보 (인원·가격)]
[메인 이미지/배너]
[Contents 섹션 — 에디터리얼 설명]
[CTA 버튼]
```

### 구현 상태
- ❌ 미구현

---

## 10. 추후 확인 필요 사항

### 기능 확인
- [ ] 테마 상세 — 개별 콘텐츠 탭 시 이동 URL 패턴
- [ ] 테마 상세 — 우하단 담기 아이콘 기능 (담기/장바구니/즐겨찾기?)
- [ ] 바텀 네비 최종 구성 결정 (카테고리/업데이트/이벤트)
- [ ] 검색 페이지 상세 스펙 (필터·정렬·결과 카드 인터랙션)

### 데이터/API
- [ ] `Theme.seq` 더미 데이터에 추가
- [ ] 업데이트 테마 카드 탭 → `/update/detail/[seq]` 라우팅 연결
- [ ] 테마 상세 API 연동 시 실제 `seq` 기반 데이터 구조 확인

### 미구현 페이지
- [ ] `/update/detail/[seq]` — 테마 상세
- [ ] `/my` — 마이페이지
- [ ] `/event` — 이벤트 목록·상세

### 디자인 미확정
- [ ] 카테고리 뱃지 색상·스타일
- [ ] PRO 뱃지 최종 디자인

---

## 11. 코드 가이드라인 (디자인 시스템 부속)

### 아이콘 사이즈 (lucide)

같은 의미의 아이콘은 페이지마다 사이즈가 흔들리지 않도록 3단으로 통일.

| 토큰 | 픽셀 | 쓰임 |
|------|------|------|
| `xs` | 13 | 인라인 CTA 텍스트 옆 (예: ToolCards 카드 CTA, 라이선스 PC 신청) |
| `sm` | 15 | 리스트 row 인디케이터 (마이/설정/무료/SectionHeader 표준) |
| `md` | 18 | 카드/히어로 인디케이터, 플로팅 버튼 (카테고리·이벤트·ScrollTop) |

> 12·14·16·20 사용 금지. 새 아이콘 박을 때 위 3종 중 하나만 선택.
> shadcn 벤더 컴포넌트(`src/components/ui/carousel.tsx` 등)는 예외.

### z-index 토큰

`globals.css` 의 3단 토큰 + Tailwind 커스텀 유틸(`@utility`) 로 노출:

| 클래스 | CSS var | 값 | 쓰임 |
|--------|---------|----|----|
| `z-nav` | `--z-nav` | 50 | sticky header / bottom nav / page chrome |
| `z-overlay` | `--z-overlay` | 55 | 모달·시트 배경 dim |
| `z-sheet` | `--z-sheet` | 60 | 모달·시트 본체 |

> 임의 `z-40`, `z-[55]` 직접 쓰지 말 것. 4단 이상 필요해지면 토큰 확장 먼저 논의.

### 마소너리 그리드 (`@/components/ui/masonry`)

| 변형 | 그리드 | 카드 | 쓰임 |
|------|--------|------|------|
| `tight` | `columns-2 gap-px` | `mb-px ...` | 매거진 톤 (PinGrid·테마 상세 콘텐츠) |
| `loose` | `columns-2 gap-2.5 px-3 pt-3` | `mb-2.5 ...` | 카드 + 정보바 톤 (좋아요·업데이트 리스트) |

### 좋아요 버튼 (`@/components/ui/LikeButton`)

콘텐츠 카드 우하단 좋아요 토글은 항상 이 컴포넌트 사용. `aria-pressed` 자동 포함.

### 바텀시트 (`@/components/ui/BottomSheet`)

z-index / safe-area / `role=dialog` / `aria-modal` / Escape 닫기 모두 자동. 시트 만들 땐 직접 마크업 작성하지 말고 항상 이 컴포넌트로.

### 로딩 바 (`@/components/ui/LoadingBar`)

상단 가로 인디터미넌트 progress bar(2px, brand 색). 네비게이션·비동기 fetch 펜딩 시점에 잠깐 노출.

```tsx
const [isPending, startTransition] = useTransition();
const go = () => startTransition(() => router.replace(url));
<LoadingBar visible={isPending} />
```

전체 페이지 스피너/오버레이 대신 이 컴포넌트로 통일 (Toss 톤). z-[100] 고정이라 chrome/sheet 위에 안전하게 떠 있음.

### 스켈레톤 (placeholder pulse)

이미지·카드 로딩 동안 화면이 비어 보이지 않도록 `animate-pulse bg-surface-muted` 조합 사용. 별도 컴포넌트 없이 클래스 패턴으로 통일.

- **고정 자리(absolute):** `<div className="absolute inset-0 animate-pulse bg-surface-muted" />` — 컨테이너 안 이미지 위에 덮어쓰는 형태. 이미지 `onLoad` 시 제거.
- **레이아웃 자리 차지:** `<div className="w-full animate-pulse bg-surface-muted" style={{ aspectRatio }} />` — 그리드 셀로 흐름 점유. 마소너리·카드 그리드에서 사용.

이미지 페이드인은 `transition-opacity duration-200`, `opacity: loaded ? 1 : 0` 조합. (예: `src/components/detail/HeroImage.tsx`)

전체 페이지 스피너는 도입하지 않음 — 위 스켈레톤 + `LoadingBar` 조합으로 처리.
