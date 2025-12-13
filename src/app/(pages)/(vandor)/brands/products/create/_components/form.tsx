"use client";

import { Form } from "@/components/ui/form";
import { ProductFormData, productSchema } from "@/schema/products/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BasicInformationSection } from "./form-sections/basic-information-section";
import { ProductImagesSection } from "./form-sections/product-images-section";
import { DescriptionSection } from "./form-sections/description-section";
import { SEOSection } from "./form-sections/seo-section";
import { VariantsSection } from "./form-sections/variants-section";
import { SpecificationsSection } from "./form-sections/specifications-section";
import { PhysicalPropertiesSection } from "./form-sections/physical-properties-section";
import { InventoryPricingSection } from "./form-sections/inventory-pricing-section";
import DiscountSection from "./form-sections/campaign-section";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import React, { useActionState, useState } from "react";
import { AttributesSection } from "./form-sections/attributes-section";
import { ProductFeaturedSection } from "./form-sections/product-featured-section";
import { Brand, Campaign, Category } from "@/types";
import { createProduct } from "@/lib/actions/products";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { clientEnv } from "@/data/env";

interface Props {
  brands: Brand[];
  categories: Category[];
  campaigns: Campaign[];
  token:string
}

export default function ProductForm({ brands, campaigns, categories,token }: Props) {
  const router = useRouter();

  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  // for sku genarate
  const [brandName, setBrandName] = useState("");

  const [state, formAction, isPending] = useActionState(createProduct, null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand_id: "",
      category_ids: [],

      short_description: "",
      description: "",

      images: [{ url: "", alt_text: "", publicId: undefined }],

      currency: "USD",
      low_stock_threshold: 5,

      weight: undefined,
      weight_unit: "kg",
      length: undefined,
      width: undefined,
      height: undefined,
      dimension_unit: "cm",

      specifications: {},

      attributes: [],
      variants: [
        {
          sku: "",
          barcode: "",
          attributes: {},
          price: 0,
          sale_price: undefined,
          cost_price: undefined,
          stock_quantity: 0,

          weight: 5,
          weight_unit: "kg",

          width: undefined,
          height: undefined,
          length: undefined,
          dimension_unit: "cm",
        },
      ],
      meta_title: "",
      meta_description: "",
      meta_keywords: [],
      canonical_url: "",

      campaign_id: undefined,

      status: "draft",
      featured: false,
    },
  });

  React.useEffect(() => {
    if (state?.status === "error" && state.message && !isPending) {
      toast.error(state.message);
    }

    if (state?.status === "success" && !isPending) {
      toast.success(state.message || "Product created successfully");
      router.push("/vendor/products");
    }
  }, [state, isPending, router]);

  const onSubmit = async (data: ProductFormData) => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInformationSection
          categories={categories}
          brands={brands}
          form={form}
          setBrandName={setBrandName}
        />

        <ProductImagesSection
          uploadEndpoint={`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/vendor/upload/product-image`}
          form={form}
          token={token}
        />

        <DescriptionSection form={form} />

        <SEOSection form={form} />

        <AttributesSection form={form} />

        <VariantsSection brandName={brandName} form={form} />

        <SpecificationsSection
          form={form}
          newSpecKey={newSpecKey}
          setNewSpecKey={setNewSpecKey}
          newSpecValue={newSpecValue}
          setNewSpecValue={setNewSpecValue}
        />

        <PhysicalPropertiesSection form={form} />

        <InventoryPricingSection form={form} />

        <DiscountSection campaigns={campaigns} form={form} />

        <ProductFeaturedSection form={form} />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              alert("Not Implemented!");
            }}
            type="button"
            variant="outline"
          >
            Save as Draft
          </Button>
          <Button disabled={isPending} type="submit">
            <LoadingSwap isLoading={isPending}>
              Create & Publish Product
            </LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  );
}
