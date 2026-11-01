import { cn } from "@/lib/utils"

type ExampleBlockProps = {
  title: string
  // 이 예제를 만드는 컴포넌트나 소스 파일 위치
  source: string
  className?: string
  children: React.ReactNode
}

// 예제 하나를 제목 + 결과물 + 소스 위치로 보여주는 틀
export function ExampleBlock({
  title,
  source,
  className,
  children,
}: ExampleBlockProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-semibold">{title}</h3>
        <code className="text-xs text-muted-foreground">{source}</code>
      </div>
      <div className={cn("rounded-lg border p-5", className)}>{children}</div>
    </div>
  )
}
