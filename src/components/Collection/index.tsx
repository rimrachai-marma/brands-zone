import Image from "next/image";
import FilterCollection from "./FilterCollection";

const Collection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/img-2.avif"
          alt="background"
          fill
          className="opacity-50"
        />
      </div>

      {/* Foreground Content */}
      <div className="">
        <FilterCollection />
      </div>
    </section>
  );
};

export default Collection;
