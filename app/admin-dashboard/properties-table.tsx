import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyStatusBadge from "@/components/ui/property-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProperties } from "@/data/properties";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import numeral from "numeral";

const PropertiesTable = async ({ page = 1 }: { page?: number }) => {
  const { data, totalPages } = await getProperties({
    pagination: {
      page: page,
      pageSize: 4,
    },
  });
  return (
    <>
      {!data && (
        <h1 className="text-center text-zinc-400 py-20 font-bold text-3xl">
          You have no properties
        </h1>
      )}
      {!!data && (
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Listing Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                <TableRow key={property.id}>
                  <TableCell>{address}</TableCell>
                  <TableCell>
                    ${numeral(property.price).format("0,0")}
                  </TableCell>
                  <TableCell>
                    <PropertyStatusBadge status={property.status} />
                  </TableCell>

                  <TableCell className="flex justify-end gap-2">
                    <Button asChild variant={"outline"} size="sm">
                      <Link href={`/property/${property.id}`}>
                        <EyeIcon />
                      </Link>
                    </Button>
                    <Button asChild variant={"outline"} size="sm">
                      <Link href={`/admin-dashboard/edit/${property.id}`}>
                        <PencilIcon />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {Array.from({ length: totalPages }).map((_, i) => {
                  return (
                    <Button
                      key={i}
                      asChild={i + 1 !== page}
                      disabled={i + 1 === page}
                      variant="outline"
                      className="mx-1"
                    >
                      <Link href={`/admin-dashboard?page=${i + 1}`}>
                        {i + 1}
                      </Link>
                    </Button>
                  );
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
};

export default PropertiesTable;
