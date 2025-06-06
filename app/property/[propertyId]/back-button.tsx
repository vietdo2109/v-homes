"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="link"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeftIcon /> Back to properties page
    </Button>
  );
};

export default BackButton;
