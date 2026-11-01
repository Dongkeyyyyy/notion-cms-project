"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/common/error-state";

// 페이지 안에서 예기치 못한 오류가 났을 때 보여주는 화면
// (이 Next.js 버전에서는 재시도 함수 이름이 retry 입니다)
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // 오류 수집 서비스를 연결한다면 여기에서 전송하세요.
    console.error(error);
  }, [error]);

  return <ErrorState onRetry={retry} />;
}
