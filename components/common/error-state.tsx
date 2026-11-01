import { TriangleAlert } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"

type ErrorStateProps = {
  title?: string
  description?: string
  // 다시 시도 함수 (error.tsx의 retry)
  onRetry?: () => void
}

// 오류가 났을 때 보여주는 화면
export function ErrorState({
  title = "문제가 발생했습니다",
  description = "잠시 후 다시 시도해 주세요.",
  onRetry,
}: ErrorStateProps) {
  return (
    <EmptyState
      icon={<TriangleAlert />}
      title={title}
      description={description}
      action={onRetry && <Button onClick={onRetry}>다시 시도</Button>}
    />
  )
}
