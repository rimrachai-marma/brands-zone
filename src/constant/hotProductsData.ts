import { HotProduct } from "@/types";

export const HOT_PRODUCTS_DATA:HotProduct[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 59.99,
    image: "/images/hot/headphone.avif",
    sold: 120,
    available: 80,
    discount: 25,
    offerEnds: "2025-11-01T00:00:00Z",
  },
  {
    id: 2,
    title: "Smartwatch Pro",
    price: 89.99,
    image: "/images/hot/watch.avif",
    sold: 50,
    available: 150,
    discount: 40,
    offerEnds: "2025-11-03T00:00:00Z",
  },
  {
    id: 3,
    title: "Smart TV Pro",
    price: 120.99,
    image: "/images/hot/tv.avif",
    sold: 50,
    available: 150,
    discount: 40,
    offerEnds: "2025-11-03T00:00:00Z",
  },
];
