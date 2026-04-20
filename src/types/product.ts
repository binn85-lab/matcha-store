export type MatchaGrade = "ceremonial" | "culinary";

export type ProductCategory = "matcha" | "tools";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  grade?: MatchaGrade;
  origin?: string;
  size?: string;
  priceIDR: number;
  description: string;
  imageUrl: string;
  imageAlt: string;
}
