import { cn } from "@/lib/utils"

type CodeBlockProps = {
  // 코드 위에 표시할 파일 경로나 설명
  title?: string
  children: string
  className?: string
}

// 문서에 코드를 보여주는 블록 (구문 강조 없음)
export function CodeBlock({ title, children, className }: CodeBlockProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border bg-muted/40", className)}>
      {title && (
        <div className="border-b px-4 py-2 font-mono text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  )
}
