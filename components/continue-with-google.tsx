"use client";

import { GoogleAuthProvider } from "firebase/auth";
import { Button } from "./ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useAuth } from "@/context/auth";

const ContinueWithGoogleButton = () => {
  const auth = useAuth();

  return (
    <Button className="w-full" onClick={auth?.loginWithGoogle}>
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
