import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterForm from "./filter-form";
import { Suspense } from "react";
import { getProperties } from "@/data/properties";
import Image from "next/image";
import { toImageURL } from "@/lib/utils";
import { BathIcon, BedIcon, HomeIcon } from "lucide-react";
import numeral from "numeral";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const PropertySearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<any>;
}) => {
  const searchParamsValue = await searchParams;

  const parsedPage = parseInt(searchParamsValue?.page);
  const parsedMinPrice = parseInt(searchParamsValue?.minPrice);
  const parsedMaxPrice = parseInt(searchParamsValue?.maxPrice);
  const parsedMinBedrooms = parseInt(searchParamsValue?.minBedrooms);

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
  const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms;

  const { data, totalPages } = await getProperties({
    pagination: {
      page,
      pageSize: 6,
    },
    filters: {
      minPrice,
      maxPrice,
      minBedrooms,
      status: ["for-sale"],
    },
  });

  return (
    <div className="flex justify-center items-center flex-col max-w-screen  mb-[40px]">
      <div className="flex flex-col max-w-[1000px] min-w-[800px] py-5">
        <h1 className="text-4xl font-bold p-5">Property Search</h1>
        <Card>
          <CardHeader className="font-semibold">Filters</CardHeader>
          <CardContent>
            <Suspense>
              {" "}
              <FilterForm />
            </Suspense>
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-4 mt-5 w-full">
          {data.map((property) => {
            const address = [
              property.address1,
              property.address2,
              property.city,
              property.postcode,
            ]
              .filter((addressLine) => !!addressLine)
              .join(", ");
            return (
              <Card
                key={property.id}
                className="col-span-1 p-0 overflow-hidden w-[322px]"
              >
                <CardContent className="px-0 flex flex-col h-full">
                  <div className="h-40 relative bg-sky-50 text-zinc-400 flex flex-col items-center justify-center">
                    {property.images?.[0] && (
                      <Image
                        fill
                        className="object-cover"
                        src={toImageURL(property.images?.[0])}
                        alt=""
                      />
                    )}
                    {!property.images?.[0] && (
                      <>
                        <HomeIcon />
                        <small>No Image</small>
                      </>
                    )}
                  </div>
                  <div className="w-full p-3 flex flex-col gap-3 flex-1">
                    <div className="flex-1 min-h-[50px]">
                      {" "}
                      <p>{address}</p>
                    </div>
                    <div className="w-full flex gap-5">
                      <div className="flex  gap-2">
                        <BedIcon /> {property.bedrooms} Bedrooms
                      </div>
                      <div className="flex  gap-2">
                        <BathIcon /> {property.bathrooms} Bathrooms
                      </div>
                    </div>{" "}
                    <h2 className="text-2xl justify-end items-end">
                      ${numeral(property.price).format("0,0")}
                    </h2>
                    <Button asChild>
                      <Link href={`/property/${property.id}`}>
                        View Property
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        {Array.from({ length: totalPages }).map((_, index) => {
          const newSearchParams = new URLSearchParams();

          if (searchParamsValue?.minPrice) {
            newSearchParams.set("minPrice", minPrice + "");
          }
          if (searchParamsValue?.maxPrice) {
            newSearchParams.set("maxPrice", maxPrice + "");
          }
          if (searchParamsValue?.minBedrooms) {
            newSearchParams.set("minBedrooms", minBedrooms + "");
          }

          newSearchParams.set("page", index + 1 + "");
          return (
            <Button
              asChild={page !== index + 1}
              key={index}
              variant="outline"
              disabled={page === index + 1}
            >
              <Link href={`/property-search?${newSearchParams.toString()}`}>
                {index + 1}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PropertySearchPage;
