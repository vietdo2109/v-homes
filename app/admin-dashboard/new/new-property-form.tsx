"use client";
import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertySchema } from "@/validation/propertySchema";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { createProperty } from "./actions";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";
import { savePropertyImages } from "../actions";

const NewPropertyForm = () => {
  const auth = useAuth();
  const router = useRouter();
  async function handleSubmit(data: z.infer<typeof propertySchema>) {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      return;
    }

    const { images, ...rest } = data;

    const response = await createProperty(rest, token); // <--created property.propertyId returned here

    if (!!response.error || !response.propertyId) {
      toast.error("Error!", {
        description: response.error,
      });
      return;
    }

    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];

    // Upload images to the cloud storage (images associated with the created property)
    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${
          response.propertyId
        }/${Date.now()}-${index}-${image.file.name}`;

        paths.push(path);

        const storageRef = ref(storage, path);
        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    await Promise.all(uploadTasks);
    await savePropertyImages(
      { propertyId: response.propertyId, images: paths },
      token
    );

    toast.success("Property created");

    router.push("/admin-dashboard");
  }

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircle /> Create Property
          </>
        }
      />
    </div>
  );
};

export default NewPropertyForm;
