# Development Guidelines

> **AI Agent 전용 문서.** 이 저장소(`notion-cms-project`)에서 작업할 때만 적용되는 규칙을 정의한다.
> 일반 개발 지식은 적지 않는다. 이 문서와 `CLAUDE.md`가 충돌하면 `CLAUDE.md`를 따르고 이 문서를 수정한다.

## 1. 프로젝트 개요

- 목적: Notion DB(코인 매매 기록)를 읽어 `/journal`에 목록·요약 통계·감정별 통계로 보여주는 **트레이딩 저널**. 읽기 전용 MVP.
- 스택: Next.js 16.3.3(App Router) / React 19.2.8 / TypeScript strict / Tailwind CSS 4 / shadcn/ui(base-nova, `@base-ui/react` 기반).
- 현재 상태: 스타터킷 위에 구현 **전**. `lib/notion.ts`, `lib/trade-stats.ts`, `app/(marketing)/journal/`은 아직 없다. `@notionhq/client`는 미설치다. `node_modules`도 없을 수 있다.
- 구현 전 반드시 `docs/PRD.md`, `docs/ROADMAP.md`를 읽는다.

### 1.1 문서별 책임 (충돌 시 우선순위)

| 판단 대상 | 따를 문서 |
| --- | --- |
| 기능 요구사항, Notion 필드, 타입, 통계 계산식 | `docs/PRD.md` |
| 작업 순서, 단계별 완료 기준 | `docs/ROADMAP.md` |
| 코드 작성·계층·명령어 규칙 | `CLAUDE.md`, `AGENTS.md`, 이 문서 |
| Next.js 16 API 사용법 | `node_modules/next/dist/docs/` (기존 지식보다 우선) |

## 2. 프로젝트 아키텍처

### 2.1 디렉터리와 수정 규칙

| 경로 | 역할 | 규칙 |
| --- | --- | --- |
| `app/layout.tsx` | 루트 레이아웃 (ThemeProvider → TooltipProvider → SiteHeader / `<main>` / SiteFooter, Toaster) | 메타데이터는 `siteConfig`에서만 가져온다 |
| `app/(marketing)/` | 홈·about·docs·examples와 앞으로의 `journal` (route group, URL에 나타나지 않음) | 새 페이지는 반드시 이 안에 만든다 |
| `app/(marketing)/examples/` | 컴포넌트 데모 전용 | journal 코드를 넣지 않는다 |
| `app/loading.tsx` `error.tsx` `global-error.tsx` `not-found.tsx` | 전역 상태 화면 | 기존 패턴 유지 |
| `app/sitemap.ts` `robots.ts` `opengraph-image.tsx` | SEO | `siteConfig`·`navItems`만 사용, 값 하드코딩 금지 |
| `components/ui/` | shadcn 생성 파일 | `/add-ui`로만 추가, 직접 수정 금지 |
| `components/common/` | **앱과 무관한** 조합 (EmptyState, ErrorState, FormField, CodeBlock) | 트레이딩 도메인 지식 포함 금지 |
| `components/layout/` | 헤더·푸터·MobileNav·Container·Section·PageHeader·Breadcrumbs·ThemeToggle | `app/` import 금지 |
| `components/providers/` | ThemeProvider | 신규 Provider만 추가 |
| `config/site.ts` | `siteConfig`, `navItems` 단일 출처 | 사이트 이름·설명·url·메뉴는 여기서만 수정 |
| `lib/` | 현재 `utils.ts`(`cn`)만 존재 | 서버 로직·순수 함수 위치 |
| `docs/` | PRD, ROADMAP | 단계 완료 시 갱신 (7장 참조) |
| `.claude/commands/` | `/check` `/add-ui` `/new-page` `/new-form` | 해당 작업은 이 명령을 우선 사용 |
| `shrimp_data/` | shrimp-task-manager 작업 데이터 (`.mcp.json`의 `DATA_DIR`) | 직접 편집 금지, 커밋 여부는 사용자에게 확인 |

### 2.2 컴포넌트 계층 (단방향 import)

`components/ui` ← `components/common` ← `components/layout` ← `app`

- 위 계층은 아래 계층만 import한다.
- **금지**: `ui` → `common|layout|app`, `common` → `layout|app`, `layout` → `app` import.
- `/check`가 위 위반을 grep으로 검사한다. 작업 후 반드시 통과시킨다.

