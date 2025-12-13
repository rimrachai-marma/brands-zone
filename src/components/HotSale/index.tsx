import HotSaleAside from "./HotSaleAside";
import HotSaleTabs from "./HotSaleTabs";

const HotSale = () => {
  return (
    <section>
      <div className="container-fluid mx-auto py-16">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* hot sale aside  */}
          <div className="lg:flex-4">
            <HotSaleAside />
          </div>
          {/* hot sale tabs  */}
          <div className="lg:flex-8">
            <HotSaleTabs />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotSale;
