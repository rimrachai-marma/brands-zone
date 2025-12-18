"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/Products/ProductGrid";
import { PRODUCTS_DATA } from "@/constant/productsData";

const CategoriesTabs = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="mobile">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between mb-4">
          <h4 className="text-xl font-semibold text-primary">
            Top Categories Products
          </h4>
          <TabsList className="bg-white">
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="headphone">Headphone</TabsTrigger>
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="speaker">Speaker</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="mobile">
          <ProductGrid products={PRODUCTS_DATA} />
        </TabsContent>
        <TabsContent value="headphone">
          <ProductGrid products={PRODUCTS_DATA} />
        </TabsContent>
        <TabsContent value="camera">
          <ProductGrid products={PRODUCTS_DATA} />
        </TabsContent>
        <TabsContent value="speaker">
          <ProductGrid products={PRODUCTS_DATA} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategoriesTabs;
