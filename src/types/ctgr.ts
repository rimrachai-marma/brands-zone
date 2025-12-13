export interface Category2 {
  id: string;
  name: string;
  children?: Category2[];
}

export type Categories = Category2[];
