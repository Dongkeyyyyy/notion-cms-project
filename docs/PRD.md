# PRD: 트레이딩 저널 (Trade Journal)

> Notion을 CMS로 활용한 코인 매매 기록 대시보드

- 문서 버전: 0.1
- 작성일: 2026-11-01
- 상태: 초안 (MVP 구현 전)

---

## 1. 프로젝트 개요

### 1.1 프로젝트명
**트레이딩 저널 (Trade Journal)**

### 1.2 목적
Notion 데이터베이스에 기록한 코인 매매 내역을 웹에서 목록과 통계로 확인한다. 기록은 Notion에서만 하고, 웹은 승률·누적 손익·감정별 성과를 자동으로 집계해 보여준다. 감정이 매매 결과에 미치는 영향을 눈으로 확인해 충동 매매를 줄이는 것이 최종 목표다.

### 1.3 CMS 선택 이유 (Notion)
- Notion API를 활용하여 **비개발자도 콘텐츠(매매 기록)를 직접 입력·수정**할 수 있다.
- 모바일 Notion 앱으로 매매 직후 바로 기록할 수 있다.
- 별도 관리자 페이지나 DB 서버를 만들 필요가 없어 30분 MVP에 적합하다.
- 코드 배포 없이 데이터 변경이 웹에 반영된다 (ISR 60초).

### 1.4 대상 사용자
| 구분 | 설명 |
|---|---|
| 주 사용자 | 코인 단타·스윙 매매를 하며 매매 일지를 쓰는 개인 트레이더 (본인) |
| 사용 시나리오 | 매매 후 Notion에 기록 → 웹 대시보드에서 주간·월간 성과와 감정별 패턴 점검 |

---

## 2. 목표와 비목표

### 목표 (MVP)
- Notion DB의 매매 기록을 읽어 웹에 목록으로 표시한다.
- 총 손익, 승률, 거래 수, 평균 손익을 요약 카드로 보여준다.
- 감정 태그별 거래 수·승률·평균 손익을 표로 보여준다.
- 데이터가 없거나 Notion 연동 오류가 나도 사용자에게 명확한 화면을 보여준다.

### 비목표 (MVP 제외)
- 손익 곡선 등 차트 시각화
- 웹에서 매매 기록 작성·수정 (Notion 쓰기)
- 거래소 API 연동, 실시간 시세 표시
- 다중 사용자 인증, 공개 공유

---

## 3. 주요 기능

### 3.1 매매 기록 목록
- 날짜 내림차순으로 매매 기록을 표시한다.
- 각 항목: 제목, 날짜, 코인, 포지션(롱/숏), 진입가, 청산가, 손익, 감정 배지, 매매 근거.
- 손익은 이익(초록)·손실(빨강)으로 색상을 구분한다.

### 3.2 요약 통계 카드
| 지표 | 계산식 |
|---|---|
| 총 손익 | 모든 거래의 손익 합계 |
| 승률 | 손익 > 0 인 거래 수 / 전체 거래 수 |
| 거래 수 | 전체 기록 개수 |
| 평균 손익 | 총 손익 / 거래 수 |

### 3.3 감정별 성과 통계
- 감정(침착, FOMO, 공포, 복수 등)별로 거래 수, 승률, 평균 손익을 집계한다.
- 어떤 감정 상태에서 손실이 큰지 한눈에 비교할 수 있다.

### 3.4 상태 화면
- 로딩: 스켈레톤 UI
- 빈 상태: 기록이 없을 때 안내 문구 (`EmptyState`)
- 오류: Notion 토큰·DB ID 누락 또는 API 실패 시 안내 (`ErrorState`)

---

## 4. 기술 스택

