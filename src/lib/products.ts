import type { Product } from "@/types/product";

export const featuredProducts: Product[] = [
  {
    id: "uji-ceremonial-30g",
    slug: "uji-ceremonial-30g",
    name: "Uji Ceremonial",
    category: "matcha",
    grade: "ceremonial",
    origin: "Uji, Kyoto",
    size: "30g tin",
    priceIDR: 385000,
    description:
      "A bright, sweet matcha from first-harvest tencha. Stone-milled the morning it ships.",
    imageUrl: "",
    imageAlt: "Tin of Uji Ceremonial matcha on a linen cloth",
  },
  {
    id: "nishio-everyday-50g",
    slug: "nishio-everyday-50g",
    name: "Nishio Everyday",
    category: "matcha",
    grade: "culinary",
    origin: "Nishio, Aichi",
    size: "50g pouch",
    priceIDR: 225000,
    description:
      "A round, full-bodied culinary grade. Built for lattes, baking, and daily cups.",
    imageUrl: "",
    imageAlt: "Kraft pouch of Nishio Everyday culinary matcha",
  },
  {
    id: "chasen-bamboo-whisk",
    slug: "chasen-bamboo-whisk",
    name: "Chasen — 80 Prong",
    category: "tools",
    origin: "Takayama, Nara",
    priceIDR: 345000,
    description:
      "Handcut bamboo whisk by a third-generation artisan. The quiet workhorse of a good usucha.",
    imageUrl: "",
    imageAlt: "Handcrafted bamboo chasen whisk standing upright",
  },
];
