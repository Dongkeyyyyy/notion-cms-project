// 사이트 전역 설정값
// 서비스 이름, 설명, 메뉴처럼 자주 바뀌는 값은 이 파일만 수정하면 헤더, 푸터, 메타데이터에 함께 반영됩니다.

export const siteConfig = {
  name: "Starter Kit",
  description: "Next.js, TypeScript, Tailwind CSS, shadcn/ui로 빠르게 시작하는 웹 스타터킷",
  url: "http://localhost:3000",
}

// 헤더와 푸터에서 공통으로 사용하는 네비게이션 메뉴
export const navItems = [
  { title: "홈", href: "/" },
  { title: "소개", href: "/about" },
  { title: "문서", href: "/docs" },
  { title: "예제", href: "/examples" },
]
