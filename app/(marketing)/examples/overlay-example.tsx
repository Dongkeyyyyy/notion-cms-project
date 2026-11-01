"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ExampleBlock } from "./example-block";

// 화면 위에 겹쳐 뜨는 요소: Dialog, Dropdown, Tooltip, Sheet
export function OverlayExample() {
  return (
    <div className="space-y-8">
      <ExampleBlock title="Dialog" source="components/ui/dialog.tsx">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            다이얼로그 열기
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>확인해 주세요</DialogTitle>
              <DialogDescription>
                Esc 키나 바깥 영역을 눌러도 닫힙니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button />}>확인</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ExampleBlock>

      <ExampleBlock title="Dropdown Menu" source="components/ui/dropdown-menu.tsx">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            메뉴 열기
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>프로필</DropdownMenuItem>
            <DropdownMenuItem>설정</DropdownMenuItem>
            <DropdownMenuItem>로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ExampleBlock>

      <ExampleBlock title="Tooltip" source="components/ui/tooltip.tsx">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            마우스를 올려 보세요
          </TooltipTrigger>
          <TooltipContent>툴팁 내용입니다</TooltipContent>
        </Tooltip>
      </ExampleBlock>

      <ExampleBlock title="Sheet" source="components/ui/sheet.tsx">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            시트 열기
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>시트 제목</SheetTitle>
              <SheetDescription>옆에서 나타나는 패널입니다.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </ExampleBlock>
    </div>
  );
}
