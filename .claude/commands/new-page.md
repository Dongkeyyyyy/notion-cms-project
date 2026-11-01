---
description: 마케팅 라우트 그룹에 새 페이지를 만들고 네비게이션 메뉴에 등록합니다
argument-hint: <경로> <페이지 설명>
---

새 페이지를 추가합니다. 인자: `$ARGUMENTS`

첫 번째 토큰은 URL 경로(예: `pricing`), 나머지는 페이지 설명입니다. 경로가 없으면 사용자에게 물어보세요.

## 순서

1. 코드를 쓰기 전에 `node_modules/next/dist/docs/`에서 관련 가이드(페이지, 메타데이터)를 읽습니다. 이 Next.js 버전은 기존 지식과 다릅니다.
2. `app/(marketing)/about/page.tsx`를 읽고 같은 패턴을 따릅니다.
3. `app/(marketing)/<경로>/page.tsx`를 생성합니다.
   - `Metadata`(`title`, `description`)를 export합니다. `title`은 사이트명 템플릿(`%s | 사이트명`)에 조합되므로 사이트명을 포함하지 않습니다.
   - `Section`, `Breadcrumbs`, `PageHeader`(`components/layout`)로 구성합니다.
   - UI는 `components/ui`, 공통 조합은 `components/common`의 기존 컴포넌트를 재사용합니다.
   - 해당 페이지 전용 컴포넌트는 같은 폴더에 둡니다.
4. `config/site.ts`의 `navItems`에 `{ title, href }`를 추가합니다. 메뉴는 이 파일에서만 수정합니다. 메뉴에 노출하지 않는 페이지라면 사용자에게 먼저 확인합니다.
5. `app/sitemap.ts`가 `navItems`를 쓰는지 확인하고, 새 페이지가 자동 반영되는지 보고합니다.

## 규칙

- 컴포넌트 계층은 `ui ← common ← layout ← app` 단방향입니다. 역방향 import는 금지입니다.
- 경로 별칭은 `@/*`, 들여쓰기는 2칸, 클래스 병합은 `cn()`(`lib/utils.ts`)을 사용합니다.
- 코드 주석은 한국어, 변수명·함수명은 영어로 작성합니다.
- 서버 컴포넌트를 기본으로 하고, 상호작용이 필요한 부분만 `"use client"`로 분리합니다.

## 마무리

생성·수정한 파일 목록과 접속 URL을 한국어로 요약합니다. 이어서 `/check`로 검증하도록 안내합니다.
