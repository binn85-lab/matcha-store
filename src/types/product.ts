export type MatchaGrade = "ceremonial" | "culinary";

export type ProductCategory = "matcha-powder" | "tools";

export type Currency = "IDR";

export interface ProductImages {
  main: string;
  closeup?: string;
  powder?: string;
  flatlay?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  grade?: MatchaGrade;
  size: string;
  price: number;
  currency: Currency;
  origin: string;
  harvest?: string;
  tastingNotes?: string[];
  description: string;
  images: ProductImages;
  stock: number;
  featured?: boolean;
  flagship?: boolean;
}
