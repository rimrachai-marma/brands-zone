import { NavbarItem } from "@/types";

export const NAVBAR_DATA: NavbarItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Explore",
    child: [
      {
        id: 1,
        title: "About Us",
        url: "/about-us",
      },
      {
        id: 2,
        title: "Contact Us",
        url: "/contact-us",
      },
      {
        id: 3,
        title: "Terms & Conditions",
        url: "/terms-conditions",
      },
      {
        id: 4,
        title: "Privacy Policy",
        url: "/privacy-policy",
      },
      {
        id: 5,
        title: "Services",
        url: "/services-support",
      },
      {
        id: 5,
        title: "Support",
        url: "/support",
      },
    ],
  },
  {
    id: 3,
    title: "Products",
    url: "/search",
  },
  {
    id: 4,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 5,
    title: "Brands",
    url: "/brands-list",
    trend: true,
  },
];
