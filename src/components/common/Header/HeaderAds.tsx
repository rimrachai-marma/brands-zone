import Link from "next/link";

const HeaderAds = () => {
  return (
    <Link
      href="#"
      className="relative w-full border border-primary h-15 cursor-pointer text-center flex flex-col justify-center items-center gap-1 overflow-hidden group"
    >
      {/* background animation using ::before */}
      <span className="absolute inset-0 bg-secondary transform -translate-x-150 group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />

      {/* content */}
      <div className="relative z-10">
        <h6 className="text-primary font-semibold uppercase group-hover:text-white transition-colors duration-300">
          black friday
        </h6>
        <p className="text-xs group-hover:text-white transition-colors duration-300">
          Up to 70% Off | Use Code: BF2024
        </p>
      </div>
    </Link>
  );
};

export default HeaderAds;