### 2.3 신규 파일 배치 표

| 만들 대상 | 위치 |
| --- | --- |
| Notion 조회, `Trade` 타입, 필드명 상수 | `lib/notion.ts` (`Trade`는 여기서 export) |
| 요약·감정별 통계 (순수 함수) | `lib/trade-stats.ts` |
| 손익·퍼센트·날짜 포맷터 (순수 함수, React 금지) | `lib/format.ts` |
| 저널 페이지, 로딩 | `app/(marketing)/journal/page.tsx`, `loading.tsx` |
| 트레이딩 전용 컴포넌트 (`PnlText`, 요약 카드, 감정별 표, 매매 목록, 감정 배지) | `app/(marketing)/journal/` 안 (기존 `examples/` 패턴과 동일하게 폴더 직속, `_components` 폴더는 만들지 않는다) |
| 도메인을 모르는 재사용 조합 | `components/common/` |
| 새 shadcn 컴포넌트 | `/add-ui <이름>` |
| 폼 | `/new-form` |

## 3. 코드 표준

### 3.1 언어·네이밍

- 코드 주석, 커밋 메시지, 문서, 사용자 대화: **한국어**. 변수명·함수명·타입명·파일명: **영어**.
- 파일명은 kebab-case (`empty-state.tsx`, `trade-stats.ts`). 컴포넌트는 PascalCase named export, 페이지는 `export default function`.
- 컴포넌트 선언 위에 한 줄 한국어 주석으로 용도를 적고, Props는 `type XxxProps = { ... }`로 선언한다.

### 3.2 포맷

- 들여쓰기 2칸, 큰따옴표, 경로 별칭 `@/*` (`../` 상대 경로로 상위 폴더 import 금지. 같은 폴더는 `./` 허용).
- **세미콜론은 디렉터리별로 다르다. 수정하는 파일 또는 인접 파일의 스타일을 따른다.**

| 위치 | 세미콜론 |
| --- | --- |
| `app/` 의 `layout` `page` `error` `loading` `sitemap` `robots` 등 | 사용 |
| `components/`, `lib/`, `config/`, `app/(marketing)/examples/example-block.tsx` | 사용 안 함 |

- 클래스 병합은 `cn()`만 사용한다.
- 이미 쓰는 import 순서: 외부 패키지 → 빈 줄 → `@/` 내부 모듈. 타입은 `import type`.

```tsx
// 하지 말 것
import cn from "cn"                      // package.json에 npm 'cn'이 있어도 사용 금지
import { cn } from "@/lib/utils"         // 이것만 허용
```

### 3.3 서버/클라이언트

- 서버 컴포넌트가 기본이다. 상태·이벤트·브라우저 API가 필요한 가장 작은 단위에만 `"use client"`를 선언한다.
- **서버 컴포넌트에서 클라이언트 컴포넌트로 함수 prop을 넘기지 않는다.** `ErrorState`의 `onRetry`는 `error.tsx` 같은 클라이언트 컴포넌트에서만 넘긴다.
- `lib/notion.ts`를 `"use client"` 파일에서 import하지 않는다 (`import type { Trade }`만 예외).

## 4. 기능 구현 표준

### 4.1 Notion 연동 (`lib/notion.ts`)

- 노출 API: `getTrades(): Promise<Trade[]>`. `Trade` 타입은 PRD 5.1을 그대로 따른다.
- Notion 속성명은 **상수 객체 하나**(예: `NOTION_FIELDS`)로만 관리한다. 실제 DB 속성명을 확인할 수 없으면 PRD 5장 표의 한국어 이름을 기본값으로 쓰고 사용자에게 확인을 요청한다.
- 환경변수 `NOTION_TOKEN`, `NOTION_DATABASE_ID`는 **`getTrades()` 함수 안에서** 읽고, 누락 시 명확한 `Error`를 던진다. 모듈 최상단에서 읽거나 던지지 않는다 (`next build`가 깨진다).
- 100건 초과 대비로 `start_cursor`/`has_more` 페이지네이션을 구현한다.
- 정렬: 날짜 내림차순, 날짜 `null`은 맨 뒤.
- 매핑 규칙: 포지션 값이 `롱`/`숏`이 아니면 `null`, `pnl` 미입력은 `0`(PRD 5.1 타입이 `number`), `currency` 미입력은 `"원"`, 기타 미입력 select는 `null`, `reason`은 빈 문자열.
- 목록 조회는 **속성만** 읽는다. 페이지 본문(블록)은 목록에서 읽지 않는다(건수만큼 API 호출이 늘어난다). 본문은 4-6 상세 페이지에서 한 건씩 읽는다.
- `@notionhq/client` 설치 후 **쿼리 메서드 이름을 추측하지 않는다.** `node_modules/@notionhq/client`의 타입을 읽어 확정한다 (최신 버전은 database 쿼리 대신 data source 기반 API일 수 있고, 이 경우 ID 의미도 확인해야 한다).
- 한 번의 페이지 렌더에서 `getTrades()`는 **1회만** 호출한다. `page.tsx`에서 한 번 호출해 결과 배열을 props로 내려보낸다.

