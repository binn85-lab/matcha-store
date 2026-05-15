import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductPageTitle,
  ProductSkuPageView,
} from "@/components/shop/ProductSkuPageView";
import {
  buildWiifmDescription,
  findCatalogItemByDirectSku,
  getCatalogItems,
} from "@/lib/catalog";

interface DirectSkuPageProps {
  params: Promise<{
    sku: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getCatalogItems().map((item) => ({
    sku: item.directSkuSlug,
  }));
}

export async function generateMetadata({
  params,
}: DirectSkuPageProps): Promise<Metadata> {
  const { sku } = await params;
  const item = findCatalogItemByDirectSku(sku);
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

export default async function DirectSkuPage({ params }: DirectSkuPageProps) {
  const { sku } = await params;
  const item = findCatalogItemByDirectSku(sku);
  if (!item) notFound();

  return <ProductSkuPageView item={item} />;
}
