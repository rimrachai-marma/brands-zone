import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Supplier } from "@/types";
import React from "react";

interface Props {
  supplier: Supplier;
}

const SupplierInformation: React.FC<Props> = ({ supplier }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Supplier
            </p>
            <p className="text-lg font-semibold mt-1">
              {supplier.company_name}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Contact Person
            </p>
            <p className="text-lg font-semibold mt-1">
              {supplier.contact_person || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-lg font-semibold mt-1">{supplier.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p className="text-lg font-semibold mt-1">{supplier.phone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="text-lg font-semibold mt-1">{supplier.address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierInformation;
