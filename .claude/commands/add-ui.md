---
description: shadcn/ui 컴포넌트를 기존 파일을 덮어쓰지 않고 안전하게 추가합니다
argument-hint: <컴포넌트이름...>
allowed-tools: Bash(npx shadcn@latest add:*), Bash(ls:*), Bash(git status:*), Bash(git diff:*), Read
---

shadcn/ui 컴포넌트를 추가합니다. 인자: `$ARGUMENTS`

공백으로 구분된 컴포넌트 이름 목록입니다. 인자가 없으면 사용자에게 물어보세요.

## 순서

1. `ls components/ui`로 이미 있는 컴포넌트를 확인합니다.
2. 요청한 이름 중 `components/ui/<이름>.tsx`가 이미 있는 것은 **추가하지 않고** 건너뛰며 목록으로 보고합니다. 덮어쓰기가 필요하면 사용자 확인 후에만 진행합니다.
3. 남은 컴포넌트만 `npx shadcn@latest add <이름...>`으로 추가합니다.
   - `npx shadcn@latest init`은 `components.json` 설정이 끝났으므로 다시 실행하지 않습니다.
   - 덮어쓰기 확인 프롬프트가 나오면 응답하지 말고 중단한 뒤 상황을 보고합니다.
4. `git status`와 `git diff --stat`로 변경된 파일을 확인합니다. 의도하지 않은 기존 파일 수정이 있으면 알립니다.
5. 새로 생긴 파일을 읽어, 이 프로젝트의 스타일(base-nova, `@base-ui/react` 기반)과 어긋나는 import가 없는지 확인합니다.

## 규칙

- `components/ui/`는 shadcn 생성 파일입니다. 추가 후 임의로 수정하지 않고, 커스터마이징이 필요하면 `components/common/`에서 감싸서 사용하도록 제안합니다.
- 새로 설치된 의존성이 있으면 `package.json` 변경을 함께 보고합니다.

## 마무리

추가된 컴포넌트, 건너뛴 컴포넌트, 변경된 파일을 한국어로 요약합니다.
