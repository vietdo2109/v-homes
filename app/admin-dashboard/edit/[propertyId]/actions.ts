"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";
import { Property } from "@/types/property";
import { revalidatePath } from "next/cache";

export const updateProperty = async (data: Property, authToken: string) => {
  const { id, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(authToken);
  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(propertyData);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occured",
    };
  }

  await firestore
    .collection("properties")
    .doc(id)
    .update({
      ...propertyData,
      updatedAt: new Date(),
    });

  // invalidate cache
  revalidatePath(`/property/${id}`);
};

export const deleteProperty = async (propertyId: string, authToken: string) => {
  const verifiedToken = await auth.verifyIdToken(authToken);
  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  await firestore.collection("properties").doc(propertyId).delete();
};
