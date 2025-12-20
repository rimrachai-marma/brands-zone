import Image from "next/image";
import Link from "next/link";

const HotSaleAside = () => {
  return (
    <aside className="space-y-6">
      <div className="relative overflow-hidden shadow-md border border-primary/20 p-12 hover:shadow-xl transition-shadow duration-300">
        <Image
          className="absolute top-1/3 right-0"
          src="/images/Hero/img6.png"
          width={150}
          height={50}
          alt="hot_product"
        />
        <p className="text-primary text-sm">Basic Gift idea</p>
        <h6 className="my-5 text-lg max-w-60 font-semibold">
            Feel the Difference with Every Step.
        </h6>
        <Link
          href="/pruducts/1"
          className="hover:bg-secondary bg-primary py-2.5 px-5 text-white text-sm"
        >
          Go Shop
        </Link>
      </div>
      <div className="relative overflow-hidden shadow-md border border-primary/20 p-12 hover:shadow-xl transition-shadow duration-300">
        <Image
          className="absolute top-1/3 right-0"
          src="/images/Hero/img7.png"
          width={150}
          height={50}
          alt="hot_product"
        />
        <p className="text-primary text-sm">Basic Gift idea</p>
        <h6 className="my-5 text-lg max-w-60 font-semibold">
            Your Journey Starts with the Right Shoes.
        </h6>
        <Link
          href="/pruducts/1"
          className="hover:bg-secondary bg-primary py-2.5 px-5 text-white text-sm"
        >
          Go Shop
        </Link>
      </div>
    </aside>
  );
};

export default HotSaleAside;
