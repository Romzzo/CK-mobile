/**
 * 마소너리 그리드 공통 클래스. 2가지 변형:
 *
 * - tight : 1px 여백 + 라운드 없음. 매거진 톤(테마 상세, 검색 결과)
 * - loose : 10px 여백 + 카드 외부 padding. 카드 + 정보바 톤(좋아요, 업데이트 리스트)
 *
 * 사용 예:
 *   <div className={MASONRY.tight.grid}>
 *     {items.map(i => <a className={MASONRY.tight.item} key={i.id}>...</a>)}
 *   </div>
 */
export const MASONRY = {
  tight: {
    grid: "columns-2 gap-px",
    item: "mb-px break-inside-avoid",
  },
  loose: {
    grid: "columns-2 gap-2.5 px-3 pt-3",
    item: "mb-2.5 break-inside-avoid",
  },
} as const;
