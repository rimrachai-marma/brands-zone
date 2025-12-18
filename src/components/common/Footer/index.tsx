import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <footer className="bg-secondary/10 py-14">
      <div className="container-fluid mx-auto">
        {/* fotter top  */}
        <FooterTop />
        {/* footer bottom  */}
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
