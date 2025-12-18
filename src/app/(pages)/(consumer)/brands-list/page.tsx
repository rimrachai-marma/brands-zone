import BrandsComp from "@/components/BrandsComp";
import { getVendors } from "@/lib/actions/vendor";

const page = async () => {
  const query: Record<string, string> = {};
  const result = await getVendors(query);

  console.log(result);

  if (!result.data) return null;

  return (
    <>
      <BrandsComp vendors={result.data?.vendors} />
    </>
  );
};

export default page;
