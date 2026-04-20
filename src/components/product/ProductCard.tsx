"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatIDR } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/shop/${product.slug}`}
        prefetch={false}
        aria-label={`${product.name} — ${formatIDR(product.priceIDR)}`}
        className="group block focus:outline-none"
      >
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-soft ring-1 ring-line transition-[box-shadow,ring-color] duration-500 group-hover:shadow-[0_40px_80px_-30px_rgba(74,93,58,0.35)] group-hover:ring-matcha-mid"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-matcha-light/60 via-cream-soft to-matcha-mid/40"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-matcha-deep/10 to-transparent"
          />
          <span className="absolute left-4 top-4 rounded-full border border-line bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-matcha-deep backdrop-blur">
            {product.grade ?? product.category}
          </span>
        </motion.div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="serif text-2xl text-ink transition-colors duration-500 group-hover:text-matcha-deep">
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
    </motion.div>
  );
}
