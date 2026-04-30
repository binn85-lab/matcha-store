import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "pure-matcha-50g",
    slug: "pure-matcha-50g",
    name: "Pure Matcha 50g",
    subtitle: "Pure matcha powder for daily latte and whisked tea",
    category: "matcha-powder",
    grade: "ceremonial",
    size: "50g",
    price: 0,
    currency: "IDR",
    origin: "Japanese-style matcha powder",
    tastingNotes: ["Clean green aroma", "Smooth body", "Easy to mix"],
    description:
      "A compact 50g jar for first-time matcha drinkers and daily home rituals. Smooth in iced latte, warm milk, or a simple whisked bowl.",
    images: {
      main: "/products/pure-matcha-50g.png",
      closeup: "/products/pure-matcha-lifestyle.jpg",
    },
    stock: 47,
    featured: true,
    flagship: true,
  },
  {
    id: "pure-matcha-100g",
    slug: "pure-matcha-100g",
    name: "Pure Matcha 100g",
    subtitle: "Bigger pouch for everyday matcha recipes",
    category: "matcha-powder",
    grade: "ceremonial",
    size: "100g",
    price: 0,
    currency: "IDR",
    origin: "Japanese-style matcha powder",
    tastingNotes: ["Versatile", "Soft vegetal finish", "Great for latte"],
    description:
      "A practical 100g pack for repeat cups, recipe testing, and cafe-style matcha at home. Designed for iced matcha latte, baking, smoothies, and warm drinks.",
    images: {
      main: "/products/pure-matcha-100g.png",
      closeup: "/products/pure-matcha-lifestyle.jpg",
    },
    stock: 64,
    featured: true,
    flagship: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getFlagshipProduct(): Product | undefined {
  return products.find((p) => p.flagship);
}

export function getFlagshipProducts(): Product[] {
  return products.filter((p) => p.flagship);
}
