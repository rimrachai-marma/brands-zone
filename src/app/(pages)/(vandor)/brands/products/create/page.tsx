import { getBrands } from "@/lib/actions/brands";
import ProductForm from "./_components/form";
import { getCategories } from "@/lib/actions/categories";
import { getCampaigns } from "@/lib/actions/campaigns";
import {getAuthToken} from "@/lib/actions/auth";

export default async function ProductCreatePage() {
  const brandQuery: Record<string, string> = {
    is_active: "1",
  };
  const token = await getAuthToken()||'';

  const brandData = await getBrands(brandQuery);

  const categoryQuery: Record<string, string> = {
    is_active: "1",
  };
  const categoryData = await getCategories(categoryQuery);

  const campaignQuery: Record<string, string> = {
    is_active: "1",
  };
  const campaignData = await getCampaigns(campaignQuery);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Create Product</h1>
        <p className="text-muted-foreground mt-1">
          Add a new product to your catalog
        </p>
      </div>

      <ProductForm
        categories={categoryData.data?.categories || []}
        brands={brandData.data?.brands || []}
        campaigns={campaignData.data?.campaigns || []}
        token={token}
      />
    </div>
  );
}
