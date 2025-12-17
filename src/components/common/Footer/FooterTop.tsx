import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube, FaEnvelope, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const FooterTop = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 sm:gap-4">
      <div className="flex-4">
        <div className="leading-relaxed space-y-1">
          <p>
            Brandszone is more than a marketplace; it is a dynamic ecosystem
            built to elevate sustainable brands and connect them with conscious
            consumers through innovative digital platforms.
          </p>

          <p>
            With a foundation rooted in quality, trust, and customer
            satisfaction, Brandszone empowers businesses to align profitability
            with purpose.
          </p>

          <p>
            By curating a diverse portfolio of eco-friendly products and
            offering tailored business solutions, Brandszone enables merchants
            to tap into the fast-growing demand for sustainable goods.
          </p>

          <p>
            From ethically sourced fashion to renewable household essentials,
            the marketplace ensures that every transaction contributes to a
            greener future.
          </p>

          <div>
            <h6 className="font-semibold text-base mb-2">
              Why Sustainable Brands Thrive on Brandszone
            </h6>

            <ul className="ml-4">
              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="break-normal">
                  <strong>Seamless Digital Experiences</strong> – intuitive
                  tools that make discovery, purchase, and fulfillment
                  effortless.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="break-normal">
                  <strong>Tailored Services</strong> – customized support for
                  sustainable businesses to scale responsibly.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="break-normal">
                  <strong>Trust & Transparency</strong> – verified
                  eco-credentials that build consumer confidence.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="break-normal">
                  <strong>Shared Growth</strong> – empowering both businesses
                  and customers to prosper together.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="break-normal">
                  <strong>Market Differentiation</strong> – positioning
                  merchants at the forefront of the sustainability movement.
                </span>
              </li>
            </ul>
          </div>

          <p>
            For wholesalers, retailers, traders and consumers, Brandszone
            represents a scalable opportunity: a marketplace where
            sustainability is not just a trend, but a profitable business model.
            By bridging top sustainable brands with engaged customers,
            Brandszone transforms commerce into a force for both growth and
            good.
          </p>
        </div>

        <Button className="my-4 hover:bg-secondary">Download App</Button>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              target="_blank"
              href="https://www.facebook.com/brandszoneglobal"
              className="bg-primary text-white flex items-center justify-center p-2 rounded-full border border-primary hover:bg-white hover:text-primary"
            >
              <FaFacebookF />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="/"
              className="bg-primary text-white flex items-center justify-center p-2 rounded-full border border-primary hover:bg-white hover:text-primary"
            >
              <FaXTwitter />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/brandszonebangladesh/"
              className="bg-primary text-white flex items-center justify-center p-2 rounded-full border border-primary hover:bg-white hover:text-primary"
            >
              <FaLinkedinIn />
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="/"
              className="bg-primary text-white flex items-center justify-center p-2 rounded-full border border-primary hover:bg-white hover:text-primary"
            >
              <FaYoutube />
            </Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-4 flex-2">
        <div className="space-y-4">
          <div className="">
            <h6 className="font-semibold mb-4 text-lg">Pages</h6>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h6 className="font-semibold mb-4 text-lg">Services</h6>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/about-us">Terms & Policy</Link>
              </li>
              <li>
                <Link href="/contact-us">Return Policy</Link>
              </li>
              <li>
                <Link href="/blog">Free Delivery</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-2">
          <h6 className="font-semibold mb-4 text-lg">Find Us</h6>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                className="flex items-center gap-2"
                href="mailto:bizdev@brandszoneglobal.com"
              >
                <FaEnvelope className="text-primary" />
                <span>bizdev@brandszoneglobal.com</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2"
                href="https://wa.me/+1 (609)-256-9162"
              >
                <FaWhatsapp className="text-primary" />
                <span> +1 (609)-256-9162</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-start gap-2" href="">
                <IoLocationSharp className="text-primary" />
                <span>
                  309 Fellowship Road,
                  <br />
                  Suite 200 Mt. Laurel, NJ 08054, USA
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex items-start gap-2" href="">
                <IoLocationSharp className="text-primary" />
                <span>
                  House-614 (3rd Floor),
                  <br />
                  Road-08, Avenue-6, Mirpur DOHS,
                  <br />
                  Dhaka-1216
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
