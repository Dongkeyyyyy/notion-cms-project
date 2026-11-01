import { cn } from "@/lib/utils"

// 페이지 폭과 좌우 여백을 한 곳에서 관리하는 래퍼
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4", className)} {...props} />
  )
}
