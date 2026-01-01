import { getBrands } from "@/lib/actions/brands";
import ProductForm from "./_components/form";
import { getCategories } from "@/lib/actions/categories";
import { getCampaigns } from "@/lib/actions/campaigns";
import { getAuthToken } from "@/lib/actions/auth";
import { Suspense } from "react";
import { getProduct } from "@/lib/actions/products";
import { notFound } from "next/navigation";

export default async function ProductCreatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const brandQuery: Record<string, string> = {
    is_active: "1",
    per_page: "100",
  };

  const categoryQuery: Record<string, string> = {
    is_active: "1",
    per_page: "100",
  };

  const campaignQuery: Record<string, string> = {
    is_active: "1",
    per_page: "100",
  };

  // Fetch all data in parallel for better performance
  const [token, brandData, categoryData, campaignData, productData] =
    await Promise.all([
      getAuthToken(),
      getBrands(brandQuery),
      getCategories(categoryQuery),
      getCampaigns(campaignQuery),
      getProduct(id),
    ]);

  console.log({ productData });

  if (!productData.data) return notFound();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground mt-1">
          Update the product details. Your progress is saved when you click
          Next.
        </p>
      </div>

      <Suspense fallback="Loading...">
        <ProductForm
          product={productData.data}
          categories={categoryData.data || []}
          brands={brandData.data || []}
          campaigns={campaignData.data || []}
          token={token || ""}
        />
      </Suspense>
    </div>
  );
}
