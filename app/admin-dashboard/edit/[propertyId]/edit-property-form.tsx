"use client";

import PropertyForm from "@/components/property-form";
import { auth, storage } from "@/firebase/client";
import { Property } from "@/types/property";
import { propertySchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateProperty } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { savePropertyImages } from "../../actions";

type Props = Property;

const EditPropertyForm = ({
  id,
  address1,
  address2,
  city,
  postcode,
  bathrooms,
  bedrooms,
  status,
  price,
  description,
  images = [],
}: Props) => {
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      return;
    }

    const { images: updatedImages, ...rest } = data;

    const response = await updateProperty({ id, ...rest }, token);
    if (response?.error) {
      toast.error("Error!", {
        description: response.message,
      });
      return;
    }

    const storageTasks: (UploadTask | Promise<void>)[] = [];
    const imagesToDelete = images.filter(
      (image) =>
        !updatedImages.find((updatedImage) => updatedImage.url === image)
    );

    imagesToDelete.forEach((img) => {
      storageTasks.push(deleteObject(ref(storage, img)));
    });

    const paths: string[] = [];
    updatedImages.forEach((img, index) => {
      if (img.file) {
        const path = `properties/${id}/${Date.now()}-${index}-${img.file.name}`;

        paths.push(path);

        const storageRef = ref(storage, path);
        storageTasks.push(uploadBytesResumable(storageRef, img.file));
      } else {
        paths.push(img.url);
      }
    });

    await Promise.all(storageTasks);
    await savePropertyImages({ propertyId: id, images: paths }, token);
    toast.success("Property updated");

    router.push("/admin-dashboard");
  };

  return (
    <div>
      <PropertyForm
        defaultValues={{
          address1,
          address2,
          city,
          postcode,
          bathrooms,
          bedrooms,
          status,
          price,
          description,
          images: images.map((image) => ({
            id: image,
            url: image,
          })),
        }}
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <SaveIcon />
            Save changes
          </>
        }
      />
    </div>
  );
};

export default EditPropertyForm;
