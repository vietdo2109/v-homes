import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PropertyStatusBadge from "@/components/ui/property-status-badge";
import { getPropertyById } from "@/data/properties";
import { BathIcon, BedIcon } from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import ReactMarkdown from "react-markdown";
import BackButton from "./back-button";
import { toImageURL } from "@/lib/utils";

export const dynamic = "force-static"; // enable caching on property page

/* 
User A visits /property/1234 the first time 
=> dynamically query on the firestore database for the data if there is no data on the cache
=> cache this data for this page on Vercel
=> any other user visiting /property/1234 will get the cached data, not query again

case: when property/1234 data got updated => invalidate the data so the next visit will then 
query the new data and invalidate the cache (go to admin/edit/[propertyId])
*/

const PropertyPage = async ({ params }: { params: Promise<any> }) => {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);
  const addressLine = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((addressLine) => !!addressLine);
  return (
    <div className="grid grid-cols-[1fr_500px]">
      <div>
        <div>
          {!!property.images && (
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[80vh] min-h-80">
                      {" "}
                      <Image
                        src={toImageURL(image)}
                        alt={`image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {property.images.length > 1 && (
                <>
                  {" "}
                  <CarouselPrevious className="translate-x-24 size-12" />
                  <CarouselNext className="-translate-x-24 size-12" />
                </>
              )}
            </Carousel>
          )}{" "}
        </div>
        <div className="markdown max-w-screen-md mx-auto py-10 px-4">
          <BackButton />
          <ReactMarkdown>{property.description}</ReactMarkdown>
        </div>
      </div>

      <div className="bg-sky-200 h-screen sticky top-0 flex flex-col justify-center items-center gap-10 p-10">
        <div className="w-full">
          <PropertyStatusBadge
            status={property.status}
            className="text-base font-semibold"
          />
        </div>
        <div className="w-full">
          <h1>
            {addressLine.map((aLine, index) => (
              <div key={index} className="text-4xl font-semibold">
                {aLine}
                {index < addressLine.length - 1 && ","}
              </div>
            ))}
          </h1>
        </div>
        <div className="w-full">
          <h2 className="text-3xl font-light">
            ${numeral(property.price).format("0,0")}
          </h2>
        </div>
        <div className="w-full flex gap-10">
          <div className="flex  gap-2">
            <BedIcon /> {property.bedrooms} Bedrooms
          </div>
          <div className="flex  gap-2">
            <BathIcon /> {property.bathrooms} Bathrooms
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
