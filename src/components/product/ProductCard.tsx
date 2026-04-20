import Link from "next/link";
import type { Product } from "@/types/product";
import { formatIDR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block focus:outline-none"
      aria-label={`${product.name} — ${formatIDR(product.priceIDR)}`}
    >
      <div
        role="img"
        aria-label={product.imageAlt}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-soft ring-1 ring-line transition-all duration-500 group-hover:ring-matcha-mid group-focus-visible:ring-matcha-mid"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-matcha-light/60 via-cream-soft to-matcha-mid/40 transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-matcha-deep/10 to-transparent"
        />
        <span className="absolute left-4 top-4 rounded-full border border-line bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-matcha-deep backdrop-blur">
          {product.grade ?? product.category}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="serif text-xl text-ink transition-colors group-hover:text-matcha-deep">
            {product.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-soft">
            {product.origin}
            {product.size ? ` · ${product.size}` : null}
          </p>
        </div>
        <span className="whitespace-nowrap text-sm text-matcha-deep">
          {formatIDR(product.priceIDR)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {product.description}
      </p>
    </Link>
  );
}
