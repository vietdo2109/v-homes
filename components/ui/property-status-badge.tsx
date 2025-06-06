"use client";

import { PropertyStatus } from "@/types/propertyStatus";
import { Badge } from "./badge";

const PropertyStatusBadge = ({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) => {
  const statusLabel = {
    "for-sale": "For Sale",
    withdrawn: "Widthdrawn",
    draft: "Draft",
    sold: "Sold",
  };
  const variant: {
    [key: string]: "primary" | "destructive" | "secondary" | "success";
  } = {
    "for-sale": "primary",
    withdrawn: "destructive",
    draft: "secondary",
    sold: "success",
  };
  const label = statusLabel[status];

  return (
    <Badge variant={variant[status]} className={className}>
      {label}
    </Badge>
  );
};

export default PropertyStatusBadge;
