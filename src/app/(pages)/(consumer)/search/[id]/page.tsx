import ProductDetails from "@/components/product";
import { PRODUCTS_DATA } from "@/constant/productsData";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;

  const product = PRODUCTS_DATA.find((product) => product.id === Number(id));

  if (!product) notFound();

  return (
    <div className="container mx-auto py-10 px-3">
      {/* <ProductDetails product={product} /> */}
    </div>
  );
};

export default page;
