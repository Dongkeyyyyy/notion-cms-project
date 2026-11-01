"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 입력값 검사 규칙 (zod)
const schema = z.object({
  name: z.string().min(1, "이름을 입력해 주세요."),
  email: z.email("올바른 이메일 형식이 아닙니다."),
  message: z.string().min(10, "내용을 10자 이상 입력해 주세요."),
});

type FormValues = z.infer<typeof schema>;

// react-hook-form + zod + sonner 사용 예시.
// 실제 전송 로직은 없으므로 onSubmit 안을 API 호출로 교체해서 사용하세요.
export function FormExample() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    console.log(values);
    toast.success("제출되었습니다.");
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid max-w-xl gap-5"
    >
      <FormField label="이름" htmlFor="name" error={errors.name?.message}>
        <Input id="name" aria-invalid={!!errors.name} {...register("name")} />
      </FormField>
      <FormField label="이메일" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </FormField>
      <FormField label="내용" htmlFor="message" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </FormField>
      <Button type="submit" disabled={isSubmitting} className="justify-self-start">
        보내기
      </Button>
    </form>
  );
}