### 4.2 통계 (`lib/trade-stats.ts`)

- 순수 함수만 둔다. Notion SDK·React·`process.env`를 import하지 않는다 (`import type { Trade }` 제외).
- `calcSummary(trades)`: 총 손익, 승률(`pnl > 0` 건수 / 전체), 거래 수, 평균 손익. **거래 0건이면 0 나누기 없이 0을 반환**한다.
- `calcEmotionStats(trades)`: 감정별 거래 수·승률·평균 손익. 감정 `null`은 **"미분류"**로 묶는다.
- 화면 컴포넌트 안에서 합계·승률을 직접 계산하지 않는다. 항상 이 파일 함수를 호출한다.

### 4.3 표시 규칙

- 손익은 **색 + 부호(`+`/`-`) 모두** 표시한다 (접근성). 양수 `+1,200`, 음수 `-350`, 0은 부호 없이 `0`.
- 색상 클래스는 `PnlText` 컴포넌트 **한 곳에만** 정의한다. 이익은 초록(예: `text-emerald-600 dark:text-emerald-400`), 손실은 `text-destructive`, 0은 `text-muted-foreground`. 페이지·카드·표에서 색상 클래스를 직접 쓰지 않고 `PnlText`를 쓴다.
- `globals.css`에는 초록 토큰이 없다. 토큰 추가는 사용자 확인 후에만 한다.
- **손익 단위는 원화로 확정됐다.** 포맷터는 `₩` 같은 접미사·기호 없이 정수에 천 단위 쉼표와 부호만 출력한다(`+1,200`, `-35,000`). `통화`가 `달러`인 기록은 4-7 전까지 합산·표시 대상이 아니다.
- 통화가 다른 기록은 **절대 합산하지 않는다.** 통화별 집계는 4-7에서 구현한다.
- 감정 표시는 `Badge`(`variant="secondary"` 또는 `outline`)를 사용한다. `Badge`에는 success 변형이 없다.

### 4.4 `/journal` 페이지

