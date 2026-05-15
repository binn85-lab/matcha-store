export interface CatalogVariant {
  name?: string;
  sku?: string;
  price?: number;
  stock?: number;
  compareAtPrice?: number;
  discountSource?: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  rawCategory?: string;
  description?: string;
  price?: number;
  images?: string[];
  tiktokUrl?: string;
  tokopediaUrl?: string;
  shopeeUrl?: string;
  whatsappUrl?: string;
  variants?: CatalogVariant[];
  source?: string;
  imageCount?: number;
  variantSummary?: string;
  compareAtPrice?: number;
  discountSource?: string;
  stock?: number;
}

export interface CatalogData {
  summary: {
    totalProducts: number;
    canonicalProducts: number;
    needsReview: number;
    withTikTok: number;
    withTokopedia: number;
    withShopee: number;
    withImages: number;
    missingShopee: number;
    missingTikTok: number;
    missingTokopedia: number;
    withDiscountPrice: number;
    categories: Record<string, number>;
  };
  categories: string[];
  products: CatalogProduct[];
}
