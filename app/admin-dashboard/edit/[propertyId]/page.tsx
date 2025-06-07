import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import Link from "next/link";
import NewPropertyForm from "../../new/new-property-form";
import EditPropertyForm from "./edit-property-form";

const EditProperty = async ({ params }: { params: Promise<any> }) => {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);
  return (
    <div className="w-[900px]">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin-dashboard",
          },
          {
            label: "Edit Property",
          },
        ]}
      />
      <Card className="w-full  mt-3">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <EditPropertyForm
            id={property.id}
            address1={property.address1}
            address2={property.address2}
            city={property.city}
            postcode={property.postcode}
            bathrooms={property.bathrooms}
            bedrooms={property.bedrooms}
            status={property.status}
            price={property.price}
            description={property.description}
            images={property.images || []}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProperty;
