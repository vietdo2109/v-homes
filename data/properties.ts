import { firestore, getTotalPages } from "@/firebase/server";
import { Property } from "@/types/property";
import { PropertyStatus } from "@/types/propertyStatus";
import { pages } from "next/dist/build/templates/app-page";
import "server-only";

type GetPropertiesOptions = {
  filters?: {
    minPrice?: number | null;
    maxPrice?: number | null;
    minBedrooms?: number | null;
    status?: PropertyStatus[] | null;
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const getProperties = async (option?: GetPropertiesOptions) => {
  const page = option?.pagination?.page || 1;
  const pageSize = option?.pagination?.pageSize || 10;
  const { minPrice, maxPrice, minBedrooms, status } = option?.filters || {};
  console.log({ minPrice, maxPrice, minBedrooms, status });

  let propertiesQuery = firestore
    .collection("properties")
    .orderBy("updatedAt", "desc");

  if (minPrice !== null && minPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
  }
  if (maxPrice !== null && maxPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
  }
  if (minBedrooms !== null && minBedrooms !== undefined) {
    propertiesQuery = propertiesQuery.where("bedrooms", ">=", minBedrooms);
  }
  if (status !== null && status !== undefined) {
    propertiesQuery = propertiesQuery.where("status", "in", status);
  }

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

export const getPropertyById = async (propertyId: string) => {
  const propertySnapshot = await firestore
    .collection("properties")
    .doc(propertyId)
    .get();

  const propertyData = {
    id: propertySnapshot.id,
    ...propertySnapshot.data(),
  } as Property;
  return propertyData;
};
