"use client";

/**
 * 상단 가로 인디터미넌트 로딩 바.
 * 네비게이션 트랜지션·비동기 fetch 대기 시점에 잠깐 표시.
 *
 * 사용 예:
 *   const [isPending, startTransition] = useTransition();
 *   startTransition(() => router.replace(url));
 *   <LoadingBar visible={isPending} />
 *
 * z-index 는 모든 chrome/sheet 위로 z-[100] 고정 (시스템 인디케이터 톤).
 */
export default function LoadingBar({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      role="progressbar"
      aria-busy={visible}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.18s ease-out",
      }}
    >
      <div
        className="h-full will-change-transform"
        style={{
          width: "33%",
          backgroundColor: "var(--brand)",
          animation: visible ? "ck-loading-slide 1.1s cubic-bezier(0.4,0,0.2,1) infinite" : "none",
        }}
      />
    </div>
  );
}
