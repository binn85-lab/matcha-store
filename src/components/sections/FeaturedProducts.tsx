import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { featuredProducts } from "@/lib/products";

export function FeaturedProducts() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-matcha-mid">
            Featured
          </p>
          <h2
            id="featured-heading"
            className="mt-3 text-4xl text-matcha-deep md:text-5xl"
          >
            This season&rsquo;s selection
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-matcha-deep"
        >
          View all products
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
        {featuredProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
