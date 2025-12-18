import HeroSlider from "./HeroSlider";
import HeroAside from "./HeroAside";

const Hero = () => {
  return (
    <section className="relative py-16 bg-gray-50">
      <div className="container-fluid mx-auto ">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
         {/* Slider Section */}
        <HeroSlider />
        {/* Static Images Section */}
        <HeroAside />
       </div>
      </div>
    </section>
  );
};

export default Hero;
