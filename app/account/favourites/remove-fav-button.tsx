"use client";

import { removeFavourite } from "@/app/property-search/actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RemoveFavButton = ({ propertyId }: { propertyId: string }) => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        const tokenRetsult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenRetsult) {
          router.push("/login");
          return;
        }
        await removeFavourite(propertyId, tokenRetsult.token);

        toast(`Property removed from your favourites`);

        router.refresh();
      }}
    >
      <TrashIcon />
    </Button>
  );
};

export default RemoveFavButton;
