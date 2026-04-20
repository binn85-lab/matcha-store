import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "yukata-ceremonial",
    slug: "yukata",
    name: "Yukata",
    subtitle: "Ceremonial Matcha",
    category: "matcha-powder",
    grade: "ceremonial",
    size: "100g",
    price: 385000,
    currency: "IDR",
    origin: "Uji, Kyoto",
    harvest: "First flush, shade-grown 21 days",
    tastingNotes: ["Sweet umami", "Fresh grass", "Subtle cacao finish"],
    description:
      "Stone-milled within hours of arriving from Japan, Yukata is the quiet centerpiece of any morning. Vivid jade, velvet foam, and a finish that lingers like a held breath.",
    images: {
      main: "/products/yukata-ceremonial.jpg",
      closeup: "/products/yukata-closeup.jpg",
      powder: "/products/yukata-powder.jpg",
      flatlay: "/products/yukata-flatlay.jpg",
    },
    stock: 47,
    featured: true,
    flagship: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getFlagshipProduct(): Product | undefined {
  return products.find((p) => p.flagship);
}
