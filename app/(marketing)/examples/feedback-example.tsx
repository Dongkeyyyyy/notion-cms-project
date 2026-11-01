"use client";

import { Info } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExampleBlock } from "./example-block";

// 상태를 알려주는 요소: Alert, Skeleton, 빈/오류 화면, 토스트
export function FeedbackExample() {
  return (
    <div className="space-y-8">
      <ExampleBlock title="Alert" source="components/ui/alert.tsx">
        <div className="grid gap-3">
          <Alert>
            <Info />
            <AlertTitle>안내</AlertTitle>
            <AlertDescription>기본 알림입니다.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <Info />
            <AlertTitle>오류</AlertTitle>
            <AlertDescription>문제가 발생했을 때 쓰는 알림입니다.</AlertDescription>
          </Alert>
        </div>
      </ExampleBlock>

      <ExampleBlock title="Skeleton" source="components/ui/skeleton.tsx">
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="토스트" source="components/ui/sonner.tsx">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast("기본 토스트입니다.")}>
            기본
          </Button>
          <Button variant="outline" onClick={() => toast.success("저장되었습니다.")}>
            성공
          </Button>
          <Button variant="outline" onClick={() => toast.error("저장하지 못했습니다.")}>
            오류
          </Button>
        </div>
      </ExampleBlock>

      <ExampleBlock title="EmptyState" source="components/common/empty-state.tsx">
        <EmptyState
          icon={<Info />}
          title="아직 항목이 없습니다"
          description="데이터가 없을 때 안내와 다음 행동을 보여줍니다."
          action={<Button>항목 추가</Button>}
        />
      </ExampleBlock>

      <ExampleBlock title="ErrorState" source="components/common/error-state.tsx">
        <ErrorState onRetry={() => toast("다시 시도했습니다.")} />
      </ExampleBlock>
    </div>
  );
}
