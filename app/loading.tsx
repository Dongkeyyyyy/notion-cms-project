import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

// 페이지 로딩 중 보여주는 화면
export default function Loading() {
  return (
    <Section className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-40 w-full" />
    </Section>
  );
}
