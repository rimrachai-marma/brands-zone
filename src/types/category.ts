export interface SubCategory {
  id: number;
  title: string;
  url?: string;
  image: string;
  price: number;
}

export interface Category {
  id: number;
  title: string;
  url?: string;
  child?: SubCategory[];
}

export interface FilterCategory {
  key: string;
  name: string;
}