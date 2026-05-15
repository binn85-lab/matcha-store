import catalogData from "@/data/homelab-products.json";
import type { CatalogData, CatalogProduct, CatalogVariant } from "@/types/catalog";

export interface CatalogItem {
  product: CatalogProduct;
  variant: CatalogVariant;
  productSlug: string;
  sku: string;
  skuSlug: string;
  path: string;
  directSkuSlug: string;
  directPath: string;
}

export const catalog = catalogData as CatalogData;

export function slugifyCatalogValue(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "product";
}

export function getCatalogItems(): CatalogItem[] {
  const scopedSeen = new Map<string, number>();
  const globalSkuCounts = new Map<string, number>();
  const directSeen = new Map<string, number>();

  const baseItems = catalog.products.flatMap((product) => {
    const variants =
      product.variants?.length
        ? product.variants
        : [
            {
              name: "Default",
              sku: product.id || product.slug,
              price: product.price,
              stock: product.stock,
            },
          ];

    return variants.map((variant, index) => {
      const sku = variant.sku || `${product.id || product.slug}-${index + 1}`;
      const baseSkuSlug = slugifyCatalogValue(sku);
      const key = `${product.slug}/${baseSkuSlug}`;
      const count = scopedSeen.get(key) ?? 0;
      scopedSeen.set(key, count + 1);
      const skuSlug = count ? `${baseSkuSlug}-${count + 1}` : baseSkuSlug;
      globalSkuCounts.set(baseSkuSlug, (globalSkuCounts.get(baseSkuSlug) ?? 0) + 1);

      return {
        product,
        variant,
        productSlug: product.slug,
        sku,
        skuSlug,
        path: `/shop/${product.slug}/${skuSlug}`,
      };
    });
  });

  return baseItems.map((item) => {
    const baseDirectSlug =
      (globalSkuCounts.get(slugifyCatalogValue(item.sku)) ?? 0) > 1
        ? `${item.productSlug}-${item.skuSlug}`
        : item.skuSlug;
    const directCount = directSeen.get(baseDirectSlug) ?? 0;
    directSeen.set(baseDirectSlug, directCount + 1);
    const directSkuSlug = directCount ? `${baseDirectSlug}-${directCount + 1}` : baseDirectSlug;

    return {
      ...item,
      directSkuSlug,
      directPath: `/shop/${directSkuSlug}`,
    };
  });
}

export function findCatalogItem(productSlug: string, skuSlug: string) {
  return getCatalogItems().find(
    (item) => item.productSlug === productSlug && item.skuSlug === skuSlug,
  );
}

export function findCatalogItemByDirectSku(skuSlug: string) {
  return getCatalogItems().find((item) => item.directSkuSlug === skuSlug);
}

export function formatCatalogPrice(price?: number) {
  if (typeof price !== "number") return "Cek marketplace";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getVariantPrice(item: CatalogItem) {
  return item.variant.price ?? item.product.price;
}

export function getVariantStock(item: CatalogItem) {
  return item.variant.stock ?? item.product.stock ?? 0;
}

export function buildWiifmDescription(item: CatalogItem, maxLength?: number) {
  const { product, variant } = item;
  const variantName =
    variant.name && variant.name.toLowerCase() !== "default" ? ` varian ${variant.name}` : "";
  const categoryBenefit = getCategoryBenefit(product.category);
  const base = product.description || product.name;
  const text = [
    `${product.shortName}${variantName} dari Homelab cocok untuk ${categoryBenefit}.`,
    `Anda mendapatkan pilihan produk yang praktis untuk kebutuhan harian, gifting, atau persiapan minuman di rumah dan cafe.`,
    base,
    `Checkout mudah melalui marketplace resmi Homelab.`,
  ].join(" ");

  const normalized = text.replace(/\s+/g, " ").trim();
  if (!maxLength || normalized.length <= maxLength) return normalized;

  return `${normalized.slice(0, maxLength - 1).trim()}…`;
}

function getCategoryBenefit(category: string) {
  if (category === "Matcha Powder") return "membuat matcha latte, usucha, baking, dan racikan matcha premium";
  if (category === "Latte & Drink Powder") return "membuat minuman cafe-style dengan rasa konsisten dan mudah disajikan";
  if (category === "Tea & Hojicha") return "menikmati teh Jepang, hojicha, dan minuman hangat yang lebih aromatic";
  if (category === "Tools") return "menyiapkan ritual matcha dengan alat yang rapi, nyaman, dan siap pakai";
  if (category === "Hampers / Parsel") return "hadiah, hampers, dan paket siap kirim yang terlihat thoughtful";
  if (category === "Gift Card") return "memberi pilihan fleksibel untuk penerima hadiah Homelab";
  if (category === "Accessories") return "melengkapi setup matcha dan minuman harian";

  return "menikmati produk Homelab dengan cara yang lebih praktis";
}
