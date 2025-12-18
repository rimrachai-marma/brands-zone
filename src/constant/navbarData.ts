import { NavbarItem } from "@/types";

export const NAVBAR_DATA: NavbarItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Pages",
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
    ],
  },
  {
    id: 3,
    title: "Products",
    url: "/products",
  },
  {
    id: 4,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 5,
    title: "Brands",
    url: "/brands",
    trend: true,
  },
];