- 파일: `app/(marketing)/journal/page.tsx`. 서버 컴포넌트, PRD 4.3대로 60초 ISR을 적용한다. **`export const revalidate = 60`이 이 Next.js 버전에서 유효한지 `node_modules/next/dist/docs/`로 먼저 확인**하고, 다르면 문서가 안내하는 방식으로 구현한 뒤 PRD 4.3·ROADMAP 문구를 함께 고친다.
- `metadata.title`은 `"트레이딩 저널"`처럼 **사이트명을 빼고** 작성한다 (`%s | 사이트명` 템플릿이 붙인다).
- 레이아웃은 `about/page.tsx` 패턴을 따른다: `<Section className="space-y-8">` → `Breadcrumbs` → `PageHeader` → 본문.
- 순서: 요약 카드 4개 → 감정별 성과 표 → 매매 기록 목록. 카드 그리드 기본값은 `grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. 다크모드와 모바일 폭을 항상 고려한다.
- 사용 컴포넌트: `Card` `Badge` `Skeleton`(이미 있음), `Table`(**`components/ui/table.tsx`가 없다 → `/add-ui table`로 추가**).
- 링크 버튼은 `render` + `nativeButton={false}`를 쓴다 (5장 참조).

### 4.5 상태 화면

| 상태 | 구현 |
| --- | --- |
| 로딩 | `app/(marketing)/journal/loading.tsx`, `Skeleton`으로 카드 4개·표·목록 모양을 흉내낸다 |
| 빈 상태 | `getTrades()`가 빈 배열이면 `EmptyState`. 통계 카드는 숨기거나 0으로 표시하되 크래시 금지 |
| 오류 | `page.tsx`에서 `getTrades()`를 `try/catch`로 감싸 `ErrorState`를 렌더. **`onRetry` 전달 금지**, 문구는 고정 한국어 문자열 |

- 환경변수 누락과 API 실패는 서로 다른 안내 문구로 구분한다.
- 원본 에러 객체·메시지를 화면에 출력하지 않는다. 서버 로그(`console.error`)에도 토큰·DB ID **값**을 남기지 않는다.

### 4.6 환경변수·보안

- 토큰은 `.env.local`에만 두고 **`NEXT_PUBLIC_` 접두사를 쓰지 않는다.** `.env*`는 `.gitignore` 대상이며 커밋하지 않는다.
- `.env.local` 내용을 출력·요약·로그로 노출하지 않는다.
- Notion 쓰기, 인증, 차트, 시세 연동은 MVP **비목표**다 (4단계 진입 전 구현 금지).

## 5. 프레임워크·라이브러리 사용 표준

| 대상 | 해야 할 것 | 하지 말 것 |
| --- | --- | --- |
| shadcn/ui | `npx shadcn@latest add <name>` (`/add-ui` 경유). 커스터마이징은 `components/common/`에서 래핑 | `npx shadcn@latest init` 재실행, 기존 `components/ui` 파일 덮어쓰기·임의 수정 |
| 링크 버튼 | `<Button nativeButton={false} render={<Link href="/x" />}>` | `asChild` |
| Trigger류 (`SheetTrigger`, `DropdownMenuTrigger`, `BreadcrumbLink`) | `render={<... />}` prop | `asChild` |
| `error.tsx` / `global-error.tsx` | props `{ error, retry }` | `reset` |
| 레이아웃 props | 전역 헬퍼 `LayoutProps<"/">` | 직접 `children` 타입 선언 |
| 폼 | `/new-form` 패턴: zod 스키마(한국어 메시지) + `useForm` + `zodResolver` + `defaultValues` + `FormField` + sonner `toast` + `isSubmitting` 시 버튼 비활성화 | `FormField` 없이 라벨 직접 작성 |
| 다크모드 | `next-themes` + `ThemeToggle`, 색은 `bg-background` `text-muted-foreground` 같은 토큰 클래스 | 라이트 전용 하드코딩 색상 (`PnlText` 제외) |
| 토스트 | `sonner`의 `toast` | 다른 토스트 라이브러리 |
| 아이콘 | `lucide-react` | 다른 아이콘 패키지 |
| 클래스 병합 | `@/lib/utils`의 `cn` | npm `cn` 패키지 import |
| 의존성 | PRD·ROADMAP에 명시된 것만 설치 (예: 1단계 `@notionhq/client`) | 명시되지 않은 패키지·테스트 러너 임의 추가 (사용자 확인 필요) |
| 버전 | `next` `react` `react-dom` `eslint-config-next`는 현재 고정 버전 유지 | 임의 업그레이드 |

## 6. 워크플로 표준

### 6.1 데이터 흐름

```
Notion DB → lib/notion.ts getTrades() → (page.tsx에서 1회 호출)
          → lib/trade-stats.ts calcSummary / calcEmotionStats
          → lib/format.ts 포맷터 → journal 전용 컴포넌트 → ui/common/layout 컴포넌트
