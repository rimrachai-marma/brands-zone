"use client";
import HotSaleProducts from "@/components/Products/HotSaleProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HOT_PRODUCTS_DATA } from "@/constant/hotProductsData";

const HotSaleTabs = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h4 className="text-xl font-semibold text-primary">
            Hot Sale Products
          </h4>
          <TabsList className="bg-white">
            <TabsTrigger value="16">16% Off</TabsTrigger>
            <TabsTrigger value="25">25% Off</TabsTrigger>
            <TabsTrigger value="33">33% Off</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="16">
          <HotSaleProducts hotProducts={HOT_PRODUCTS_DATA} />
        </TabsContent>
        <TabsContent value="25">
          <HotSaleProducts hotProducts={HOT_PRODUCTS_DATA} />
        </TabsContent>
        <TabsContent value="33">
          <HotSaleProducts hotProducts={HOT_PRODUCTS_DATA} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HotSaleTabs;
