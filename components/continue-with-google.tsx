"use client";

import { GoogleAuthProvider } from "firebase/auth";
import { Button } from "./ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const ContinueWithGoogleButton = () => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <Button
      className="w-full"
      onClick={async () => {
        await auth?.loginWithGoogle();
        router.push("/");
      }}
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
