import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

// 존재하지 않는 주소로 들어왔을 때 보여주는 404 화면
export default function NotFound() {
  return (
    <EmptyState
      icon={<FileQuestion />}
      title="페이지를 찾을 수 없습니다"
      description="주소가 잘못되었거나 페이지가 이동되었을 수 있습니다."
      action={<Button nativeButton={false} render={<Link href="/" />}>홈으로 돌아가기</Button>}
    />
  );
}
