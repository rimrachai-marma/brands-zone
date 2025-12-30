import Image from "next/image";
import ExtraHeader from "./ExtraHeader";
import ExtraProductsItems from "./ExtraProductsItems";

const ExtraProducts = () => {
  return (
    <section className="py-44 relative">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          className=""
          src="/images/bg/product_bg.png"
          fill
          alt="background"
        />
      </div>
      <div className="container-fluid mx-auto relative z-20 space-y-10">
            <ExtraHeader />
            <ExtraProductsItems />
      </div>
    </section>
  );
};

export default ExtraProducts;
