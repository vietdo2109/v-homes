"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useAuth } from "@/context/auth";

import { toast } from "sonner";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase/client";
import { deleteProperty } from "./actions";
import { useRouter } from "next/navigation";

const DeletePropertyButton = ({
  propertyId,
  imagePaths = [],
}: {
  propertyId: string;
  imagePaths: string[];
}) => {
  const auth = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteProperty = async (propertyId: string) => {
    setIsDeleting(true);
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const storageTasks: Promise<void>[] = [];

    imagePaths.forEach((img) => {
      storageTasks.push(deleteObject(ref(storage, img)));
    });

    await Promise.all(storageTasks);

    try {
      await deleteProperty(propertyId, token);
      toast.success("Successfully deleted property");
      router.push("/admin-dashboard");
    } catch (e: any) {
      console.log(e);
      toast.error("Failed to delete this property!");
      return;
    }
    setIsDeleting(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className=" bg-red-500">
          Delete Property
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this property?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            property.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
            onClick={() => {
              handleDeleteProperty(propertyId);
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePropertyButton;
