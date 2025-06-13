import { auth, firestore, getTotalPages } from "@/firebase/server";
import { GetPropertiesOptions } from "@/types/getPropertiesOptions";
import { Property } from "@/types/property";
import { cookies } from "next/headers";
import "server-only";

export const getUserFavorites = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return {};
  }

  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return {};
  }

  const favouriteSnapshot = await firestore
    .collection("favourites")
    .doc(verifiedToken.uid)
    .get();

  const favourites = favouriteSnapshot.data();
  return favourites || {};
};

export const getUserFavoriteProperties = async (
  option?: GetPropertiesOptions
) => {
  const page = option?.pagination?.page || 1;
  const pageSize = option?.pagination?.pageSize || 10;
  const favourites = await getUserFavorites();
  const favouritePropertyIds = Object.keys(favourites);

  if (favouritePropertyIds.length === 0) {
    return { data: null, totalPages: 0 };
  }

  let propertiesQuery = firestore
    .collection("properties")
    .orderBy("updatedAt", "desc");
  propertiesQuery = propertiesQuery.where(
    "__name__",
    "in",
    favouritePropertyIds
  );

  const totalPages = await getTotalPages(propertiesQuery, pageSize);
  const propertiesSnapshot = await propertiesQuery
    .limit(pageSize)
    .offset(pageSize * (page - 1))
    .get();

  const properties = propertiesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Property)
  );

  return { data: properties, totalPages };
};
