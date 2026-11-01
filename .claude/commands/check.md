---
description: 린트, 타입 검사, 컴포넌트 계층 위반을 한 번에 검증합니다 (인자에 build를 주면 빌드도 실행)
argument-hint: [build]
allowed-tools: Bash(npm run lint:*), Bash(npx tsc:*), Bash(npm run build:*), Grep, Read
---

커밋 전 통합 검증을 수행합니다. 인자: `$ARGUMENTS`

이 프로젝트에는 테스트 러너가 없으므로 이 검증이 품질 게이트 역할을 합니다. 코드는 수정하지 않고 결과만 보고합니다.

## 순서

1. `npm run lint`를 실행합니다.
2. `npx tsc --noEmit`을 실행합니다.
3. 컴포넌트 계층(`ui ← common ← layout ← app`) 위반을 Grep으로 찾습니다. 아래 import가 발견되면 위반입니다.
   - `components/ui/` 안에서 `@/components/(common|layout)` 또는 `@/app` import
   - `components/common/` 안에서 `@/components/layout` 또는 `@/app` import
   - `components/layout/` 안에서 `@/app` import
4. 인자에 `build`가 포함되어 있으면 `npm run build`도 실행합니다.

`untangle-web/`은 lint·타입 검사 대상이 아니므로 결과에 포함하지 않습니다. 워크트리(`.claude/worktrees/`)도 검사에서 제외해서 해석합니다.

## 보고 형식

한국어로 아래 표와 같이 요약합니다.

| 항목 | 결과 |
| --- | --- |
| lint | 통과 / 실패 (N건) |
| 타입 검사 | 통과 / 실패 (N건) |
| 계층 위반 | 없음 / N건 |
| 빌드 | 통과 / 실패 / 생략 |

실패 항목은 `파일:줄번호`와 원인, 수정 제안을 덧붙입니다. 수정은 사용자가 요청할 때만 진행합니다.
