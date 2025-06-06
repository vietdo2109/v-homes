import { getPropertyById } from "@/data/properties";

const PropertyPage = async ({ params }: { params: Promise<any> }) => {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);
  console.log(property);
  return <div>property page {paramsValue.propertyId}</div>;
};

export default PropertyPage;
