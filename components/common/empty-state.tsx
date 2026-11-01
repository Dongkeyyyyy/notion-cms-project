import { cn } from "@/lib/utils"

type EmptyStateProps = {
  icon?: React.ReactNode
  title: string
  description?: string
  // 버튼 등 다음 행동
  action?: React.ReactNode
  className?: string
}

// 데이터가 없거나 페이지를 찾지 못했을 때 보여주는 안내 화면
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 px-4 py-16 text-center",
        className
      )}
    >
      {icon && <div className="text-muted-foreground [&_svg]:size-10">{icon}</div>}
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && (
        <p className="max-w-md text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
