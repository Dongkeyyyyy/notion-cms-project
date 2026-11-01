# Untangle 웹 프로토타입

iPhone 앱 "Untangle"의 UX를 검증하기 위한 웹 프로토타입 스타터 킷입니다.
(출시용이 아니며, 서버·로그인 없이 브라우저 localStorage에 저장합니다.)

## 기술 스택
- React 19 + Vite + TypeScript + Tailwind CSS v4
- PWA (`vite-plugin-pwa`) — iPhone 홈 화면에 추가 가능

## 실행
```bash
npm install
npm run dev      # 개발 서버 (같은 Wi-Fi의 iPhone에서도 접속 가능)
npm run build    # 타입 검사 + 빌드
npm run preview  # 빌드 결과 확인
```

## 구조
- `src/types.ts` — 데이터 모델 (Item, Status, Effort, When)
- `src/storage.ts` — localStorage 저장, JSON 내보내기/가져오기
- `src/useItems.ts` — 항목 목록 상태 훅
- `src/screens/` — 화면 4개 (Brain Dump, 걱정, 해야 할 일, Archive)
- `src/components/` — 하단 탭, 항목 카드
- `src/index.css` — Tailwind + Quick(초록)/Focus(노랑) 색 토큰

## 현재 상태
스타터 킷 단계입니다. 화면은 안내 문구만 있고, 실제 기능은 아직 구현하지 않았습니다.
