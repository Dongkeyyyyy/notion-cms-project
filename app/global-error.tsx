"use client";

// 루트 레이아웃에서 난 오류를 처리합니다.
// 레이아웃과 전역 스타일을 대체하므로 <html>, <body>를 직접 포함해야 합니다.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="ko">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <title>문제가 발생했습니다</title>
        <h2>문제가 발생했습니다</h2>
        <p>{error.digest ? `오류 코드: ${error.digest}` : "잠시 후 다시 시도해 주세요."}</p>
        <button onClick={() => retry()}>다시 시도</button>
      </body>
    </html>
  );
}
