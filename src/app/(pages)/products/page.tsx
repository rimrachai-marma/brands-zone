import ProductList from "@/components/Products/product-list";
import ProductFilter from "./_components/product-filter";
import ProductSearch from "./_components/product-search";

const page = async (props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;

  const keyword = searchParams?.keyword as string | undefined;
  const page = searchParams?.page as string | undefined;

  const query: Record<string, string> = {};
  if (keyword) {
    query.keyword = keyword;
  }

  if (page) {
    query.page = page;
  }

  return (
    <div className="container mx-auto py-10 px-3">
      <div className="space-y-4">
        <h2 className="font-semibold text-xl">All products</h2>

        <ProductFilter />
        <ProductSearch />

        <ProductList query={query} />
      </div>
    </div>
  );
};

export default page;
