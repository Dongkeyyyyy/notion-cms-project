import type { MetadataRoute } from "next";

import { navItems, siteConfig } from "@/config/site";

// navItems에 메뉴를 추가하면 sitemap에도 자동으로 반영됩니다.
export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map((item) => ({
    url: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date(),
  }));
}
