import SingleBrand from "@/components/SingleBrand";
import { BRANDS_DATA } from "@/constant/brandsData";
import { PRODUCTS_DATA } from "@/constant/productsData";
import { Brands, Product } from "@/types";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const brandPromise = new Promise<Brands | undefined>((resolve) => {
    const brand = BRANDS_DATA.find((b) => String(b.id) === id);
    setTimeout(() => resolve(brand), 100); 
  });


  const productsPromise = new Promise<Product[]>((resolve) => {
    const brand = BRANDS_DATA.find((b) => String(b.id) === id);
    const products = PRODUCTS_DATA.filter(
      (p) => p.brandName?.toLowerCase() === brand?.name.toLowerCase()
    );
    setTimeout(() => resolve(products), 100);
  });

  const [brand, products] = await Promise.all([brandPromise, productsPromise]);

  

  if (!brand) {
    return (
      <div className="p-10 text-center text-red-500 text-lg font-semibold">
        Brand not found.
      </div>
    );
  }

  return (
    <>
      <SingleBrand brand={brand} products={products} />
    </>
  );
}
