import React from "react";
import { Product } from "@/types";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@radix-ui/react-tabs";
import Specifications from "./specifications";
import Reviews from "./reviews";
import VendorInfoTab from "./VendorInfoTab";

interface Props {
  product: Product;
}

const Tabs: React.FC<Props> = async ({ product }) => {
  return (
    <ShadcnTabs defaultValue="description">
      <TabsList className="border-b w-full flex gap-6 sm:gap-6 md:gap-8">
        <TabsTrigger
          value="description"
          className="pb-2 text-gray-600 border-b-2 border-transparent hover:text-primary transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Description
        </TabsTrigger>

        <TabsTrigger
          value="specifications"
          className="pb-2 text-gray-600 border-b-2 border-transparent hover:text-primary transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Specifications
        </TabsTrigger>

        <TabsTrigger
          value="reviews"
          className="pb-2 text-gray-600 border-b-2 border-transparent hover:text-primary transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Reviews ({product.reviews.length})
        </TabsTrigger>

        <TabsTrigger
          value="vendor"
          className="pb-2 text-gray-600 border-b-2 border-transparent hover:text-primary transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Brands
        </TabsTrigger>
      </TabsList>

      {/* description  */}
      <TabsContent value="description" className="pt-4">
        <div className="leading-relaxed">{product.description}</div>
      </TabsContent>

      {/* specifications  */}
      <TabsContent value="specifications" className="pt-4">
        <Specifications specifications={product.specifications} />
      </TabsContent>

      {/* reviews */}
      <TabsContent value="reviews" className="pt-4">
        <Reviews product={product} isLoggedIn={true} />
      </TabsContent>

      {/* brands */}
      <TabsContent value="vendor" className="pt-4">
        <VendorInfoTab vendorId={product.vendor_id} />
      </TabsContent>
    </ShadcnTabs>
  );
};

export default Tabs;
