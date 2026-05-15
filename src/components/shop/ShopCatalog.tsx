"use client";

import { useMemo, useRef, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import type { CatalogData, CatalogProduct } from "@/types/catalog";
import { getCatalogItems } from "@/lib/catalog";

type SortOption = "recommended" | "price-asc" | "price-desc" | "name-asc" | "photos-desc";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

interface ShopCatalogProps {
  data: CatalogData;
}

export function ShopCatalog({ data }: ShopCatalogProps) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("recommended");

  const categories = data.categories.filter((item) => {
    if (item === "All") return data.products.length > 0;
    return data.products.some((product) => product.category === item);
  });

  const products = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = data.products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      return [
        product.shortName,
        product.name,
        product.category,
        product.rawCategory,
        product.variantSummary,
        product.variants?.map((variant) => `${variant.name ?? ""} ${variant.sku ?? ""}`).join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return (a.price ?? Infinity) - (b.price ?? Infinity);
      if (sort === "price-desc") return (b.price ?? -1) - (a.price ?? -1);
      if (sort === "name-asc") return a.shortName.localeCompare(b.shortName);
      if (sort === "photos-desc") return (b.imageCount ?? 0) - (a.imageCount ?? 0);
      return data.products.indexOf(a) - data.products.indexOf(b);
    });
  }, [category, data.products, query, sort]);

  return (
    <div className="mt-10">
      <div className="grid gap-3 border-b border-line pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const count =
              item === "All"
                ? data.products.length
                : data.products.filter((product) => product.category === item).length;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-xs tracking-wide transition-colors ${
                  category === item
                    ? "border-matcha-deep bg-matcha-deep text-cream"
                    : "border-line bg-cream text-ink-soft hover:border-matcha-mid hover:text-matcha-deep"
                }`}
              >
                {item} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] lg:w-[520px]">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari produk atau SKU"
              className="h-11 w-full rounded-full border border-line bg-cream px-11 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-matcha-mid"
            />
          </label>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-11 rounded-full border border-line bg-cream px-4 text-sm text-ink outline-none transition-colors focus:border-matcha-mid"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Harga terendah</option>
            <option value="price-desc">Harga tertinggi</option>
            <option value="name-asc">Nama A-Z</option>
            <option value="photos-desc">Foto terbanyak</option>
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        Menampilkan {products.length} dari {data.products.length} produk.
      </p>

      <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductTile({ product }: { product: CatalogProduct }) {
  const firstItem = getCatalogItems().find((item) => item.product.id === product.id);
  const images = product.images?.length ? product.images : ["/products/pure-matcha-50g.png"];
  const compareAt =
    product.compareAtPrice && product.price && product.compareAtPrice > product.price
      ? product.compareAtPrice
      : undefined;
  const variantSkus = product.variants
    ?.map((variant) => variant.sku)
    .filter(Boolean)
    .slice(0, 2)
    .join(" · ");

  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-sm border border-line bg-cream-soft">
      <ProductGallery
        images={images}
        productName={product.shortName}
        category={product.category}
      />

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="serif text-2xl leading-tight text-ink">
            {firstItem ? (
              <Link
                href={firstItem.directPath}
                prefetch={false}
                className="transition-colors hover:text-matcha-deep"
              >
                {product.shortName}
              </Link>
            ) : (
              product.shortName
            )}
          </h2>
          <div className="shrink-0 text-right">
            {compareAt ? (
              <p className="text-xs text-ink-soft line-through">{rupiah.format(compareAt)}</p>
            ) : null}
            <p className="text-sm font-medium text-matcha-deep">
              {typeof product.price === "number" ? rupiah.format(product.price) : "Cek marketplace"}
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {product.description || product.name}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-matcha-mid">
          {product.variantSummary || `${product.variants?.length ?? 0} varian`}
        </p>
        {variantSkus ? (
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">
            SKU:{" "}
            {firstItem ? (
              <Link
                href={firstItem.directPath}
                prefetch={false}
                className="underline decoration-line underline-offset-4 transition-colors hover:text-matcha-deep"
              >
                {variantSkus}
              </Link>
            ) : (
              variantSkus
            )}
          </p>
        ) : null}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          <MarketplaceButton href={product.tiktokUrl} label="TikTok" variant="tiktok" />
          <MarketplaceButton
            href={product.tokopediaUrl}
            label="Tokopedia"
            variant="tokopedia"
          />
          <MarketplaceButton href={product.shopeeUrl} label="Shopee" variant="shopee" />
          <MarketplaceButton
            href={product.whatsappUrl}
            label="WhatsApp"
            variant="whatsapp"
          />
        </div>
      </div>
    </article>
  );
}

function ProductGallery({
  images,
  productName,
  category,
}: {
  images: string[];
  productName: string;
  category: string;
}) {
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollByImage = (direction: -1 | 1) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: direction * strip.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative aspect-square overflow-hidden bg-cream">
      <div
        ref={stripRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={`${productName} ${index + 1}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full flex-[0_0_100%] snap-start object-cover"
          />
        ))}
      </div>
      <span className="absolute left-4 top-4 rounded-full border border-line bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-matcha-deep backdrop-blur">
        {category}
      </span>
      {images.length > 1 ? (
        <>
          <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] tracking-wide text-cream">
            {images.length} foto
          </span>
          <button
            type="button"
            aria-label="Foto sebelumnya"
            onClick={() => scrollByImage(-1)}
            className="absolute left-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-cream/90 text-xl font-bold leading-none text-matcha-deep opacity-90 backdrop-blur transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Foto berikutnya"
            onClick={() => scrollByImage(1)}
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-cream/90 text-xl font-bold leading-none text-matcha-deep opacity-90 backdrop-blur transition-colors hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}

function MarketplaceButton({
  href,
  label,
  variant,
}: {
  href?: string;
  label: string;
  variant: "tiktok" | "tokopedia" | "shopee" | "whatsapp";
}) {
  const colors = {
    tiktok: "border-[#111] bg-[#111] text-white hover:bg-[#222]",
    tokopedia: "border-[#03ac0e] bg-[#03ac0e] text-white hover:bg-[#03940c]",
    shopee: "border-[#ee4d2d] bg-[#ee4d2d] text-white hover:bg-[#d94427]",
    whatsapp: "border-[#128c3a] bg-[#18b552] text-white hover:bg-[#128c3a]",
  }[variant];

  const content = (
    <>
      {variant === "whatsapp" ? (
        <span
          aria-hidden="true"
          className="inline-grid h-[17px] w-[17px] place-items-center rounded-full bg-white/20 text-[10px] font-black leading-none text-white"
        >
          %
        </span>
      ) : null}
      <span>{label}</span>
    </>
  );

  if (!href) {
    return (
      <span className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-semibold tracking-wide text-ink-soft/50">
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid focus-visible:ring-offset-2 focus-visible:ring-offset-cream-soft ${colors}`}
    >
      {content}
      {variant !== "whatsapp" ? (
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      ) : null}
    </a>
  );
}
