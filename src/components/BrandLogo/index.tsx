import LogoSlider from "./LogoSlider";

const BrandLogo = () => {
  return <div className={'px-2 bg-gray-50 pt-5'}>
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Featured Brands
      </h2>
      <p className="text-gray-600">
        Premium brands in our collection
      </p>
    </div>
      <LogoSlider/>
    </div>
};

export default BrandLogo;
