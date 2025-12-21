import BrandDetails from "@/components/SingleBrand/BrandDetails";
import BrandProducts from "@/components/SingleBrand/BrandProducts";
import FilterSingleBrand from "@/components/SingleBrand/FilterSingleBrand";
import { getVendorProfileById } from "@/lib/actions/vendor";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const [result] = await Promise.all([getVendorProfileById(id), []]);

  if (!result.data) {
    return (
      <div className="p-10 text-center text-red-500 text-lg font-semibold">
        Brand not found.
      </div>
    );
  }

  const { vendor, rating, stats, status_state } = result.data;

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="space-y-8">
          <BrandDetails
            vendor={vendor}
            vendorRating={rating}
            vendorStats={stats}
            statusState={status_state}
          />
          {/*<FilterSingleBrand />*/}
          <BrandProducts brand={vendor} />
        </div>
      </div>
    </section>
  );
}
