"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

// 다크모드 전환을 next-themes에 맡기는 Provider (<html>에 .dark 클래스를 붙여줌)
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
