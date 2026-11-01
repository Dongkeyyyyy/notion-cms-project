---
description: zod + react-hook-form 기반 폼 컴포넌트를 FormField와 sonner 토스트로 생성합니다
argument-hint: <폼이름> <필드 설명>
---

새 폼 컴포넌트를 만듭니다. 인자: `$ARGUMENTS`

첫 번째 토큰은 폼 이름(예: `contact`), 나머지는 필드 설명입니다. 필드 정보가 부족하면 사용자에게 물어보세요.

## 순서

1. `app/(marketing)/examples/form-example.tsx`와 `components/common/form-field.tsx`를 읽고 기존 패턴과 일치시킵니다.
2. 사용할 입력 요소가 `components/ui/`에 있는지 확인합니다(input, select, checkbox, switch, textarea 등). 없으면 `/add-ui`를 안내하고 임의로 만들지 않습니다.
3. 폼 컴포넌트 파일을 생성합니다. 위치는 사용자가 지정하지 않았다면 해당 페이지 폴더, 여러 곳에서 재사용한다면 `components/common/`입니다.

## 구성 규칙

- 파일 최상단에 `"use client"`를 선언합니다.
- zod 스키마를 정의하고 `z.infer`로 타입을 만듭니다. 에러 메시지는 한국어로 작성합니다.
- `useForm`에 `zodResolver`를 연결하고 `defaultValues`를 반드시 지정합니다.
- 각 필드는 `FormField`(`label`, `htmlFor`, `error`, `description`)로 감싸고, `error`에는 `errors.<필드>?.message`를 전달합니다.
- 제출 성공·실패는 sonner `toast`로 알립니다. 서버 연동이 없으면 TODO 주석으로 표시합니다.
- 제출 중에는 버튼을 비활성화합니다(`formState.isSubmitting`).

## 규칙

- 컴포넌트 계층 `ui ← common ← layout ← app` 단방향을 지킵니다.
- 들여쓰기 2칸, Tailwind 유틸리티와 `cn()` 사용, 경로 별칭 `@/*`.
- 코드 주석은 한국어, 변수명·함수명은 영어로 작성합니다.

## 마무리

만든 파일과 스키마 필드 요약을 한국어로 보고하고, `/check`로 검증하도록 안내합니다.
