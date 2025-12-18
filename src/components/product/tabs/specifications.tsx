"use client";

import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  specifications: Record<string, string>;
}

const Specifications: React.FC<Props> = ({ specifications }) => {
  const hasSpecs = Object.keys(specifications).length > 0;

  return (
    <>
      {hasSpecs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(specifications).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between py-3 border-b border-gray-100"
            >
              <span className="font-medium capitalize text-gray-900">
                {key}
              </span>
              <span className="text-gray-600 text-right">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <Alert>
          <AlertDescription>
            No specifications available for this product.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default Specifications;
