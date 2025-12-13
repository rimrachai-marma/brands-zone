import Image from "next/image";
import ExtraHeader from "./ExtraHeader";
import ExtraProductsItems from "./ExtraProductsItems";

const ExtraProducts = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          className="opacity-50"
          src="/images/bg/img-1.png"
          fill
          alt="background"
        />
      </div>
      <div className="container-fluid mx-auto relative z-20">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-10 space-y-12">
            <ExtraHeader />
            <ExtraProductsItems />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraProducts;
