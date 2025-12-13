import Image from "next/image";
import Link from "next/link";

const MainLogo = () => {
  return (
    <div className="shrink-0">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/logo/main-logo.png"
          width={200}
          height={30}
          priority
          loading="eager"
          alt="main_logo"
          className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto"
        />
      </Link>
    </div>
  );
};

export default MainLogo;
