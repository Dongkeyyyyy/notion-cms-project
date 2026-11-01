import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 링크를 공유할 때 보이는 기본 미리보기 이미지 (사이트 이름을 그대로 사용)
// 한글 글꼴은 포함하지 않으므로, 한글 이름을 쓴다면 글꼴 설정이 필요합니다.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#171717",
          color: "#fafafa",
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        {siteConfig.name}
      </div>
    ),
    { ...size }
  );
}
