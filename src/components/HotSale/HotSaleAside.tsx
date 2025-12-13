import Image from "next/image";
import Link from "next/link";

const HotSaleAside = () => {
  return (
    <aside className="space-y-6">
      <div className="relative overflow-hidden shadow-md border border-primary/20 p-12 hover:shadow-xl transition-shadow duration-300">
        <Image
          className="absolute top-0 right-0"
          src="/images/products/products-five.png"
          width={150}
          height={50}
          alt="hot_product"
        />
        <p className="text-primary text-sm">Basic Gift idea</p>
        <h6 className="my-5 text-lg max-w-60 font-semibold">
          Mini Two Wheel Self Balancing Scooter
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
          className="absolute  top-0 right-0"
          src="/images/products/products-six.png"
          width={150}
          height={50}
          alt="hot_product"
        />
        <p className="text-primary text-sm">Basic Gift idea</p>
        <h6 className="my-5 text-lg max-w-60 font-semibold">
          Mini Two Wheel Self Balancing Scooter
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
