import Link from "next/link";
import { BookOpen, LayoutTemplate, Palette, ShieldCheck } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 스타터킷에 포함된 기능 요약 (새 항목은 이 배열에 추가)
const features = [
  {
    icon: LayoutTemplate,
    title: "기본 레이아웃",
    description: "헤더, 모바일 메뉴, 푸터, 컨테이너가 준비되어 있습니다.",
  },
  {
    icon: Palette,
    title: "UI 컴포넌트와 다크모드",
    description: "shadcn/ui 컴포넌트와 라이트/다크 테마를 바로 쓸 수 있습니다.",
  },
  {
    icon: ShieldCheck,
    title: "폼과 유효성 검사",
    description: "react-hook-form, zod, 토스트 알림 사용 예시가 있습니다.",
  },
  {
    icon: BookOpen,
    title: "SEO와 상태 화면",
    description: "sitemap, robots, 404, 오류, 로딩 화면이 포함되어 있습니다.",
  },
];

// 스타터킷 홈 화면. 이 파일은 app/(marketing)/page.tsx 입니다.
export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          웹 개발을 바로 시작해 보세요
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            app/(marketing)/page.tsx
          </code>
          를 수정하면 이 화면이 바로 바뀝니다.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button nativeButton={false} render={<Link href="/docs" />}>
            문서 보기
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/examples" />}
          >
            예제 보기
          </Button>
        </div>
      </section>

      <Section className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="mb-2 size-6 text-muted-foreground" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
