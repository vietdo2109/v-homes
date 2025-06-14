"use client";

import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const ContinueWithGoogleButton = () => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={async () => {
        try {
          await auth?.loginWithGoogle();
          router.refresh();
        } catch (e) {
          console.log(e);
        }
      }}
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
