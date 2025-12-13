import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: 1,
    title: "Category 1",
    url: "/category-1",
  },
  {
    id: 2,
    title: "Category 2",
    url: "/category-1",
    child: [
      {
        id: 1,
        title: "Subcategory A",
        url: "/category-1",
        image: "/images/products/products-one.png",
        price: 220.45,
      },
      {
        id: 2,
        title: "Subcategory B",
        url: "/category-1",
        image: "/images/products/products-two.png",
        price: 220.45,
      },
      {
        id: 3,
        title: "Subcategory C",
        url: "/category-1",
        image: "/images/products/products-three.png",
        price: 220.45,
      },
      {
        id: 4,
        title: "Subcategory A",
        url: "/category-1",
        image: "/images/products/products-four.png",
        price: 220.45,
      },
      {
        id: 5,
        title: "Subcategory B",
        url: "/category-1",
        image: "/images/products/products-five.png",
        price: 220.45,
      },
      {
        id: 6,
        title: "Subcategory C",
        url: "/category-1",
        image: "/images/products/products-six.png",
        price: 220.45,
      },
    ],
  },
  {
    id: 3,
    title: "Category 3",
    url: "/category-1",
  },
  {
    id: 4,
    title: "Category 4",
    url: "/category-1",
  },
  {
    id: 5,
    title: "Category 5",
    url: "/category-1",
  },
];
