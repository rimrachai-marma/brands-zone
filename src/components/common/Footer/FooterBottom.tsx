import Link from "next/link";

const FooterBottom = () => {
  return (
    <div>
      <hr className="border-primary/20 mt-6 mb-6" />
      <p className="text-center text-gray-600">
        &copy; {new Date().getFullYear()} BrandsZone || Development, Support &
        Maintenance By:{" "}
        <Link
          href="https://hsblco.com/"
          target="_blank"
          className="text-[#24479A] font-bold"
        >
          HSBLCO
        </Link>
        .
      </p>
    </div>
  );
};

export default FooterBottom;
