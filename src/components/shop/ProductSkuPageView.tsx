import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MetaProductViewEvent } from "@/components/analytics/MetaPixel";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProductImageGallery } from "@/components/shop/ProductImageGallery";
import {
  buildWiifmDescription,
  formatCatalogPrice,
  getVariantPrice,
  getVariantStock,
  type CatalogItem,
} from "@/lib/catalog";

export function ProductSkuPageView({ item }: { item: CatalogItem }) {
  const { product, variant } = item;
  const images = product.images?.length ? product.images : ["/products/pure-matcha-50g.png"];
  const price = getVariantPrice(item);
  const stock = getVariantStock(item);
  const title = getProductPageTitle(product.shortName, variant.name);
  const wiifm = buildWiifmDescription(item);
  const variantLabel =
    variant.name && variant.name.toLowerCase() !== "default" ? variant.name : product.variantSummary;

  return (
    <>
      <MetaProductViewEvent
        contentId={item.metaId}
        contentName={title}
        contentCategory={product.category}
        value={price}
      />
      <Navbar />
      <main className="flex-1 bg-cream">
        <section className="px-6 pb-16 pt-28 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/shop"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-matcha-deep"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all products
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-start">
              <ProductImageGallery images={images} productName={title} />

              <article>
                <p className="text-xs uppercase tracking-[0.3em] text-matcha-mid">
                  {product.category}
                </p>
                <h1 className="serif mt-4 text-5xl leading-[1.02] text-matcha-deep md:text-6xl">
                  {title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <p className="rounded-full bg-matcha-deep px-4 py-2 text-sm font-medium text-cream">
                    {formatCatalogPrice(price)}
                  </p>
                  <p className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft">
                    {stock > 0 ? "In stock" : "Out of stock"}
                  </p>
                  <p className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft">
                    SKU: {item.sku}
                  </p>
                </div>

                <p className="mt-7 text-base leading-relaxed text-ink-soft">
                  {wiifm}
                </p>

                <div className="mt-8 grid gap-4 border-y border-line py-7">
                  <InfoRow label="Best for" value={getBestFor(product.category)} />
                  <InfoRow label="Variant" value={variantLabel || "Default"} />
                  <InfoRow label="Source" value={product.source || "Homelab official catalog"} />
                </div>

                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.24em] text-matcha-mid">
                    Buy from Homelab official channels
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <MarketplaceLink href={product.tiktokUrl} label="TikTok" variant="tiktok" />
                    <MarketplaceLink
                      href={product.tokopediaUrl}
                      label="Tokopedia"
                      variant="tokopedia"
                    />
                    <MarketplaceLink href={product.shopeeUrl} label="Shopee" variant="shopee" />
                    <MarketplaceLink
                      href={product.whatsappUrl}
                      label="WhatsApp"
                      variant="whatsapp"
                    />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function getProductPageTitle(name: string, variantName?: string) {
  if (!variantName || variantName.toLowerCase() === "default") return name;
  if (name.toLowerCase().includes(variantName.toLowerCase())) return name;
  return `${name} - ${variantName}`;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
      <dt className="text-xs uppercase tracking-[0.2em] text-matcha-mid">{label}</dt>
      <dd className="text-sm leading-relaxed text-ink-soft">{value}</dd>
    </div>
  );
}

function MarketplaceLink({
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
      {variant !== "whatsapp" ? (
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      ) : null}
    </>
  );

  if (!href) {
    return (
      <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold tracking-wide text-ink-soft/50">
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${colors}`}
    >
      {content}
    </a>
  );
}

function getBestFor(category: string) {
  if (category === "Matcha Powder") return "Matcha latte, ceremonial whisking, baking, smoothies, and daily matcha rituals.";
  if (category === "Latte & Drink Powder") return "Fast cafe-style drinks at home, office pantry, events, or small F&B operations.";
  if (category === "Tea & Hojicha") return "Calmer tea moments, hojicha drinks, warm cups, and Japanese-inspired menus.";
  if (category === "Tools") return "A cleaner matcha setup with tools for whisking, serving, storing, and gifting.";
  if (category === "Hampers / Parsel") return "Ready-to-send gifts for customers, teams, friends, and seasonal occasions.";
  if (category === "Gift Card") return "Flexible gifting when the recipient should choose their own Homelab favorites.";
  if (category === "Accessories") return "Completing the daily drink station with small useful add-ons.";

  return "Daily Homelab use, gifting, and practical checkout through official channels.";
}
