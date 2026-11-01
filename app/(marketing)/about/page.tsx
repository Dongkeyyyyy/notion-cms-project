import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "소개",
  description: "스타터킷에 포함된 기술 스택을 소개합니다.",
};

// 스타터킷에 포함된 주요 기술 (새 항목은 이 배열에 추가)
const stack = [
  { name: "Next.js", description: "App Router 기반 React 프레임워크" },
  { name: "TypeScript", description: "타입 안전한 JavaScript" },
  { name: "Tailwind CSS", description: "유틸리티 클래스 기반 스타일링" },
  { name: "shadcn/ui", description: "복사해서 쓰는 UI 컴포넌트 모음" },
];

export default function AboutPage() {
  return (
    <Section className="space-y-8">
      <Breadcrumbs items={[{ title: "홈", href: "/" }, { title: "소개" }]} />
      <PageHeader
        title="소개"
        description="이 스타터킷에 포함된 기술 스택입니다."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {stack.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">포함됨</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
