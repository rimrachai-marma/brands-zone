import {} from "@/lib/actions/brands";
import LogoSlider from "./LogoSlider";
import { getFeaturedBrands } from "@/lib/actions/user/brands";
import { Suspense } from "react";

const BrandLogo = async () => {
  const result = await getFeaturedBrands();

  return (
    <div className={"px-2 bg-gray-50 pt-5"}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Featured Brands
        </h2>
        <p className="text-gray-600">Premium brands in our collection</p>
      </div>
      <Suspense fallback={null}>
        <LogoSlider beands={result.data ?? []} />
      </Suspense>
    </div>
  );
};

export default BrandLogo;
