"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// 체크박스, 스위치, 셀렉트의 기본 사용법
export function ControlsExample() {
  const [fruit, setFruit] = useState<string | null>("apple");

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree">약관에 동의합니다</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notify" />
        <Label htmlFor="notify">알림 받기</Label>
      </div>
      <Select value={fruit} onValueChange={setFruit}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="과일 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
          <SelectItem value="orange">오렌지</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
