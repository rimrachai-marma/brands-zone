import Link from "next/link";

const ExtraHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-xl capitalize font-semibold">
          Where Comfort Meets Style.
      </h4>
      <Link
        href="/"
        className="bg-primary text-white px-3 sm:px-5 py-1.5 sm:py-2.5  hover:bg-secondary capitalize"
      >
        View Collection
      </Link>
    </div>
  );
};

export default ExtraHeader;
