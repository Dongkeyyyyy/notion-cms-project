import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"
import { navItems, siteConfig } from "@/config/site"

// 모든 페이지 하단에 표시되는 푸터
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full">
      <Separator />
      <Container className="flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <nav className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
