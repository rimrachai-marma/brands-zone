import { getBrands } from "@/lib/actions/brands";
import ProductForm from "./_components/form";
import { getCategories } from "@/lib/actions/categories";
import { getCampaigns } from "@/lib/actions/campaigns";
import { getAuthToken } from "@/lib/actions/auth";
import { getFormStateFromCookie } from "../_lib/actions";
import { Suspense } from "react";

export default async function ProductCreatePage() {
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
  const [token, brandData, categoryData, campaignData, savedFormData] =
    await Promise.all([
      getAuthToken(),
      getBrands(brandQuery),
      getCategories(categoryQuery),
      getCampaigns(campaignQuery),
      getFormStateFromCookie(),
    ]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Create Product</h1>
        <p className="text-muted-foreground mt-1">
          Add a new product to your catalog. Your progress is saved when you
          click Next.
        </p>
      </div>

      <Suspense fallback="Loading...">
        <ProductForm
          categories={categoryData.data || []}
          brands={brandData.data || []}
          campaigns={campaignData.data || []}
          token={token || ""}
          savedFormData={savedFormData}
        />
      </Suspense>
    </div>
  );
}
