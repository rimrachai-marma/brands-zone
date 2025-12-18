import ProductList from "@/components/Products/product-list";
import ProductFilter from "./_components/product-filter";
import ProductSearch from "./_components/product-search";
import {getUserProducts} from "@/lib/actions/products";

const page = async (props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParams = await props.searchParams;

    // Extract all query parameters
    const keyword = searchParams?.keyword as string | undefined;
    const page = searchParams?.page as string | undefined;
    const sort = searchParams?.sort as string | undefined;
    const perPage = searchParams?.perPage as string | undefined;

    const query: Record<string, string> = {};
    if (keyword) {
        query.search = keyword;
    }
    if (page) {
        query.page = page;
    }
    if (sort) {
        query.sort = sort;
    }
    if (perPage) {
        query.perPage = perPage;
    }

    const result = await getUserProducts(query);
    console.log(result)
    return (
        <div className="container mx-auto py-10 px-3">
            <div className="space-y-4">
                <h2 className="font-semibold text-xl">All Products</h2>

                {/* Pass initial values from URL */}
                <ProductFilter initialSort={sort} />
                <ProductSearch initialKeyword={keyword} />

                <ProductList result={result?.data ||[]} />
            </div>
        </div>
    );
};

export default page;