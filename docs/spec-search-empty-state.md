# 검색 결과 없음 (Empty State) 명세

> **대상 컴포넌트**: `src/components/home/PinGrid.tsx` — `photos.length === 0 && query` 분기  
> **작성일**: 2026-05-14  
> **상태**: 초안

---

## 현재 문제

```
"gorilla이 포함된 검색결과가 없어요."
"다른 키워드로 검색해주세요."
```

텍스트 2줄만 있어 화면이 비어 보임. 사용자에게 다음 행동을 안내하지 못함.

---

## 설계 원칙 (Toss 스타일 기준)

1. **시각적 앵커** — 텍스트 앞에 아이콘/일러스트로 시선을 먼저 잡는다.
2. **공감 먼저, 지시 나중** — "없어요"를 말한 뒤 이유와 대안을 제시한다.
3. **반드시 탈출구** — 사용자가 키보드 올리지 않고 탭 한 번으로 재시도할 수 있어야 한다.
4. **브랜드 온기** — 에러 느낌 없이 따뜻하게.

---

## 레이아웃

```
[전체 중앙 정렬, pt-16 pb-12, px-6]

      🔍  (아이콘 영역)

  검색 결과가 없어요
  (서브 카피 2줄)

  [키워드 제안 칩 — 가로 스크롤]

  [전체 콘텐츠 보기 버튼]
```

---

## 구성 요소

### 1. 아이콘

- 크기: 64 × 64px
- 형태: 돋보기(Search) 아이콘 + 우하단에 작은 X 마크 오버레이
- 색상: `var(--ink-mute)` (회색 계열 — 에러 붉은 색 NO)
- 구현: lucide `SearchX` 아이콘 또는 인라인 SVG 커스텀

> 📌 참고: Toss는 빈 상태에 일러스트형 아이콘을 쓰지만, 현재 프로젝트에 일러스트 시스템 없음 → lucide로 먼저 구현, 이후 교체 가능하도록 `<EmptyIcon />` 컴포넌트로 분리

### 2. 타이틀

- 텍스트: **`{query}`** 검색 결과가 없어요
- 쿼리 부분: `font-bold text-ink` (브랜드 핑크 아님 — 강조는 굵기로만)
- 나머지: `font-medium text-ink`
- 사이즈: `text-[16px]`

### 3. 서브 카피

최대 2줄. 아래 중 하나 선택 (조건 분기 없이 고정 문구도 OK):

| 우선 | 문구 |
|---|---|
| 1안 (기본) | 철자가 맞는지 확인하거나<br>더 짧은 키워드로 검색해보세요 |
| 2안 | 한글/영문을 바꿔 검색하거나<br>콘텐츠 번호로 검색해보세요 |

- 색상: `text-ink-soft`
- 사이즈: `text-[13px]`
- line-height: `leading-relaxed`

> 💡 변경 이유: 1안이 더 범용적 (영문 쿼리 gorilla에도 철자 체크 안내가 자연스러움). 클립아트코리아는 콘텐츠 번호 검색도 지원하므로 2안 문구도 유효하나 초기엔 단순한 1안 채택.

### 4. 키워드 제안 칩

- 위치: 서브 카피 아래 `mt-6`
- 제목 라벨: `인기 키워드` — `text-[12px] font-bold text-ink-mute mb-2`
- 칩 목록: 가로 스크롤 (`flex gap-2 overflow-x-auto`), 스크롤바 숨김
- 칩 스타일:
  - `rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-ink-soft`
  - 탭 시: 해당 키워드로 검색 (`onSelect(kw)` 콜백 — 부모에서 주입)
- 초기 키워드 목록 (하드코딩, 추후 API 연동):
  ```
  배경화면, 사람, 비즈니스, 자연, 음식, 여행, 패턴, 크리스마스
  ```

> 📌 참고: 실제 클립아트코리아는 "인기 검색어" API 없음 → 현재는 하드코딩. 추후 운영 데이터 연동 시 교체.

### 5. CTA 버튼

**없음 — 키워드 칩으로 충분**

> 💡 결정 이유: 칩이 이미 탭 한 번으로 재검색을 유도함. 별도 CTA 버튼을 추가하면 시선이 분산되고 화면이 무거워짐. Toss도 칩이 있는 empty state엔 별도 버튼을 달지 않음.

---

## 스펙 요약 (개발자용)

```
<div className="flex flex-col items-center px-6 pb-16 pt-16 text-center">
  {/* 1. 아이콘 */}
  <SearchX size={56} className="text-ink-mute mb-5" strokeWidth={1.5} />

  {/* 2. 타이틀 */}
  <p className="text-[16px] font-medium text-ink">
    <strong className="font-bold">{query}</strong> 검색 결과가 없어요
  </p>

  {/* 3. 서브 카피 */}
  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
    철자가 맞는지 확인하거나<br />더 짧은 키워드로 검색해보세요
  </p>

  {/* 4. 키워드 칩 */}
  <div className="mt-6 w-full">
    <p className="mb-2 text-left text-[12px] font-bold text-ink-mute">인기 키워드</p>
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {POPULAR_KEYWORDS.map((kw) => (
        <button key={kw} onClick={() => onSelect(kw)}
          className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-ink-soft">
          {kw}
        </button>
      ))}
    </div>
  </div>

</div>
```

---

## Props 변경 (PinGrid)

현재: `{ query?, sort? }`  
추가 필요:
- `onSelect?: (kw: string) => void` — 키워드 칩 탭 시 부모 검색 트리거

> SearchPage에서 `go(kw)` 연결.

---

## 미결 사항

- [ ] `SearchX` 아이콘 vs 커스텀 일러스트 — 일러스트 시스템 도입 여부 결정 필요
- [ ] 인기 키워드 하드코딩 → 운영 API 연동 타이밍 결정
- [x] CTA 없음으로 결정 — 키워드 칩이 탈출구 역할
- [x] 필터(카테고리) 걸린 경우도 동일한 empty state 사용 — 케이스 분기 없음
