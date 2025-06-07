"use server";

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validation/propertySchema";

export const createProperty = async (
  data: Omit<Property, "id">,
  authToken: string
) => {
  const verifiedToken = await auth.verifyIdToken(authToken);
  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message ?? "An error occured",
    };
  }

  const property = await firestore.collection("properties").add({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    propertyId: property.id,
  };
};
