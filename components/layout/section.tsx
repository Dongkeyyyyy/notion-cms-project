import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

// 위아래 간격이 일정한 페이지 구획. 내용은 Container 안에 배치됩니다.
export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-12 sm:py-16", className)} {...props}>
      <Container>{children}</Container>
    </section>
  )
}
