# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
npm run lint     # ESLint (eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit # 타입 검사 (별도 스크립트 없음)
```

테스트 러너는 설정되어 있지 않습니다. 브라우저 검증이 필요하면 `.mcp.json`에 등록된 Playwright MCP를 사용합니다.

## 개요

Next.js 16(App Router) + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui(base-nova 스타일, `@base-ui/react` 기반) 스타터킷입니다. 경로 별칭은 `@/*` → 프로젝트 루트입니다. 폼은 react-hook-form + zod, 다크모드는 next-themes, 토스트는 sonner를 사용합니다.

**이 Next.js 버전은 기존 지식과 다릅니다.** 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 해당 가이드를 읽으세요. 예: `error.tsx`는 `reset`이 아니라 `retry` prop을 받고, 레이아웃 props 타입은 전역 헬퍼(`LayoutProps<"/">`)를 사용합니다.

## 아키텍처

### 컴포넌트 계층 (단방향 import)

`components/ui` ← `components/common` ← `components/layout` ← `app`

위 계층은 아래 계층만 import합니다. 반대 방향 import는 금지입니다.

- `ui/`: shadcn/ui 생성 파일. `npx shadcn@latest add <name>`으로 추가하며 `init`은 다시 실행하지 않습니다(`components.json` 설정 완료). 기존 파일을 덮어쓰지 않도록 주의합니다.
- `common/`: 앱과 무관한 조합 컴포넌트 (EmptyState, ErrorState, FormField, CodeBlock)
- `layout/`: 헤더, 모바일 메뉴, 푸터, Container, Section, PageHeader, Breadcrumbs, ThemeToggle
- `providers/`: ThemeProvider

### 사이트 설정 단일 출처

`config/site.ts`의 `siteConfig`(이름, 설명, url)와 `navItems`가 헤더, 푸터, 메타데이터(`app/layout.tsx`), sitemap, robots, OG 이미지에 공통 반영됩니다. 사이트 이름·메뉴는 이 파일에서만 수정합니다. `url`은 개발용 `http://localhost:3000`이므로 배포 전 교체가 필요합니다.

### 라우팅

- `app/layout.tsx`: 루트 레이아웃. ThemeProvider → TooltipProvider → SiteHeader / `<main>` / SiteFooter, Toaster 순으로 구성되며 페이지 제목은 `%s | 사이트명` 템플릿으로 조합됩니다.
- `app/(marketing)/`: 홈, about, docs, examples 페이지 (route group이라 URL에 나타나지 않음). `examples/`의 컴포넌트는 해당 페이지 전용 데모입니다.
- `app/loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`: 전역 상태 화면
- `app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx`: SEO (모두 `siteConfig` 사용)

### 별개 프로젝트: `untangle-web/`

Vite 기반 프로토타입으로 이 스타터킷과 무관합니다. `eslint.config.mjs`와 `tsconfig.json`의 `exclude`에서 제외되어 있으므로 루트의 lint/타입 검사 대상이 아니며, 스타터킷 작업 중에는 수정하지 않습니다.

## 컨벤션

- 응답, 코드 주석, 커밋 메시지, 문서는 한국어로 작성하고 변수명·함수명은 영어를 사용합니다.
- 들여쓰기 2칸, Tailwind CSS 유틸리티 사용, `cn()`(`lib/utils.ts`)으로 클래스를 병합합니다.
