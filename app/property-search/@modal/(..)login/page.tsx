"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginFormComp from "@/components/ui/login-form";
import { useRouter } from "next/navigation";
import { onLoginSuccess } from "./actions";

const LoginModal = () => {
  const route = useRouter();
  return (
    <Dialog
      open
      onOpenChange={() => {
        route.back();
      }}
    >
      <DialogContent>
        <DialogHeader className="mb-6">
          {" "}
          <DialogTitle className="text-4xl text-sky-950 font-bold">
            Login
          </DialogTitle>
          <DialogDescription>
            You must be logged in to favourite a property
          </DialogDescription>
        </DialogHeader>
        <LoginFormComp
          onSuccess={async () => {
            await onLoginSuccess();
            route.back();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
