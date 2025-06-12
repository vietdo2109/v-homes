"use client";
import { useRouter } from "next/navigation";
import LoginFormComp from "@/components/ui/login-form";

const LoginForm = () => {
  const router = useRouter();

  return (
    <LoginFormComp
      onSuccess={() => {
        router.refresh();
      }}
    />
  );
};

export default LoginForm;
