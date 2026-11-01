import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicExample } from "./basic-example";
import { ControlsExample } from "./controls-example";
import { ExampleBlock } from "./example-block";
import { FeedbackExample } from "./feedback-example";
import { FormExample } from "./form-example";
import { OverlayExample } from "./overlay-example";

export const metadata: Metadata = {
  title: "예제",
  description: "스타터킷에 포함된 컴포넌트를 실제로 동작시켜 볼 수 있는 예제.",
};

export default function ExamplesPage() {
  return (
    <Section className="space-y-8">
      <Breadcrumbs items={[{ title: "홈", href: "/" }, { title: "예제" }]} />
      <PageHeader
        title="예제"
        description="컴포넌트를 직접 눌러 보고, 각 예제 옆의 소스 위치에서 코드를 확인하세요."
      />

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">기본</TabsTrigger>
          <TabsTrigger value="form">폼</TabsTrigger>
          <TabsTrigger value="overlay">오버레이</TabsTrigger>
          <TabsTrigger value="feedback">피드백</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="pt-6">
          <BasicExample />
        </TabsContent>
        <TabsContent value="form" className="space-y-8 pt-6">
          <ExampleBlock
            title="폼 + 유효성 검사 + 토스트"
            source="app/(marketing)/examples/form-example.tsx"
          >
            <FormExample />
          </ExampleBlock>
          <ExampleBlock
            title="체크박스 / 스위치 / 셀렉트"
            source="app/(marketing)/examples/controls-example.tsx"
          >
            <ControlsExample />
          </ExampleBlock>
        </TabsContent>
        <TabsContent value="overlay" className="pt-6">
          <OverlayExample />
        </TabsContent>
        <TabsContent value="feedback" className="pt-6">
          <FeedbackExample />
        </TabsContent>
      </Tabs>
    </Section>
  );
}
