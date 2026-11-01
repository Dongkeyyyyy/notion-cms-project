import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  description?: string
  // 우측에 두는 버튼 등
  actions?: React.ReactNode
  className?: string
}

// 페이지 상단의 제목 + 설명 + 액션 영역
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}
