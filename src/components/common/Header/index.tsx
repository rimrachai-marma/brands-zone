import MainLogo from "./MainLogo";
import HeaderAction from "./HeaderAction";
import AllCategories from "./AllCategories";
import { NavbarList } from "./NavbarList";
import AllSearchItems from "./AllSearchItems";
import HeaderAds from "./HeaderAds";
import HeaderLogin from "./HeaderLogin";
import HeaderTerms from "./HeaderTerms";
import MobileMenu from "./MobileMenu";
import { categories } from "@/constant/ctgr";

const Header = () => {
  return (
    <header className="">
      {/* header top  */}
      <div className="bg-secondary/10 py-1">
        <div className="container-fluid mx-auto space-y-4">
          <div className="flex items-center justify-between gap-3">
            {/* top left  */}
            <HeaderTerms />
            {/* top right  */}
            <HeaderLogin />
          </div>
        </div>
      </div>
      {/* header middle  */}
      <div className="container-fluid mx-auto py-4 px-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* mobile menu toggle */}
          <div className="block lg:hidden">
            <MobileMenu categories={categories} />
          </div>

          {/* main logo */}
          <MainLogo />

          {/* navbar list - hidden on mobile */}
          <div className="hidden lg:block">
            <NavbarList />
          </div>

          {/* action buttons: cart & heart */}
          <HeaderAction />
        </div>
      </div>
      {/* header bottom */}
      <div className="container-fluid mx-auto mb-4 px-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* all categories */}
          <div className="w-full sm:w-1/3 lg:w-1/4 hidden lg:block">
            <AllCategories categories={categories} />
          </div>

          {/* all search items */}
          <div className="w-full sm:flex-1 lg:w-1/2">
            <AllSearchItems />
          </div>

          {/* header ads */}
          <div className="w-full sm:w-1/3 lg:w-1/4 hidden lg:block">
            <HeaderAds />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
