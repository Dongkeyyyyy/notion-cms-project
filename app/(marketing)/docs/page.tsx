import type { Metadata } from "next";

import { CodeBlock } from "@/components/common/code-block";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "문서",
  description: "스타터킷 사용 방법: 폴더 구조, 설정, 페이지와 컴포넌트 추가.",
};

// 상단 목차와 각 섹션의 id가 연결됩니다.
const toc = [
  { id: "start", title: "시작하기" },
  { id: "structure", title: "폴더 구조" },
  { id: "config", title: "사이트 설정" },
  { id: "page", title: "페이지 추가" },
  { id: "component", title: "컴포넌트 추가" },
  { id: "libraries", title: "사용 라이브러리" },
  { id: "deploy", title: "배포 전 확인" },
];

// 사용 라이브러리 (이름, 역할, 공식 사이트)
const libraries = [
  { name: "shadcn/ui", role: "UI 컴포넌트 (components/ui)", href: "https://ui.shadcn.com" },
  { name: "lucide-react", role: "아이콘", href: "https://lucide.dev" },
  { name: "next-themes", role: "다크모드 전환", href: "https://github.com/pacocoursey/next-themes" },
  { name: "sonner", role: "토스트 알림", href: "https://sonner.emilkowal.ski" },
  { name: "react-hook-form", role: "폼 상태 관리", href: "https://react-hook-form.com" },
  { name: "zod", role: "입력값 유효성 검사", href: "https://zod.dev" },
];

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function DocsPage() {
  return (
    <Section className="space-y-8">
      <Breadcrumbs items={[{ title: "홈", href: "/" }, { title: "문서" }]} />
      <PageHeader
        title="문서"
        description="스타터킷을 처음 쓸 때 필요한 내용을 순서대로 정리했습니다."
      />

      <nav aria-label="목차" className="flex flex-wrap gap-2 text-sm">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-md border px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.title}
          </a>
        ))}
      </nav>

      <div className="max-w-3xl space-y-10">
        <DocSection id="start" title="시작하기">
          <p className="text-muted-foreground">
            개발 서버를 실행하고, 터미널에 표시되는 <code>Local</code> 주소로
            접속합니다. 3000번 포트를 다른 프로그램이 쓰고 있으면 3001번처럼 다른
            번호가 표시됩니다.
          </p>
          <CodeBlock title="터미널">{`npm install
npm run dev`}</CodeBlock>
        </DocSection>

        <DocSection id="structure" title="폴더 구조">
          <p className="text-muted-foreground">
            위 계층은 아래 계층만 import합니다. 그래서{" "}
            <code>components/ui</code>는 다른 프로젝트로 그대로 복사해도 됩니다.
          </p>
          <CodeBlock title="의존 방향: ui ← common ← layout ← app">{`app/                  페이지와 라우트 ((marketing)/ 은 URL에 나타나지 않는 그룹)
components/
  ui/                 shadcn/ui 컴포넌트 (버튼, 입력, 카드, 다이얼로그 …)
  common/             앱과 무관한 조합 (EmptyState, ErrorState, FormField, CodeBlock)
  layout/             헤더, 푸터, Container, Section, PageHeader, Breadcrumbs
  providers/          ThemeProvider
config/site.ts        사이트 이름, 설명, URL, 메뉴
lib/utils.ts          cn (클래스 병합)`}</CodeBlock>
        </DocSection>

        <DocSection id="config" title="사이트 설정">
          <p className="text-muted-foreground">
            <code>config/site.ts</code>를 고치면 헤더, 모바일 메뉴, 푸터, 메타데이터,
            sitemap에 함께 반영됩니다. 메뉴를 바꾸려면 <code>navItems</code>를
            수정하세요.
          </p>
          <CodeBlock title="config/site.ts">{`export const navItems = [
  { title: "홈", href: "/" },
  { title: "소개", href: "/about" },
]`}</CodeBlock>
        </DocSection>

        <DocSection id="page" title="페이지 추가">
          <p className="text-muted-foreground">
            폴더를 만들고 <code>page.tsx</code>를 두면 그 폴더 이름이 주소가 됩니다.
            메뉴에 보이게 하려면 <code>navItems</code>에 한 줄을 추가합니다.
          </p>
          <CodeBlock title="app/(marketing)/pricing/page.tsx">{`export default function PricingPage() {
  return <h1>요금제</h1>
}`}</CodeBlock>
        </DocSection>

        <DocSection id="component" title="컴포넌트 추가">
          <p className="text-muted-foreground">
            직접 만들지 말고 shadcn/ui에서 추가합니다. 파일은{" "}
            <code>components/ui/</code>에 생성되며, 이미 있는 파일을 덮어쓸지 물으면{" "}
            <code>n</code>을 선택하세요.
          </p>
          <CodeBlock title="터미널">{`npx shadcn@latest add accordion`}</CodeBlock>
          <p className="text-muted-foreground">
            버튼을 링크로 쓸 때는 <code>asChild</code>가 아니라 <code>render</code>와{" "}
            <code>nativeButton=&#123;false&#125;</code>를 함께 씁니다.
          </p>
          <CodeBlock title="링크 모양 버튼">{`<Button nativeButton={false} render={<Link href="/about" />}>
  소개
</Button>`}</CodeBlock>
        </DocSection>

        <DocSection id="libraries" title="사용 라이브러리">
          <ul className="divide-y rounded-lg border">
            {libraries.map((lib) => (
              <li
                key={lib.name}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <a
                  href={lib.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline-offset-4 hover:underline"
                >
                  {lib.name}
                </a>
                <span className="text-sm text-muted-foreground">{lib.role}</span>
              </li>
            ))}
          </ul>
        </DocSection>

        <DocSection id="deploy" title="배포 전 확인">
          <p className="text-muted-foreground">
            <code>config/site.ts</code>의 <code>url</code>은 개발용 주소입니다.
            sitemap, robots, 미리보기 이미지에 쓰이므로 실제 주소로 바꿔야 합니다.
          </p>
        </DocSection>
      </div>
    </Section>
  );
}
