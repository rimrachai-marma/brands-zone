export interface NavbarChild {
  id: number;
  img?: string;
  title: string;
  url?: string;
}

export interface NavbarItem {
  id: number;
  title: string;
  url?: string;
  trend?: boolean;
  child?: NavbarChild[];
}

export interface SearchItem {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
}

export interface WishlistState {
  items: number;
}

export interface CartState {
  items: number;
}