```

### 6.2 단계 진행 (`docs/ROADMAP.md`)

1. 1 초기 설정 → 2 공통 모듈 → 3 핵심 기능(MVP) → 4 추가 기능 → 5 최적화·배포. **순서대로 진행한다.**
2. 단계 시작 전, 이전 단계의 "완료 기준"이 충족됐는지 확인한다. 미충족이면 사용자에게 보고하고 확인받는다.
3. 4단계는 4-1 필터 → 4-2 차트 → 4-3 쓰기 → 4-4 체크리스트 → 4-5 시세 → 4-6 상세 페이지 → 4-7 달러 집계 순서다. 건너뛰지 않는다. 읽기 전용인 4-6, 4-7은 사용자가 요청할 때만 4-3 앞으로 당길 수 있다.
4. 5단계 전에는 데모 페이지(about·docs·examples)와 해당 메뉴를 삭제하지 않는다.

### 6.3 작업 시작 전 점검

- `node_modules`가 없으면 `npm install`을 먼저 실행한다 (lint·tsc·Next.js docs 확인에 필요).
- 코드를 쓰기 전 `node_modules/next/dist/docs/`에서 관련 가이드를 읽는다. 경로가 없으면 기존 코드 패턴을 기준으로 삼는다.
- `LayoutProps`/`PageProps` 전역 타입을 `tsc`가 찾지 못하면 `npm run dev` 또는 `npm run build`로 타입을 생성한 뒤 다시 실행한다 (`.next/types` 의존).

### 6.4 검증

| 변경 종류 | 실행 |
| --- | --- |
| 모든 코드 변경 | `/check` (lint + `npx tsc --noEmit` + 계층 위반) |
| 라우트·빌드 영향, 단계 완료 | `/check build` |
| UI 변경 | Playwright MCP로 라이트/다크, 모바일 폭 스크린샷 |
| 통계 함수 | 빈 배열·전부 손실·전부 이익 케이스를 수기 계산과 대조 |

- 테스트 러너가 없다. 임시 `console.log`·검증 스크립트는 확인 후 **반드시 제거**한다.
- Notion 토큰이 없어 실제 호출을 검증할 수 없으면 해당 항목을 "미검증"으로 보고한다. 가짜 데이터를 코드에 심어 통과된 것처럼 만들지 않는다.
- 개발 서버 포트가 3000이 아닐 수 있다. 터미널에 표시된 `Local` 주소를 사용한다.

### 6.5 커밋

- 커밋 메시지는 한국어로 작성한다.
- 단계가 끝나면 커밋하는 것이 ROADMAP 규칙이지만, **실제 커밋·푸시는 사용자가 요청할 때만** 실행한다. 요청이 없으면 한국어 커밋 메시지를 제안하는 데서 멈춘다.

## 7. 핵심 파일 상호작용 (동시 수정 필수)

| 변경 | 함께 수정할 파일 |
| --- | --- |
| 메뉴 추가·삭제·이름 변경 | `config/site.ts`의 `navItems`**만** 수정. 헤더·MobileNav·푸터·`sitemap.ts`는 자동 반영되므로 건드리지 않는다 |
| 새 페이지 추가 | `app/(marketing)/<경로>/page.tsx` + `config/site.ts` `navItems` (+ 필요 시 `loading.tsx`). `/new-page` 사용 |
| `journal` 메뉴 등록 | `config/site.ts`에 `{ title: "저널", href: "/journal" }` 추가 |
| `siteConfig.name`을 한글로 변경 | `app/opengraph-image.tsx` (한글 글꼴 미포함 → 글꼴 설정 필요) |
| `siteConfig.url` 변경 | 코드 수정 없음 (sitemap·robots·메타데이터 자동 반영). 배포 전 교체 대상 |
| Notion 필드 추가·이름 변경 | `lib/notion.ts` 필드 상수 + `Trade` 타입 + `docs/PRD.md` 5장 표·5.1 타입 + 영향받는 `lib/trade-stats.ts`·화면 |
| 통계 계산식 변경 | `lib/trade-stats.ts` + `docs/PRD.md` 3.2·3.3 |
| 환경변수 추가·이름 변경 | `lib/notion.ts` + `docs/PRD.md` 4.4 + `README.md` 안내 + 오류 안내 문구 |
| 디렉터리·파일 신규 추가 (`lib/*`, `journal/`) | `README.md` "폴더 구조" + `app/(marketing)/docs/page.tsx`의 "폴더 구조" CodeBlock + `CLAUDE.md` 아키텍처 |
| 단계·기능 완료 | `docs/ROADMAP.md` 체크박스, `docs/PRD.md` 상태, `README.md` "현재 상태", `CLAUDE.md` "현재 상태" (예: "`lib/notion.ts`는 아직 없다", "`@notionhq/client` 미설치" 문구를 사실에 맞게 수정) |
| `revalidate` 방식 변경 | `app/(marketing)/journal/page.tsx` + `docs/PRD.md` 4.3 + `docs/ROADMAP.md` 3단계 문구 |
| 홈·소개 페이지의 `features`/`stack` 배열 수정 | 해당 파일의 배열만 수정 (JSX 복제 금지) |
| `docs/page.tsx` 섹션 추가 | `toc` 배열의 `id`와 `DocSection id`를 일치시킨다 |

## 8. AI 의사결정 기준

### 8.1 결정 트리

1. **새 UI가 필요한가?**
   `components/ui`에 있다 → 재사용. 없다 → `/add-ui`로 추가(덮어쓰기 금지). 변형이 필요하다 → `components/common/`에서 감싼다.
2. **새 컴포넌트를 어디에 두나?**
   트레이딩 지식(Trade·손익·감정)을 안다 → `app/(marketing)/journal/`. 앱과 무관하다 → `components/common/`. 전역 골격이다 → `components/layout/`.
3. **계산·변환 로직인가?**
   통계 → `lib/trade-stats.ts`. 표시 포맷 → `lib/format.ts`. Notion 매핑 → `lib/notion.ts`. 컴포넌트 안에 직접 쓰지 않는다.
4. **`"use client"`가 필요한가?**
   상태·이벤트 핸들러·브라우저 API를 쓴다 → 필요(가장 작은 컴포넌트만). 아니면 서버 컴포넌트로 둔다.
5. **Next.js API가 확실하지 않은가?**
   추측하지 말고 `node_modules/next/dist/docs/`를 읽는다. 없으면 기존 코드 패턴을 따른다.
6. **PRD·ROADMAP에 없는 요청인가?**
   비목표·4단계 기능이면 현재 단계 완료 기준을 먼저 확인하고 사용자에게 알린다.
7. **요구사항이 모호한데 사용자 확인 없이 결정 가능한가?**
   결정 가능하면 가장 작은 변경으로 진행하고 가정한 내용을 최종 보고에 명시한다.

### 8.2 사용자 확인이 필요한 항목 (임의 결정 금지)

- 환율 환산 도입 여부 (4-7)
- 실제 Notion 속성명이 PRD 5장과 다른 경우
- PRD·ROADMAP에 없는 의존성 추가, 테스트 러너 도입
- `components/ui` 기존 파일 덮어쓰기, `globals.css` 테마 토큰 추가
- `shrimp_data/` 커밋 여부, `.gitignore` 수정
- 데모 페이지(about·docs·examples)와 메뉴 삭제 (5단계 정리 시)
- 커밋·푸시 실행

### 8.3 문서와 현실이 다를 때

- PRD 예시 코드(`databases.query`, `revalidate` 등)가 설치된 버전과 맞지 않으면 설치된 버전의 타입·공식 docs를 따르고, 달라진 점을 PRD에 반영한다.
- `CLAUDE.md`의 "현재 상태" 문구가 실제 파일 존재 여부와 다르면 작업 끝에 사실에 맞게 고친다.

## 9. 금지 사항

- `components/ui` ← `common` ← `layout` ← `app` 계층을 역방향으로 import한다.
- 사이트 이름·메뉴·url을 `config/site.ts` 밖에 하드코딩한다.
- `NEXT_PUBLIC_` 접두사로 Notion 토큰을 노출하거나 `.env*`를 커밋한다.
- 서버 컴포넌트에서 `ErrorState`에 `onRetry` 같은 함수 prop을 넘긴다.
- `asChild`를 사용하거나 `error.tsx`에서 `reset`을 사용한다.
- npm `cn` 패키지를 import한다 (`@/lib/utils`의 `cn`만 사용).
- 손익을 색으로만 구분하고 부호를 생략한다.
- 통계 로직을 컴포넌트 안에 중복 구현하거나, 한 렌더에서 `getTrades()`를 여러 번 호출한다.
- 모듈 최상단에서 환경변수를 읽거나 던진다.
- 검증하지 못한 항목을 검증된 것처럼 보고한다. 임시 디버그 코드를 남긴다.

```tsx
// 허용
<Button nativeButton={false} render={<Link href="/journal" />}>저널 보기</Button>
const trades = await getTrades()            // page.tsx에서 1회
const summary = calcSummary(trades)         // 계산은 lib에서

// 금지
<Button asChild><Link href="/journal">저널 보기</Link></Button>
const token = process.env.NOTION_TOKEN      // lib/notion.ts 모듈 최상단
<ErrorState onRetry={() => {}} />           // 서버 컴포넌트 안에서
<span className="text-green-500">{pnl}</span>   // PnlText 밖에서 색상 직접 지정
```
