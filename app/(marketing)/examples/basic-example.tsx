import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExampleBlock } from "./example-block";

// 기본 UI: 버튼, 배지, 카드, 아바타
export function BasicExample() {
  return (
    <div className="space-y-8">
      <ExampleBlock title="버튼 변형" source="components/ui/button.tsx">
        <div className="flex flex-wrap gap-2">
          <Button>default</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="link">link</Button>
        </div>
      </ExampleBlock>

      <ExampleBlock title="버튼 크기" source="components/ui/button.tsx">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="xs">xs</Button>
          <Button size="sm">sm</Button>
          <Button>default</Button>
          <Button size="lg">lg</Button>
        </div>
      </ExampleBlock>

      <ExampleBlock title="배지" source="components/ui/badge.tsx">
        <div className="flex flex-wrap gap-2">
          <Badge>default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="destructive">destructive</Badge>
        </div>
      </ExampleBlock>

      <ExampleBlock title="카드와 아바타" source="components/ui/card.tsx, avatar.tsx">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>카드 제목</CardTitle>
            <CardDescription>카드 설명이 들어가는 자리입니다.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <span className="text-sm">Starter Kit</span>
          </CardContent>
        </Card>
      </ExampleBlock>
    </div>
  );
}
