"use client";

import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { addFavourite, removeFavourite } from "./actions";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ToggleFavouriteButton = ({
  propertyId,
  isFavourite,
}: {
  propertyId: string;
  isFavourite: boolean;
}) => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        const tokenRetsult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenRetsult) {
          router.push("/login");
          return;
        }
        if (isFavourite) {
          await removeFavourite(propertyId, tokenRetsult.token);
        } else {
          await addFavourite(propertyId, tokenRetsult.token);
        }
        toast(
          `Property ${
            isFavourite ? "removed from" : "added to"
          } your favourites`
        );

        router.refresh();
      }}
      className="absolute top-2 right-2 z-10 bg-white text-zinc-900 hover:bg-white cursor-pointer "
    >
      <HeartIcon
        size="big"
        color={isFavourite ? "red" : "black"}
        fill={isFavourite ? "red" : "white"}
      />
    </Button>
  );
};

export default ToggleFavouriteButton;
