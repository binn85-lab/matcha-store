import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "pure-matcha-jar",
    slug: "pure-matcha-jar",
    name: "Pure Matcha Jar",
    subtitle: "Premium Grade Matcha",
    category: "matcha-powder",
    grade: "ceremonial",
    size: "50g",
    price: 129000,
    currency: "IDR",
    origin: "Uji, Kyoto",
    harvest: "Shade-grown Japanese matcha",
    tastingNotes: ["Deep green aroma", "Smooth umami", "Clean finish"],
    description:
      "100% pure matcha powder in a glass jar, made for creamy lattes, warm whisked bowls, and quiet daily rituals.",
    images: {
      main: "/products/pure-matcha-jar.png",
      closeup: "/products/pure-matcha-lifestyle.jpg",
      powder: "/products/pure-uji-matcha-pouch.jpg",
      flatlay: "/products/ceremonial-lineup.jpg",
    },
    stock: 47,
    featured: true,
    flagship: true,
  },
  {
    id: "pure-uji-matcha-pouch",
    slug: "pure-uji-matcha-pouch",
    name: "Pure Uji Matcha Pouch",
    subtitle: "Kyoto Japan Daily Matcha",
    category: "matcha-powder",
    grade: "ceremonial",
    size: "100g",
    price: 189000,
    currency: "IDR",
    origin: "Uji, Kyoto",
    harvest: "100% pure Uji matcha",
    tastingNotes: ["Fresh grass", "Soft vegetal", "Balanced body"],
    description:
      "A practical 100g pouch for everyday matcha drinks. Clean, all natural, vegan, and easy to prepare hot or iced.",
    images: {
      main: "/products/pure-uji-matcha-pouch.jpg",
      closeup: "/products/pure-matcha-lifestyle.jpg",
      powder: "/products/pure-matcha-jar.png",
    },
    stock: 64,
    featured: true,
  },
  {
    id: "pure-matcha-daily-set",
    slug: "pure-matcha-daily-set",
    name: "Pure Matcha Daily Set",
    subtitle: "Mindful Matcha Ritual",
    category: "matcha-powder",
    grade: "ceremonial",
    size: "Set",
    price: 229000,
    currency: "IDR",
    origin: "Japan",
    harvest: "Selected matcha powder for daily whisking",
    tastingNotes: ["Soft texture", "Gentle umami", "Low bitterness"],
    description:
      "A ritual-ready matcha set with fine powder character, smooth texture, and a balanced finish for whisking or latte.",
    images: {
      main: "/products/pure-matcha-lifestyle.jpg",
      closeup: "/products/pure-matcha-jar.png",
      powder: "/products/pure-uji-matcha-pouch.jpg",
    },
    stock: 32,
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getFlagshipProduct(): Product | undefined {
  return products.find((p) => p.flagship);
}
