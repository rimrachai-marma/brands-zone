import { getCategories } from "@/lib/actions/categories";
import FeatureProducts from "./FeatureProducts";

const HotDeal = async () => {
  const result = await getCategories({
    per_page: 6,
    with_products_count: 1,
    root_only: 1,
  });

  return (
    <section className="overflow-hidden">
      <div className="container-fluid mx-auto">
        <FeatureProducts categories={result.data ?? []} />
      </div>
    </section>
  );
};

export default HotDeal;