| 구분 | 기술 | 버전 | 비고 |
|---|---|---|---|
| 프레임워크 | Next.js (App Router) | 16.3.3 | 서버 컴포넌트로 Notion 호출 |
| UI 라이브러리 | React | 19.2.8 | |
| 언어 | TypeScript | 5.x | strict, 경로 별칭 `@/*` |
| CMS | Notion API | - | 서버에서만 호출 |
| Notion SDK | `@notionhq/client` | 최신 (신규 설치) | DB 쿼리 |
| 스타일 | Tailwind CSS | 4.x | `@tailwindcss/postcss` |
| UI 컴포넌트 | shadcn/ui (base-nova) | shadcn 4.19 | `@base-ui/react` 기반 |
| 아이콘 | Lucide React | 1.x | |
| 클래스 유틸 | clsx, tailwind-merge, `cn()` | - | `lib/utils.ts` |
| 애니메이션 | tw-animate-css | 1.4 | |
| 다크모드 | next-themes | 0.4 | 헤더 `ThemeToggle` |
| 토스트 | sonner | 2.x | |
| 폼(향후) | react-hook-form + zod | 7.x / 4.x | 웹 입력 기능 확장 시 |
| 린트 | ESLint | 9 | `eslint-config-next` 16.3.3 |
| 검증 | Playwright MCP | - | 브라우저 확인 (`.mcp.json`) |

> 참고: 이 프로젝트의 Next.js는 16 버전으로 기존 지식과 다른 API가 있다. 코드 작성 전 `node_modules/next/dist/docs/`의 가이드를 확인한다 (현재 해당 경로가 없으면 기존 코드 패턴 기준으로 확인).

### 4.1 아키텍처
```
Notion DB
   │  (@notionhq/client, 서버 전용 토큰)
   ▼
lib/notion.ts          → getTrades(): Trade[]
   │
   ▼
lib/trade-stats.ts     → 요약/감정별 통계 계산 (순수 함수)
   │
   ▼
app/(marketing)/journal/page.tsx  (서버 컴포넌트, revalidate = 60)
   │
   ▼
components/ui, common, layout  (카드·배지·빈/오류 상태)
```

### 4.2 컴포넌트 계층 규칙
`components/ui` ← `components/common` ← `components/layout` ← `app` 방향의 단방향 import만 허용한다.

### 4.3 렌더링·캐시 전략
- 페이지는 서버 컴포넌트에서 Notion을 호출하고, `export const revalidate = 60`으로 ISR 캐시한다.
- Notion 토큰은 클라이언트 번들에 포함되지 않는다.

### 4.4 환경변수
| 이름 | 설명 |
|---|---|
| `NOTION_TOKEN` | Notion Integration 시크릿 |
| `NOTION_DATABASE_ID` | 매매 기록 DB ID |

`.env.local`에 저장하며 저장소에 커밋하지 않는다.

---

## 5. Notion 데이터베이스 구조

| 필드 | 타입 | 설명 |
|---|---|---|
| 제목 (Name) | title | 매매 이름 (예: "BTC 롱") |
| 날짜 (Date) | date | 매매 일자 |
| 코인 (Coin) | select | BTC, ETH, SOL 등 |
| 포지션 (Side) | select | 롱 / 숏 |
| 진입가 (Entry) | number | 진입 가격 |
| 청산가 (Exit) | number | 청산 가격 |
| 손익 (PnL) | number | 손익 금액(USDT) 또는 % — 한 가지로 통일 |
| 감정 (Emotion) | select | 침착, FOMO, 공포, 복수 등 |
| 매매 근거 (Reason) | rich_text | 진입 이유와 복기 메모 |

### 5.1 타입 정의 (예시)
```ts
export type Trade = {
  id: string
  title: string
  date: string | null
  coin: string | null
  side: "롱" | "숏" | null
  entry: number | null
  exit: number | null
  pnl: number
  emotion: string | null
  reason: string
}
```

### 5.2 Notion 설정 절차
1. Notion Integration 생성 후 시크릿 발급
2. 매매 DB 생성 후 위 필드 추가
3. DB 우측 상단 `연결`에서 Integration 추가
4. DB URL에서 ID 복사

---

## 6. 화면 구성

| 화면 | 경로 | 설명 |
|---|---|---|
| 저널 대시보드 | `/journal` | 요약 카드 4개, 감정별 통계 표, 매매 기록 목록 |
| 빈 상태 | `/journal` | 기록 없음 안내 |
| 오류 상태 | `/journal` | 환경변수 누락 또는 API 실패 안내 |
| 로딩 | `/journal` | 스켈레톤 |

### 6.1 `/journal` 레이아웃
```
[PageHeader: 트레이딩 저널]
[ 총 손익 ][ 승률 ][ 거래 수 ][ 평균 손익 ]   ← Card 4개
[ 감정별 성과 표 ]
[ 매매 기록 목록 ]
```
- 모바일: 카드 2열 → 1열, 목록은 세로 스택
- 다크모드 지원

