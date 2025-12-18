import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube, FaEnvelope, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const FooterTop = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 sm:gap-6">
      <div className="flex-2">
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
        <p>
          Brandszone is a dynamic marketplace and business solutions provider
          dedicated to connecting top brands with customers through innovative
          digital platforms. Focused on quality, trust, and customer
          satisfaction, Brandszone offers diverse products, tailored services,
          and seamless experiences that empower both businesses and consumers to
          grow together.
        </p>
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
      <div className="flex-1 flex gap-24 sm:gap-6">
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
      <div className="flex-2">
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
            <Link className="flex items-center gap-2" href="">
              <IoLocationSharp className="text-primary" />
              <span>
                309 Fellowship Road, Suite 200 Mt. Laurel, NJ 08054, USA
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterTop;
