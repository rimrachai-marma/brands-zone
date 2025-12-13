import ProductDetails from "@/components/product";
import { getProduct } from "@/lib/actions/products";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;

  const result = await getProduct(id);

  if (!result.data) notFound();

  return (
    <div className="container mx-auto py-10 px-3">
      <ProductDetails product={result.data?.product} />
    </div>
  );
};

export default page;
