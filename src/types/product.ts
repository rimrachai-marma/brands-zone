import { Brands } from "./brand";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Review {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  comment: string;
  rating: number;
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  image: string;
  images: ProductImage[];
  brandName?: string;
  category: string;
  reviews: Review[];
  description: string;
  countInStock: number;
  discount?: {
    percentage: number;
    campaign: boolean;
  };
}

export interface ProductGridProps {
  products: Product[];
}

export interface HotProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  sold: number;
  available: number;
  discount: number;
  offerEnds: string; // ISO string format
}

export interface HotProductProps {
  hotProducts: HotProduct[];
}

export interface SingleBrandProps {
  brand: Brands;
  products: Product[];
}
