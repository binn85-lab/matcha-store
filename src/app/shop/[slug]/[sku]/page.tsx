import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductPageTitle,
  ProductSkuPageView,
} from "@/components/shop/ProductSkuPageView";
import {
  buildWiifmDescription,
  findCatalogItem,
  getCatalogItems,
} from "@/lib/catalog";

interface ProductSkuPageProps {
  params: Promise<{
    slug: string;
    sku: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getCatalogItems().map((item) => ({
    slug: item.productSlug,
    sku: item.skuSlug,
  }));
}

export async function generateMetadata({
  params,
}: ProductSkuPageProps): Promise<Metadata> {
  const { slug, sku } = await params;
  const item = findCatalogItem(slug, sku);
  if (!item) return {};

  const title = getProductPageTitle(item.product.shortName, item.variant.name);
  const description = buildWiifmDescription(item, 155);
  const image = item.product.images?.[0];

  return {
    title,
    description,
    alternates: {
      canonical: item.directPath,
    },
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined,
      type: "website",
    },
  };
}

export default async function ProductSkuPage({ params }: ProductSkuPageProps) {
  const { slug, sku } = await params;
  const item = findCatalogItem(slug, sku);
  if (!item) notFound();

  return <ProductSkuPageView item={item} />;
}
