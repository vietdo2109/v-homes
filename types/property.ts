import { PropertyStatus } from "./propertyStatus";

export type Property = {
  id: string;
  status: PropertyStatus;
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  images?: string[];
};