### 6.2 네비게이션
`config/site.ts`의 `navItems`에 `{ title: "저널", href: "/journal" }`를 추가한다. 사이트 이름·메뉴는 이 파일에서만 수정한다.

---

## 7. MVP 범위

### 포함
- Notion DB 읽기 전용 조회
- 요약 통계 4종, 감정별 통계
- 목록, 빈 상태, 오류 상태, 로딩
- 네비게이션 메뉴 등록
- 라이트/다크 모드, 반응형

### 제외
- 차트, 웹 입력(쓰기), 시세 연동, 인증

---

## 8. 구현 단계 (목표 30분)

| 단계 | 작업 | 예상 시간 |
|---|---|---|
| 1 | `@notionhq/client` 설치, `.env.local` 설정, Notion DB·Integration 준비 | 5분 |
| 2 | `lib/notion.ts`: `getTrades()` 구현 및 `Trade` 매핑 | 7분 |
| 3 | `lib/trade-stats.ts`: 요약·감정별 통계 순수 함수 | 5분 |
| 4 | `app/(marketing)/journal/page.tsx`: 카드, 표, 목록, 상태 화면 | 10분 |
| 5 | `config/site.ts` 메뉴 등록 및 검증 | 3분 |

### 8.1 생성·수정 파일
| 파일 | 구분 |
|---|---|
| `lib/notion.ts` | 신규 |
| `lib/trade-stats.ts` | 신규 |
| `app/(marketing)/journal/page.tsx` | 신규 |
| `app/(marketing)/journal/loading.tsx` | 신규 (선택) |
| `config/site.ts` | 수정 |
| `.env.local` | 신규 (커밋 제외) |

### 8.2 재사용할 기존 코드
- `components/layout/` 의 `Container`, `Section`, `PageHeader`
- `components/common/` 의 `EmptyState`, `ErrorState`
- `components/ui/` 의 `Card`, `Badge`, `Skeleton`
- `lib/utils.ts` 의 `cn()`

---

## 9. 비기능 요구사항

- **보안**: Notion 토큰은 서버에서만 사용하고 `NEXT_PUBLIC_` 접두사를 쓰지 않는다.
- **성능**: ISR 60초 캐시로 Notion API 호출을 최소화한다. Notion DB가 100건을 넘으면 페이지네이션(`start_cursor`)을 처리한다.
- **접근성**: 손익은 색상 외에 부호(+/-)로도 구분한다.
- **유지보수**: 통계 로직은 순수 함수로 분리해 화면과 독립적으로 검증 가능하게 한다.

---

## 10. 성공 지표

- Notion에 기록한 건수와 웹 목록 건수가 일치한다.
- 웹의 총 손익·승률이 수기 계산 값과 일치한다.
- 환경변수 누락·빈 DB에서 앱이 크래시하지 않고 안내 화면이 표시된다.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`가 모두 통과한다.

---

## 11. 검증 방법

1. `npx tsc --noEmit`, `npm run lint` (또는 `/check`)
2. Notion에 샘플 매매 5~10건 입력 후 `npm run dev` → `/journal`에서 값 대조
3. 환경변수 제거·빈 DB 상태에서 오류·빈 상태 화면 확인
4. Playwright MCP로 라이트/다크, 모바일 폭 스크린샷 확인

---

## 12. 리스크와 대응

| 리스크 | 대응 |
|---|---|
| Notion API 호출 제한(평균 초당 3회) | ISR 캐시, 페이지 단위 1회 호출 |
| 손익 단위 혼용(USDT vs %) | DB 필드 설명에 단위를 명시하고 한 가지로 통일 |
| 필드명 변경 시 매핑 실패 | `lib/notion.ts`에서 필드명을 상수로 한 곳에 관리 |
| Next.js 16 API 차이 | 구현 전 공식 문서 확인, 기존 코드 패턴 따르기 |

---

## 13. 향후 확장

1. 누적 손익 곡선·월별 손익 차트
2. 웹에서 매매 기록 작성 (react-hook-form + zod → Notion 쓰기)
3. 코인 시세(CoinGecko) 연동, 워치리스트
4. 매매 전 원칙 체크리스트
5. 기간·코인·감정 필터
