import Image from "next/image";
import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <footer className="bg-secondary/10 py-14">
      <div className="container-fluid mx-auto">
        <div className="mb-4">
          <Image
            src="/images/logo/main-logo.png"
            alt="Brand Zone"
            width={250}
            height={55}
            priority
            loading="eager"
          />
        </div>
        {/* fotter top  */}
        <FooterTop />
        {/* footer bottom  */}
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
