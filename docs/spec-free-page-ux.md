# /free 페이지 UX 개선 명세

## 원칙
- **퍼블리싱만** — API·상태 변경 없음. JSX/CSS/텍스트 수정만.
- 개발공수 최소화. 컴포넌트 신규 생성 X, 기존 구조에서 조정.

---

## 변경 1 — 경고 배너 위치 이동 (최우선)

**현재**: 헤더 바로 아래 (페이지 최상단)
**변경**: "이용 안내" 아코디언 바로 위로 이동

첫 화면에서 가치 전달 먼저, 제약 안내는 나중에.

```
Before: PageHeader → ⚠️배너 → 혜택카드 → 에디터 → 이용안내 → CTA
After:  PageHeader → 혜택카드 → 에디터 → ⚠️배너 → 이용안내 → CTA
```

---

## 변경 2 — 혜택 카드에 썸네일 추가

각 카드 상단에 대표 이미지 추가. **외부 fetch 없이 정적 picsum/unsplash URL** 사용 (기존 앱 패턴과 동일).

카드 구조 변경:
```
[기존]
아이콘 + 제목 + 설명 + 뱃지

[변경]
썸네일 이미지 (aspect-[4/3], object-cover, rounded-xl, 카드 상단) +
아이콘 + 제목 + 설명 + 뱃지
```

각 카드별 대표 이미지 (picsum seed 고정):
- AI 이미지: `https://picsum.photos/seed/free-ai/400/300`
- 무료 이미지: `https://picsum.photos/seed/free-img/400/300`
- 폰트: `https://picsum.photos/seed/free-font/400/300`
- K-이미지: `https://picsum.photos/seed/free-kimg/400/300`

썸네일 높이: `h-[90px]` (카드 너비의 절반 기준)

---

## 변경 3 — 뱃지 텍스트 프레이밍 개선

숫자 중심 → 가치 중심으로 바꿔서 더 매력적으로.

| 현재 | 변경 |
|------|------|
| `1컷 / 일` | `매일 1컷 무료` |
| `5컷 / 일` | `매일 5컷 무료` |
| `무제한` | `무제한 무료` |
| `20컷 / 일` | `매일 20컷 무료` |

---

## 변경 4 — 카드에 href 연결

각 혜택 카드를 클릭 가능한 Link로 변경. 콘텐츠 탐색으로 자연스럽게 유도.

```ts
const benefits = [
  { ..., href: "/category/ai" },
  { ..., href: "/category/illust" },
  { ..., href: "/search?q=폰트" },
  { ..., href: "/search?q=K-이미지" },
];
```

카드 래퍼: `<div>` → `<Link href={b.href}>` + 우하단에 `ChevronRight size={12}` 추가

---

## 변경 5 — "이용 안내" 아코디언 → 기본 열림

현재 닫힌 채로 있어서 내용이 숨겨짐 → **useState 초기값을 `true`로 변경**.

```ts
// 현재
const [openNotice, setOpenNotice] = useState(false);

// 변경
const [openNotice, setOpenNotice] = useState(true);
```

---

## 변경 6 — 섹션 헤더 카피 개선

```
현재: "무료회원 혜택"  /  "가입만 해도 평생 무료"
변경: "무료회원 혜택"  /  "평생 무료, 매일 충전"
```

```
현재 서브: "매일 초기화, 상업적 이용 가능"
변경 서브: "매일 자정 충전 · 상업적 이용 가능"
```

---

## 변경 없는 것

- 로그인 상태 쿼터 표시 → API 필요, 제외
- 에디터 섹션 → 현행 유지 (로그인 분기 이미 잘 되어 있음)
- CTA 버튼 → 현행 유지
- BottomNav → 현행 유지
